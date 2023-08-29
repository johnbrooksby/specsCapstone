import React, {useContext} from "react";
import AuthContext from "../../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    !authCtx.admin && (
    <div className="header">
      <div className="sub-header">
        <div className="head-spacer"></div>
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
  )
  );
};

export default Header;
