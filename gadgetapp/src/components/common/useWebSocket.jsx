import React, { useEffect, useState, useRef } from 'react';

import { BACKEND_URL } from '../../config.json';

function useWebSocket( topic ) {
    const [inspection, setInspection] = useState(null);
    const [connected, setConnected] = useState(false);
    const [webSocket, setWebSocket] = useState(null);
    
    const retryRef = useRef(null);

    useEffect(() => {
        // Create a new WebSocket connection
        function connect() {

            const ws = new WebSocket(`ws:${BACKEND_URL}:5678?topic=${topic}`);

            ws.onopen = () => {
                console.log("WebSocket Connected");
                ws.send(JSON.stringify({topic }));
                setConnected(true);
                if (retryRef.current) {
                    clearInterval(retryRef.current);
                    retryRef.current = null;
                }
            };

            ws.onmessage = (event) => {
                setInspection(JSON.parse(event.data));
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

    }, [topic]);
    
    return inspection;
}

export default useWebSocket;