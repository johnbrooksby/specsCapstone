import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const AddBillModal = (props) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  const authCtx = useContext(AuthContext);

  return (
    <div className="modalFormDiv">
      <div className="modalDiv"></div>
      <div>
        <a
          className="closeModal"
          onClick={() => {
            props.setModal(false);
            setReason("");
            setAmount("");
          }}
        >
          X
        </a>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const body = {
              userid: props.userid,
              charge_explanation: reason,
              amount_due: amount,
            };

            axios
              .post("/api/addbill", body)
              .then((res) => {
                setReason("");
                setAmount("");
                authCtx.setBills(...authCtx.bills, res.data);
              })
              .catch((err) => console.error(err));

            window.scrollTo(0, 0);
            props.setModal(false);
            props.setAddedBill(!props.addedBill);
          }}
          className="add_charge_form"
        >
          <input
            placeholder="Reason"
            className="form-input"
            autoFocus
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />
          <input
            placeholder="Amount (e.g. 50)"
            className="form-input"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <button className="orange-btn">Add Charge</button>
        </form>
      </div>
    </div>
  );
};

export default AddBillModal;
