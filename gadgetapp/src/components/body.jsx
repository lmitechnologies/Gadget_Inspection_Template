import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BodyComponent from './bodycomponent';

import configs from '../config.json';
import './css/body.css'

export default function Body() {

    const body_height = "85vh";

    const [highlight, setHighlight] = useState(false);
    const [type, setType] = useState("");
    const [topic, setTopic] = useState("");
    const [decision_key, setDecisionKey] = useState("");
 
    if (highlight) {
        let component = null;

        try {
            component = <BodyComponent key="0" componentName={type} topic={topic} decision_key={decision_key} height={`calc(${body_height} / 1)`} onClick={() => {setHighlight(false)}}/>
        } catch (error) {
            console.log("Error high-lighting component", error)
        }
        
        return (
            <Col sm={12} >
                {component}
            </Col>
        );
    } else {
        return (
            <>
                <Col sm={10}>
                    <BodyComponent key="1" componentName="imagecanvas" topic="pipeline/default" height={`calc(${body_height} / 1)`} onClick={() => {setHighlight(true); setType("imagecanvas"); setTopic("pipeline/default");}}/>
                </Col>
                <Col sm={2}>
                    <BodyComponent key="2" componentName="barchart"  topic="pipeline/default" height={`calc(${body_height} / 2)`} decision_key="decision" onClick={() => {setHighlight(true); setType("barchart"); setTopic("pipeline/default"); setDecisionKey("decision");}}/>
                    <BodyComponent key="3" componentName="linechart" topic="pipeline/default" height={`calc(${body_height} / 2)`} decision_key="decision" onClick={() => {setHighlight(true); setType("linechart"); setTopic("pipeline/default"); setDecisionKey("decision");}}/>
                </Col>
            </>
        )
    }
}

