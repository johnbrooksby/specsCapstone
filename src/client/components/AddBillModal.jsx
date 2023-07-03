import React, { useState } from "react";
import axios from "axios";

const AddBillModal = (props) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(undefined);

  return (
    <div className="modalDiv">
      <a
        className="closeModal"
        onClick={() => {
          props.setModal(false);
        }}
      >
        X
      </a>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        //   console.log("props.userid",props.userid);
          const body = {
            userid: props.userid,
            charge_explanation: reason,
            amount_due: amount,
          };
          axios
            .post("/addbill", body)
            .then((res) => {
              console.log(res.data);
              setReason("");
              setAmount("");
            })
            .catch((err) => console.error(err));

          props.setModal(false);
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
        <button className="orange-btn">Add this Charge</button>
      </form>
    </div>
  );
};

export default AddBillModal;
