import React, { useState } from "react";

const withIndicator = (Component) => {
  return (props) => {
    const [showIndicator, setShowIndicator] = useState(false);

    const handleMouseOver = () => {
      setShowIndicator((showIndicator) => (showIndicator = true));
    };

    const handleMouseOut = () => {
      setShowIndicator((showIndicator) => (showIndicator = false));
    };

    return (
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Component {...props} showIndicator={showIndicator} />
      </div>
    );
  };
};

export default withIndicator;
