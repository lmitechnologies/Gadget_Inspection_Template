import React, { useRef, useEffect, useState } from 'react';
import { useUpdate } from './common/updatecontext';
import "./css/bodycomponent.css"
import LineChart from './linechart';
import BarChart from './barchart';
import HistogramChart from './histogramchart';
import ImageCanvas from './imagecanvas';

import { BACKEND_URL } from '../config.json';

function BodyComponent({ componentName, topic, height, onClick, ...props }) {
    const [Component, setComponent] = useState(null);
    const [loadError, setLoadError] = useState(false);
    const [inspection, setInspection] = useState(null);
    const webSocket = useRef(null);
    const retryRef = useRef(null);
    let socketTopic = useRef(null);

    useEffect(() => {
      if (topic == socketTopic.current) {
        return;
      }
      socketTopic.current = topic;

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

  
    useEffect(() => {
        // if (componentName) {
        //     import(/* @vite-ignore */`./${componentName}.jsx`)
        //         .then((module) => {
        //             setComponent(() => module.default);
        //         })
        //         .catch((error) => {
        //             console.error(`Component "${componentName}" could not be loaded`, error);
        //             setLoadError(true);
        //         });
        // }
        if (componentName == 'linechart') {
          setComponent(() => LineChart);
        } else if (componentName == 'barchart') {
          setComponent(() => BarChart);
        } else if (componentName == 'histogramchart') {
          setComponent(() => HistogramChart);
        } else if (componentName == 'imagecanvas') {
          setComponent(() => ImageCanvas);
        }
        
    }, [componentName]);

    if (loadError) {
        return <div>Error loading component</div>;
    }

    const style = {
      height: `${height}`
    }

    if (Component) {
      return(
        <div className='body-component' style={style}>
          <button className="expand-btn" onClick={onClick}>⤢</button>
          <Component inspection={inspection} {...props} />
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
}

export default BodyComponent;
