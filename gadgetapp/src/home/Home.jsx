import './Home.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../components/header';
import Body from '../components/body';
import Footer from '../components/footer';
import { UpdateProvider } from '../components/common/updatecontext';

import configs from '../config.json';

export default function Base() {
    return (
        <div className="top-level">
            <UpdateProvider>
                <Container fluid className="vh-100 d-flex flex-column">
                    <Row className="header-content g-0">
                        <Header app_name={configs['app_name']} button_info="admin"/>
                    </Row>
                    <Row className="body-content g-0">
                        <Body/>
                    </Row>
                    <Row className="footer-content g-0">
                        <Footer/>
                    </Row>
                </Container>
            </UpdateProvider>
        </div>
    );
}

