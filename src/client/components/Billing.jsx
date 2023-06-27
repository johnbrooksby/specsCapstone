import React from "react";

const Billing = (props) => {
  // const { bills, client, back, setBack } = props;
  // console.log('bills in billing page', props.bills)
  // console.log('client in billing page', props.client)

  const billList = props.bills.map((charge) => {
    return (
        <div key={charge.id} className="billdiv">
          <li>{charge.charge_explanation}</li>
          <li>{charge.amount_due}</li>
        </div>
    );
  });

  return (
    <div className="billdetail">
      <h3>Update billing info for {props.client}</h3>
      <br></br>
      <div className="billing">
        <ul className="billscontainer">{billList}</ul>
      </div>
      {/* {props.bills.charge_explanation} */}
      {/* {props.bills.amount_due} */}
      <a onClick={() => props.setBack(!props.back)} className="backbtn">
        &#x3c;&#x3c;Back
      </a>
    </div>
  );
};

export default Billing;
