import React from 'react';
import './css/LEDIndicator.css';

const LEDIndicator = ({ color }) => {
  const ledStyle = {
    background: `radial-gradient(circle at 35% 25%, #FFF, ${color} 60%, #000)`
  };

  return (
    <div
      className={`LEDIndicator`}
      style={ledStyle}
    />
  );
};

export default LEDIndicator;