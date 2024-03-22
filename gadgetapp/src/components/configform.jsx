import React, { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./css/configform.css"
function ConfigForm({ configData, displayNames = [] }) {
    const [serviceType] = useState(configData['service_type'])
    const [instanceName] = useState(configData['instance_name'])
    const [instance] = useState(configData['instance'])
    const [formData, setFormData] = useState(configData['configs']);
    const [ showCheck, setShowCheck ] = useState(false)  

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    useEffect(() => {
        let timer;
        if (showCheck) {
            timer = setTimeout(() => {
                setShowCheck(false);
            }, 500); // 2000ms = 2 seconds
        }
        return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }, [showCheck]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = postData();
        setShowCheck(result);
        console.log(result);
    }

    const postData = async () => {
        try {
          const post_endpoint = `api/configs/update/${serviceType}/${instanceName}/${instance}`
      
          const content={"configs" : formData}
      
          const response = await fetch(post_endpoint, {
            method: 'POST',
            body:  JSON.stringify(content)
          });
      
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
      
          return true;
        } catch (error) {
          console.log(error);
          return false;
        } 
      }
    

    const getForm = (key, value) => {
        if (typeof(value) === 'boolean'){
            return <Form.Check 
                        type="checkbox" 
                        name={key}
                        checked={value}
                        onChange={handleChange}
                    />
        } else {
            return <Form.Control 
                        className="text-form"
                        type="text" 
                        placeholder={value}
                        name={key}
                        value={value}
                        onChange={handleChange}
                    />
        }
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            {Object.keys(formData).map((key, index) => {
                                if (displayNames.length === 0 || displayNames.includes(key)){
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="fragment">
                                                <Form.Label style={{ fontWeight: 'bold' }}>{key}:</Form.Label>
                                                { getForm(key, formData[key]) }
                                            </div>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button> {'    '}
                        <FaCheck hidden={!showCheck} />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ConfigForm;
