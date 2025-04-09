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


class AutomationClass():

    # get a logger
    logger = logging.getLogger()

    def __init__(self, **args) -> None:
        pass

    def connect(self) -> None:
        pass

    def disconnect(self) -> None:
        pass 

    def is_connected(self) -> bool:
        pass
    
    def decision_mapping(self, msg: str) -> Tuple[str, List[str]]:
        pass

    def send_action(self, action: str, aux_info: List[str]) -> List[str]:
        pass
