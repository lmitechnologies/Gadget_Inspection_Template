import React, { useRef, useEffect, useState } from 'react';
import './css/metric.css';

function formatString(str) {
    return str
        // Replace all underscores with spaces
        .replace(/_/g, ' ')
        // Split the string into words, then map over them to capitalize the first letter of each word
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        // Join the words back into a single string
        .join(' ');
}


function Metric({ inspection, metric_name }) {
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (!inspection) return;
        setValue(inspection['results'][metric_name]);
    }, [inspection]);
    return (
        <div className="metric-container">
            <div className="metric-name">{formatString(metric_name)}</div> 
            <div className="metric-value">{value}</div>
        </div>
    );
}

export default Metric;