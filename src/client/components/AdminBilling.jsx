import React, { useState } from "react";
import axios from "axios";

let totalDue = 0;
let totalPaid = 0;
let total = 0;
let billList = [];

const AdminBilling = (props) => {
  billList = props.bills.map((charge) => {
    const [isChecked, setIsChecked] = useState(false);
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
          <input
            id={`paid.${charge.id}`}
            type="checkbox"
            className="paidCheckbox"
            defaultChecked={isChecked}
            name={`paid.${charge.id}`}
            onChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <button
            className="paid_save_btn"
            htmlFor={`paid.${charge.id}`}
            onClick={() => {
              let body = {
                id: charge.id,
              };
              {
                isChecked
                  ? axios.put("/markaspaid", body).then((res) => {
                      console.log("ischecked", isChecked);
                      setIsChecked(false);
                      console.log(res.data);
                      props.setMarkaspaid(!props.markaspaid);
                      console.log("ischecked", isChecked);
                    })
                  : alert("You must check a box to mark as paid");
              }
            }}
          >
            Save
          </button>
        </td>
      </tr>
    );
  });
  return <div>{billList}</div>;
};

export default AdminBilling;
export {billList}
