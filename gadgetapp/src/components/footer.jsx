import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import './css/footer.css';
import StatusLEDs from './leds';
import React, { useEffect, useState, useRef } from 'react';
import ServiceConfigModal from './serviceconfigmodal';
import { useUpdate } from './common/updatecontext';
import LEDIndicator from './ledindeicator';
import './css/led.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Col from 'react-bootstrap/Col';
import { Stack } from 'react-bootstrap';

import { BACKEND_URL } from '../config.json';

export default function Footer() {
  const [ running, setRunning ] = useState(false);
  const [ loading, setLoading ] = useState(false); 
  const [ connected, setConnected ] = useState(false);
  const [ webSocket, setWebSocket ] = useState(null);
  const { shouldUpdate, toggleUpdate } = useUpdate();

  const retryRef = useRef(null);


  useEffect(() => {
      // Create a new WebSocket connection
      function connect() {

          const ws = new WebSocket(`ws:${BACKEND_URL}:5678?topic=start-stop`);

          ws.onopen = () => {
              console.log("WebSocket Connected");
              setConnected(true);
              if (retryRef.current) {
                  clearInterval(retryRef.current);
                  retryRef.current = null;
              }
          };

          ws.onmessage = (event) => {
              console.log("WebSocket Message: ", event.data);
              setRunning(JSON.parse(event.data).running)
          };

          ws.onerror = (error) => {
              console.error("WebSocket Error: ", error);
              ws.close(); // Trigger the onclose handler
          };

          ws.onclose = () => {
              console.log("WebSocket Disconnected");
              setConnected(false);
              // Start retrying if not already doing so
              if (!retryRef.current) {
                  retryRef.current = setInterval(connect, 5000);
              }
          };

          setWebSocket(ws)

      };

      connect();

      return () => {
          if (connected) {
              webSocket.close();
          }
          if (retryRef.current) {
              clearInterval(retryRef.current);
          }
      };

  }, []);

  async function startOnClick() {
    try {
      setLoading(true);
      const result = await webSocket.send(JSON.stringify({topic: "start-stop", message: running ? "stop" : "start"}));      
      console.log("Gadget started/stopped")
    } catch (error) {
      console.log("Error starting/stopping the pipeline", error);
    }
  }

  useEffect (() => {
    setLoading(false);
  }, [running])

  function eventResetOnClick() {
    localStorage.clear();
    window.location.reload();
  }

  return (
      <>
          <Col sm={2} className="button-container">
            <ServiceConfigModal />
            
            <Button className='button' variant="primary" onClick={() => eventResetOnClick()}> 
              <i className="bi bi-arrow-counterclockwise"></i>
            </Button>
            <Button className='button' variant="primary" onClick={() => toggleUpdate()}> 
              { shouldUpdate ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>}
            </Button>
          </Col>
          <Col sm={8} className="led-container">
            <StatusLEDs />
          </Col>
          <Col sm={2} className="start-button-container">
            <Button className='start-stop-button' variant={running ? "danger" : "success"} size="lg" onClick={() => startOnClick()}> 
              {
                loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : running ? "Stop" : "Start"
              }
            </Button>       
          </Col>
      </>
  );
}   
