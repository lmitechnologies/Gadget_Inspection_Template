import React, { useEffect, useState, useRef } from 'react';

import { BACKEND_URL } from '../../config.json';

function useWebSocket( topic ) {
    const [inspection, setInspection] = useState(null);
    
    const webSocket = useRef(null);  
    const retryRef = useRef(null);

    useEffect(() => {
      if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
          webSocket.current.close();
      }

      function connect () {
        webSocket.current = new WebSocket(`ws:${BACKEND_URL}:5678?topic=${topic}`);
        
        webSocket.current.onopen = () => {
          console.log("WebSocket Connected");
          if (webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify({ topic }));
            if (retryRef.current) {
              clearInterval(retryRef.current);
              retryRef.current = null;
            }
          }
        }; 

        webSocket.current.onmessage = (event) => {
          console.log("WebSocket Message: ", event.data);
          setInspection(JSON.parse(event.data));
        };

        webSocket.current.onerror = (error) => {
          console.error("WebSocket Error: ", error);
          webSocket.current.close(); // Trigger the onclose handler
        };

        webSocket.current.onclose = () => {
          console.log("WebSocket Disconnected");
          // Start retrying if not already doing so
          if (!retryRef.current) {
              retryRef.current = setInterval(connect, 5000);
          }
        };
      }
      
      connect();

      return () => {
        if (webSocket.current){
          if (webSocket.current === WebSocket.OPEN) {
              socket.close();
          }
        }
      };
    }, [topic]);
    
    return inspection;
}

export default useWebSocket;