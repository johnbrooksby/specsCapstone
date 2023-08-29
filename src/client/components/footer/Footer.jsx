import React from "react";
import FooterIcons from "./FooterIcons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="spacer"></div>
      <div>
        <FooterIcons />
      </div>
      <div className="footer-text">&copy; 2023 Sure Spark Coaching</div>
    </div>
  );
};

export default Footer;
