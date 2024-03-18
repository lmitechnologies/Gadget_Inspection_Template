import './ConfigsAdmin.css';
import React, { useState, useEffect } from 'react';
import ConfigForm from '../components/configform';
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header';
import LMILogo from '../images/lmi_technologies_RGB.png';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

import "bootstrap-icons/font/bootstrap-icons.css";

import { BACKEND_URL } from '../config.json';

async function fetchData(endpoint, setData, setLoading, setError) {
  try {
    setLoading(true);
    const response = await fetch(endpoint);
    console.log(response)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    setData(data);
  } catch (error) {
    console.log(error);
    setError(error);
  } finally {
    setLoading(false);
  }
}

function ConfigsList({configsData}){
  return (
      <Accordion defaultActiveKey={0}>
        {
          configsData['data'].map((item, index) => {
            return (
              <Accordion.Item key={index} eventKey={index} >
                <Accordion.Header>{item['service_type']}/{item['instance_name']}/{item['instance']}</Accordion.Header>
                <Accordion.Body>
                  <ConfigForm configData={item}/>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        }
      </Accordion>
  );
}

function AddUserModal(show, onHide) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleSubmit = () => {
    setFail(false);
    setSuccess(false);

    if (username == '' || password == '') {
      return 
    }

    setLoading(true)
    
    const ws = new WebSocket(`ws:${BACKEND_URL}:5678?topic=add-user`);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify({topic: "add-user", username: username, password: password}));
    };

    ws.onmessage = (message) => {
      console.log("WebSocket Message: ", message);
      const data = JSON.parse(message.data);
      setLoading(false)
      if (data.message == 'success') {
        setSuccess(true);
        setUsername('');
        setPassword('');
      } else {
        setFail(true);
      }

      ws.close();
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      ws.close();
      setLoading(false);
      setFail(true);
    };
  }

  return (
      <Modal className="modal" show={show} size="lg" onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Admin User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-user-modal">
          
          <div className="add-user-form" onSubmit={handleSubmit}>
              <label className="error-message" hidden={!fail}>Unable to create new user</label>
              <label className="success-message" hidden={!success}>Successfully created user</label>
              <label htmlFor="username">Username: </label>
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <label htmlFor="password" style={{ marginTop: "5px" }}>Password: </label>
              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="add-user-button-container">
                <Button style={{ width: "50%" }} onClick={() => handleSubmit()}>
                  { loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Add User" }
                </Button>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

export default function ConfigsAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { 
    fetchData("/api/configs", setData, setLoading, setError); 
  }, []) 

  return (
    <div id="configs">
      <Container className="vh-100 d-flex flex-column">
            <Row className="header">
              <Col sm={2}>
                  <img className='img_logo' src={LMILogo} alt="LMI Technologies Logo" />
              </Col>
              <Col sm={8} className='app-name'>
                <h2>LMI FactorySmart Gadget Admin</h2>
              </Col>
              <Col sm={2} className='button-col' >
                  <DropdownButton variant="primary" menuVariant='dark' size="lg" title={<i className="bi bi-gear"></i>}>
                    <Dropdown.Item onClick={() => navigate(`/home`)}>Home</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShow(true)}>Add User</Dropdown.Item>
                  </DropdownButton>      
              </Col>
            </Row>
            <Row className="body">
                <Col md={{ span: 10, offset: 1 }}>
                  <div className="accordion-container">
                    {data &&
                      <>
                        <ConfigsList configsData={data} />
                      </>
                    }
                    {loading && "Loading..."}
                    {error && "Error"}
                  </div>
                </Col>
            </Row>
            { AddUserModal(show, handleClose) }
        </Container>
    </div>
  );
}