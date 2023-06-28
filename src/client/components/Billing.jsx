import React from "react";

const Billing = (props) => {
  // const { bills, client, back, setBack } = props;
  // console.log('bills in billing page', props.bills)
  // console.log('client in billing page', props.client)
  let totalDue = 0;

  const billList = props.bills.map((charge) => {
    totalDue += +charge.amount_due;
    return (
      // <div key={charge.id} className="billdiv">
      //   <li>{charge.charge_explanation}</li>
      //   <li>{charge.amount_due}</li>
      // </div>
      <tr key={charge.id}>
        <td className="bills_detail">{charge.charge_explanation}</td>
        <td className="bills_detail">${charge.amount_due}</td>
      </tr>
    );
  });

  return (
    <div className="billdetail">
      <h3 className="billPageHeader">Update billing info for {props.client}</h3>
      <br></br>
      {/* <div className="billing">
        <ul className="billscontainer">{billList}</ul>
      </div> */}
      <div className="table">
        <table className="bills_detail_table">
          <thead>
            <tr>
              <td className="bills_detail_head">Explanation:</td>
              <td className="bills_detail_head">Amount Due:</td>
            </tr>
          </thead>
          <tbody>{billList}</tbody>
          <tfoot>
            <tr>
              <td className="bills_detail_foot">Total Due:</td>
              <td className="bills_detail_foot">${totalDue}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* {props.bills.charge_explanation} */}
      {/* {props.bills.amount_due} */}
      <a onClick={() => props.setBack(!props.back)} className="backbtn topBack">
        &#x3c;&#x3c;Back
      </a>
      <a onClick={() => props.setBack(!props.back)} className="backbtn bottomBack">
        &#x3c;&#x3c;Back
      </a>
    </div>
  );
};

export default Billing;
