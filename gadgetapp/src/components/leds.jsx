import React, { useState, useEffect } from 'react';
import useWebSocket from './common/useWebSocket';
import './css/led.css';

export default function StatusLEDs() {
    const socket = useWebSocket("runtime_status");
    const [LEDS, setLEDS] = useState([]);

    useEffect(() => {
        if (!socket) return;
        setLEDS(Object.keys(socket).map((key) => getLEDs(key, socket[key])));
    }, [socket]);

    function getLEDs(key, statuses) {
        if (JSON.stringify(statuses) === "{}") return;

        return (
            <div className='service-leds' key={key}>
                <div className='leds'>
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
                        return <div key={key} className={`led led-${color}`} />
                        
                    })}
                </div>
                {key}
            </div>
        );
    }

    return (
        <div className="led-container">
            {LEDS}
        </div>
    );
}
