import React from "react";
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";

class FooterIcons extends React.Component {
  render() {
    return(
    <div className="footerIcons">
        <a className="footerLinks" href='https://instagram.com/suresparkcoaching' target='_blank'>
        <FaInstagram />
        </a>
        <a className="footerLinks" href='mailto:suresparkcoaching@gmail.com'>
        <FaRegEnvelope />
        </a>
    </div>
    );
  }
}

export default FooterIcons;
