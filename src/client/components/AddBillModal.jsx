import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const AddBillModal = (props) => {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(undefined);

  const authCtx = useContext(AuthContext);

  return (
    <div className="modalFormDiv">
      <div className="modalDiv">
      </div>
      <div>
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
                // console.log("res.data",res.data);
                setReason("");
                setAmount("");
                authCtx.setBills(...authCtx.bills, res.data)
                // console.log("authCtx.bills", authCtx.bills)
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
          <a className="orange-btn">Add Charge</a>
        </form>
      </div>
    </div>
  );
};

export default AddBillModal;
