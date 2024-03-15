import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServiceConfigs from './serviceconfigs'
import { useState } from 'react';
import { config } from 'process';
import './css/serviceconfigmodal.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function ConfigModal(show, onHide, mode) {
    return (
        <Modal className="modal" show={show} size="lg" onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {mode}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ServiceConfigs service_type={mode.toLocaleLowerCase()} />
          </Modal.Body>
        </Modal>
      );
    }

export default function ServiceConfigModal() {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("Sensor")

    const handleClose = () => setShow(false);

    const handleShow = (mode) => {
        setMode(mode)
        setShow(true);

    }
  return (
    <>
      <DropdownButton menuVariant='dark' title="Service Configs">
        <Dropdown.Item onClick={() => handleShow("Sensor")} >Sensor</Dropdown.Item>
        <Dropdown.Item onClick={() => handleShow("Pipeline")} >Pipeline</Dropdown.Item>
        <Dropdown.Item onClick={() => handleShow("Automation")}>Automation</Dropdown.Item>
      </DropdownButton>
      { ConfigModal(show, handleClose, mode) }
    </>
  );
}
