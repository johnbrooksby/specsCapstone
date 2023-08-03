import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddBillModal from "./AddBillModal";
import AuthContext from "../store/authContext";
import axios from "axios";

const Billing = (props) => {
  const authCtx = useContext(AuthContext);

  let totalDue = 0;
  let totalPaid = 0;
  let total = 0;
  let accountBillList = [];
  let billList = [];

  const [modal, setModal] = useState(false);

  const [markaspaid, setMarkaspaid] = useState(true);
  const [addedBill, setAddedBill] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [edit, setEdit] = useState(false);

  // useEffect(() => {
  // authCtx.setAdmin(localStorage.getItem("admin"));
  // });

  useEffect(() => {
    if (authCtx.admin) {
      let body = { id: props.userid };
      axios
        .post("/billing", body)
        .then((res) => {
          props.setBills(res.data[0].billinginfos);
          authCtx.setBills(res.data[0].billinginfos);
          setRefreshPage(!refreshPage);
        })
        .catch((err) => console.error(err));
    }
  }, [addedBill, markaspaid, modal]);

  billList = props.bills.map((charge) => {
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
        <td className="bills_detail checkbox">
          <button
            className={edit ? "paid_save_btn" : "paid_save_btn disabled"}
            disabled={!edit ? true : false}
            onClick={() => {
              let body = {
                id: charge.id,
                paid: !charge.paid,
              };
              axios.put("/markaspaid", body).then((res) => {
                setMarkaspaid(markaspaid ? false : true);
              });
            }}
          >
            {charge.paid ? "Unpaid" : "Paid"}
          </button>
        </td>
      </tr>
    );
  });

  accountBillList = props.bills.map((charge) => {
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
      </tr>
    );
  });

  return (
    <div>
      {modal && (
        <AddBillModal
          setModal={setModal}
          userid={props.userid}
          addedBill={addedBill}
          setAddedBill={setAddedBill}
          bills={props.bills}
          setBills={props.setBills}
        />
      )}
      <div
        className={
          !authCtx.admin
            ? "billdetail"
            : !modal
            ? "billdetail billdetail_admin"
            : "billdetail billdetail_admin billdetail_blur"
        }
      >
        <h3 className="billPageHeader">
          Billing Info for {props.client ? props.client : authCtx.client}
        </h3>
        <NavLink to="clientinfo">Edit client information</NavLink>
        <br></br>
        <div className="table">
          <table className="bills_detail_table">
            <thead>
              <tr>
                <td className="bills_detail_head">Explanation:</td>
                <td className="bills_detail_head">Amount Due:</td>
                <td className="bills_detail_head">Paid?</td>
                {authCtx.admin && (
                  <td className="bills_detail_head edit_head">
                    <button
                      className="paid_save_btn"
                      onClick={() => {
                        setEdit(!edit);
                      }}
                    >
                      {!edit ? "Edit" : "Save"}
                    </button>
                  </td>
                )}
              </tr>
            </thead>
            <tbody>{authCtx.admin ? billList : accountBillList}</tbody>
            <tfoot>
              <tr>
                <td className="bills_detail_foot">Total:</td>
                <td className="bills_detail_foot">${total / 2}</td>
              </tr>
              <tr>
                <td className="bills_detail_foot">Total Amount Paid:</td>
                <td className="bills_detail_foot">${totalPaid / 2}</td>
              </tr>
              <tr>
                <td className="bills_detail_foottwo">Amount Due:</td>
                <td className="bills_detail_foottwo">${totalDue / 2}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {authCtx.admin && (
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

        {authCtx.admin && (
          <a
            onClick={() => props.setBack(!props.back)}
            className="backbtn topBack"
          >
            &#x3c;&#x3c;Back
          </a>
        )}
        {authCtx.admin && (
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
