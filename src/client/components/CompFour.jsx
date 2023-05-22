import React from "react";

const CompFour = () => {
  return (
    <div className="compFour">
      <div className="comp-Four">
        <img
          className="hierarchy"
          src="https://drive.google.com/uc?export=view&id=1-iH9Ey68Ml9FKc88TcLOvjOSt47y_CUp"
          alt="hierarchy of needs"
        />
        {/* <div> */}
        <div className="compFour-text">
          <h1 className="fourTitle">Safety and Ownership</h1>
          <h2 className="fourPar">
            My goal is to help individuals, couples and families create safety
            in their relationships using “Empowered-Meek Communication” and
            self-confrontation tools. When you don’t feel safe, you can’t truly
            be yourself, you can’t be vulnerable, and you can’t grow. <br />
            <br />
            When there is safety you are able to own what is yours without fear
            and shame and then can intentionally create the experiences you
            want.
          </h2>
          <a
            className="orange-btn"
            href="https://calendly.com/suresparkcoaching/30min?month=2023-05"
            target="_blank"
          >
            Schedule a Call to Learn More
          </a>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default CompFour;
