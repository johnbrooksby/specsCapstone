import React from "react";
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";

class FooterIcons extends React.Component {
  render() {
    return(
    <div className="footerIcons">
      <h3>
        <a className="footerLinks" href='https://instagram.com/suresparkcoaching' target='_blank'>
        <FaInstagram />
        </a>
      </h3>
      <h3>
        <a className="footerLinks" href='mailto:suresparkcoaching@gmail.com'>
        <FaRegEnvelope />
        </a>
      </h3>
    </div>
    );
  }
}

export default FooterIcons;
