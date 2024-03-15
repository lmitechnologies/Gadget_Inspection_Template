import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Stack } from 'react-bootstrap';
import useWebSocket from './common/useWebSocket';
import './css/led.css';

export default function StatusLEDs() {
    const socket = useWebSocket("runtime_status");
    const [stacks, setStacks] = useState([]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        setStacks(
            <Stack direction="horizontal">
                { Object.keys(socket).map((key) => getStack(key, socket[key])) }
            </Stack>
        )
    }, [socket]);
    
    function getStack(title, statuses) {
        if (JSON.stringify(statuses) === "{}"){
            return;
        } else {
            return (
                <Stack key={title} className="LEDStack" direction="vertical">
                    <Stack direction="horizontal">
                        {Object.entries(statuses).map(([key, value]) => {
                            let color = "red";
                            switch (value) {
                                case "RUNNING":
                                    color = "green";
                                    break;
                                case "INITILIZING":
                                    color = "yellow";
                                    break;
                                case "STOPPED":
                                    color = "red";
                                    break;
                                default:
                                    color = "red";
                            }
                            return <div key={`${title}-${key}`} className={`led-${color}`}/>;
                            
                        })}
                    </Stack>
                    <p>{title}</p>
                </Stack> 
            );
        }
    }

    return (
        <div className="badge-container">
            <Stack key="led-stack" direction="vertical">
                { stacks }
            </Stack>
        </div>
    );
}
