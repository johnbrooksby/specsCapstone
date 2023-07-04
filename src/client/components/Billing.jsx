import React, { useState, useContext, useEffect, useMemo, useCallback } from "react";
import AddBillModal from "./AddBillModal";
import axios from "axios";
import AuthContext from "../store/authContext";

const Billing = (props) => {
  // const { bills, client, back, setBack } = props;
  // console.log('bills in billing page', props.bills)
  // console.log('client in billing page', props.client)

  const authCtx = useContext(AuthContext);

  let totalDue = 0;
  let totalPaid = 0;
  let total = 0;
  let billList;

  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   let body = { id: props.userid };
  //   axios
  //     .post("/billing", body)
  //     .then((res) => {
  //       console.log("---res.data---", res.data[0].billinginfos);
  //       props.setClient(res.data[0].name);
  //       props.setBills(res.data[0].billinginfos);
  //       console.log("props.bills",props.bills)
  // setTimeout(() => {

    billList = authCtx.bills.map((charge) => {
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
              {/* {props.admin && <td className={charge.paid ? "bills_detail paid amount" : "bills_detail unpaid amount"}>{charge.paid ? "Yes" : "No"}</td>} */}
            </tr>
          );
        });
      // }, 3000)
        // })
  //     .catch((err) => console.error(err));
  // }, [modal]);

  return (
    <div>
      {modal && <AddBillModal setModal={setModal} userid={props.userid} />}
      <div
        className={
          !props.admin
            ? "billdetail"
            : !modal
            ? "billdetail billdetail_admin"
            : "billdetail billdetail_admin billdetail_blur"
        }
      >
        <h3 className="billPageHeader">Billing Info for {authCtx.client}</h3>
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
