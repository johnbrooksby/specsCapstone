import React, { useState, useContext, useEffect, useMemo } from "react";
import AddBillModal from "./AddBillModal";
import AuthContext from "../store/authContext";
import axios from "axios";

const Billing = (props) => {
  const authCtx = useContext(AuthContext);

  let totalDue = 0;
  let totalPaid = 0;
  let total = 0;
  let billList;

  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  billList = (props.bills ? props.bills : authCtx.bills).map((charge) => {
    total += +charge.amount_due;
    if (charge.paid) {
      totalPaid += +charge.amount_due;
    }
    if (!charge.paid) {
      totalDue += +charge.amount_due;
    }
    return (
      <tr key={charge.id}>
        <td className="bills_detail">{charge.charge_explanation}</td>
        <td className="bills_detail amount">${charge.amount_due}</td>
        <td
          className={
            charge.paid
              ? "bills_detail paid amount"
              : "bills_detail unpaid amount"
          }
        >
          {charge.paid ? "Yes" : "No"}
        </td>
        {authCtx.admin && (
          <td className="bills_detail checkbox">
            <input
              id={`paid.{charge.id}`}
              type="checkbox"
              className="paidCheckbox"
              defaultChecked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <button
              className="paid_save_btn"
              htmlFor={`paid.{charge.id}`}
              onClick={() => {
                let body = {
                  id: charge.id,
                };
                {
                  isChecked
                    ? axios.put("/markaspaid", body).then((res) => {
                        console.log(res.data);
                        props.setMarkaspaid(!props.markaspaid);
                      })
                    : alert("You must check a box to mark as paid");
                }
              }}
            >
              Save
            </button>
          </td>
        )}
      </tr>
    );
  });

  return (
    <div>
      {modal && (
        <AddBillModal
          setModal={setModal}
          userid={props.userid}
          addedBill={props.addedBill}
          setAddedBill={props.setAddedBill}
        />
      )}
      <div
        className={
          !props.admin
            ? "billdetail"
            : !modal
            ? "billdetail billdetail_admin"
            : "billdetail billdetail_admin billdetail_blur"
        }
      >
        <h3 className="billPageHeader">
          Billing Info for {props.client ? props.client : authCtx.client}
        </h3>
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
                {authCtx.admin && (
                  <td className="bills_detail_head">Mark as Paid</td>
                )}
                {/* {props.admin && <td className="bills_detail_head">Paid?</td>} */}
              </tr>
            </thead>
            <tbody>{billList}</tbody>
            {/* <tbody>{useMemo(() => billList, [authCtx.bills])}</tbody> */}
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
    </div>
  );
};

export default Billing;
