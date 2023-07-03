import React, { useState, useMemo } from "react";
import AddBillModal from "./AddBillModal";

const Billing = (props) => {
  // const { bills, client, back, setBack } = props;
  // console.log('bills in billing page', props.bills)
  // console.log('client in billing page', props.client)
  let totalDue = 0;
  let totalPaid = 0;
  let total = 0

  const [modal, setModal] = useState(false);

  
  const billList = props.bills.map((charge) => {
    total += +charge.amount_due
    if (charge.paid){totalPaid += +charge.amount_due}
    if (!charge.paid){totalDue += +charge.amount_due}
    // console.log("charge.paid", charge.paid)
    return (
      // <div key={charge.id} className="billdiv">
      //   <li>{charge.charge_explanation}</li>
      //   <li>{charge.amount_due}</li>
      // </div>
      <tr key={charge.id}>
          <td className="bills_detail">{charge.charge_explanation}</td>
          <td className="bills_detail amount">${charge.amount_due}</td>
          <td className={charge.paid ? "bills_detail paid amount" : "bills_detail unpaid amount"}>{charge.paid ? "Yes" : "No"}</td>
          {/* {props.admin && <td className={charge.paid ? "bills_detail paid amount" : "bills_detail unpaid amount"}>{charge.paid ? "Yes" : "No"}</td>} */}
        </tr>
      );
    });
    // const refreshTable = useMemo(() => billList, [modal] )

    return (
      <div
        className={
          !props.admin
            ? "billdetail"
            : !modal
            ? "billdetail billdetail_admin"
            : "billdetail billdetail_admin billdetail_blur"
        }
      >
        <h3 className="billPageHeader">Billing Info for {props.client}</h3>
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
                <td className="bills_detail_head">Paid?</td>
                {/* {props.admin && <td className="bills_detail_head">Paid?</td>} */}
              </tr>
            </thead>
            <tbody>{billList}</tbody>
            <tfoot>
              <tr>
                <td className="bills_detail_foot">Total:</td>
                <td className="bills_detail_foot">${total}</td>
              </tr>
              <tr>
                <td className="bills_detail_foot">Total Amount Paid:</td>
                <td className="bills_detail_foot">${totalPaid}</td>
              </tr>
              <tr>
                <td className="bills_detail_foottwo">Amount Due:</td>
                <td className="bills_detail_foottwo">${totalDue}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {props.admin && (
          <div className="add_charge">
            <a
              className="orange-btn"
              onClick={() => {
                setModal(true);
              }}
            >
              Add New Charge
            </a>
          </div>
        )}

        {modal && <AddBillModal setModal={setModal} userid={props.userid} />}

        {props.admin && (
          <a
            onClick={() => props.setBack(!props.back)}
            className="backbtn topBack"
          >
            &#x3c;&#x3c;Back
          </a>
        )}
        {props.admin && (
          <a
            onClick={() => props.setBack(!props.back)}
            className="backbtn bottomBack"
          >
            &#x3c;&#x3c;Back
          </a>
        )}
      </div>
    );
};

export default Billing;
