"""
Description:
Automation class.

Requirements:
this pipeline class, needs to have the following methods:
    connect
    disconnect
    is_connected
    decision_mapping
    send_action
"""
import logging
from typing import List, Tuple
from pymodbus.client.sync import ModbusTcpClient
import asyncio


class AutomationClass():

    logger = logging.getLogger()
    client = None

    ip_address = "127.0.0.1"
    port = 502

    PLC_STATUS = "RUNNING"

    def __init__(self, **args) -> None:
        # get custom configs defined in automation_class_def.json
        self.ip_address = args.get('ip_address', self.ip_address)
        self.port = args.get('port', self.port)

    def connect(self) -> None:
        """Connect to the PLC"""
        self.logger.info("connecting")
        try:
            # creates and saves a ModbusTcpClient instance
            # with the given ip_address and port
            self.client = ModbusTcpClient(self.ip_address, self.port)
            # connect to the PLC
            self.client.connect()
        except:
            self.logger.exception("Error connecting")
            self.client = None  

    def disconnect(self) -> None:
        """Disconnect from the PLC"""
        self.logger.info("disconnecting")
        try:
            # disconnect from the PLC
            self.client.close()
        except:
            self.logger.exception("Error disconnecting")
        # set the client to None to indicate disconnection
        self.client = None   

    def is_connected(self) -> bool:
        """Check if the client is connected"""
        self.logger.debug("is_connected")
        # if client is None, it means the client is not connected
        return self.client is not None
    
    def decision_mapping(self, msg: str) -> Tuple[str, List[str]]:
        """Map pipeline decision into PLC decision"""
        try:
            self.logger.info("decision_mapping")
            # get the decision from the message
            decision: str = msg['results']['decision']
            # get the type from the message, type determines which register to write to
            type: str = msg['results']['type']
        except:
            self.logger.exception("Error in decision_mapping")

        # Returns a tuple with the decision and a list of strings
        # The list contains any additional information used to send the inspection to the PLC
        return decision, [type]

    def send_action(self, action: str, aux_info: List[str]) -> List[str]:
        """Sends values to customer PLC"""
        try:
            decision_int = int(action == "PASS")
            type = int(aux_info[0])
            if type == 1:
                self.client.write_register(1, decision_int)
            elif type == 2:
                self.client.write_register(2, decision_int)
            else:
                self.client.write_register(0, decision_int)
        except:
            self.logger.exception("Error in send_action")
            self.client.close()
            self.client = None
            return []
        
        # returns a list of strings that are sent to GoFactory as inspection tags
        # in this case return the action (PASS/FAIL) and the PLC_STATUS (RUNNING/STOPPED)
        return [action, self.PLC_STATUS]

    # custom task on the event loop
    async def check_plc_values(self) -> bool:
        """
        Check values reported by PLC
        """
        # This function runs in a loop and checks the values reported by the PLC every 5 seconds
        while True:
            try:
                value_0 = self.client.read_holding_registers(10, 1).registers[0]
                
                # checks value of the register and sets PLC_STATUS accordingly
                if value_0 == 1:
                    self.PLC_STATUS = "RUNNING"
                elif value_0 == 0:
                    self.PLC_STATUS = "STOPPED"

            except:
                self.logger.exception("Error in check_plc_values")
        
            await asyncio.sleep(5)
        