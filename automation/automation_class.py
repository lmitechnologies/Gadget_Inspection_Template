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
from ipaddress import ip_address
import logging
import csv
from typing import List, Tuple
from pymodbus.client.sync import ModbusTcpClient
from time import time



class AutomationClass():

    # get a logger
    logger = logging.getLogger()
    client = None


   
    def __init__(self) -> None:
        pass

    def connect(self) -> None:
        pass

    def disconnect(self) -> None:
        pass 

    def is_connected(self) -> bool:
        pass
    
    def decision_mapping(self, msg: str) -> Tuple[str, List[str]]:
        pass

    def send_action(self, action: str, aux_info: List[str]) -> bool:
        pass

    


    
if __name__ == '__main__':
    auto = AutomationClass()

    print("done")
