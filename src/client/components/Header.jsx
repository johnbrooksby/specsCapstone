import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="sub-header">
        <div></div>
        <div className="header-text">Let's Chat!</div>
           <a
            className="blue-btn"
            href="https://calendly.com/suresparkcoaching/30min?month=2023-05"
            target="_blank"
          >
            Schedule a Call to Learn More
          </a>
      </div>
    </div>
  );
};

export default Header;
