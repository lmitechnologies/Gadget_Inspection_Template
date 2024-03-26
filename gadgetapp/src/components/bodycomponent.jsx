import React, { useRef, useEffect, useState } from 'react';
import { useUpdate } from './common/updatecontext';
import "./css/bodycomponent.css"
// import MultiLineChart from './charts/multilinechart';
// import LineChart from './charts/linechart';
// import BarChart from './chart  s/barchart';
// import HistogramChart from './charts/histogramchart';

// import { BarChart } from './custom/my-library.es';
// import { LineChart } from './custom/my-library.es';

import * as CustomComponents from './custom/my-library.es';
import ImageCanvas from './imagecanvas';
import Metric from './metric';

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
      const loadComponent = async () => {
        // Dynamically import all components in the 'components' directory
        const componentModules = import.meta.glob('/custom/*.jsx');

        // Find the component by name and import it
        for (const path in componentModules) {
            // Assuming the file name (without extension) is the component name
            const name = path.split('/').pop().replace('.jsx', '');
            console.log(`Name: ${name}, Path: ${path}`)
            if (name === componentName) {
                const module = await componentModules[path]();
                setComponent(() => module.default);
                setLoadError(false)
                return;
            }
        }
        // If no component is found, you can set a default state or handle the "not found" case
        console.log(`${componentName} component not found.`);
        setLoadError(true);
      };

      if (componentName == 'imagecanvas') {
        setComponent(() => ImageCanvas);
      } else if (componentName == 'metric') {
        setComponent(() => Metric);
      } else if (componentName == 'linechart') {
        setComponent(() => LineChart);
      } else if (componentName == 'barchart') {
        setComponent(() => BarChart);
      // } else if (componentName == 'histogramchart') {
      //   setComponent(() => HistogramChart);
      } else if (componentName == 'multilinechart') { 
        setComponent(() => MultiLineChart);
      } else {
        loadComponent();
      }
        
    }, [componentName]);

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
    } else if (loadError){
      return (
        <div className='error-div' style={style} >Error loading component</div>
      );
    } else {
      return (
        <div className='error-div' style={style} >Loading...</div>
      );
    }
}

export default BodyComponent;
