import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteClientModal = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="modalDiv"></div>
      {/* <div> */}
        <a
          className="closeModal"
          onClick={() => {
            props.setModal(false);
          }}
        >
          X
        </a>
        {/* <div className="modalContainer"> */}
        <form className="add_charge_form"
        onSubmit={e =>
            e.preventDefault()}>
          <h3>Are you sure you want to delete this user? All history for this user will be lost forever!</h3>
          <a
            className="blue-btn"
            onClick={() => {
              props.setModal(false);
            }}
          >
            Cancel
          </a>
          <a
            className="orange-btn"
            onClick={() => {
              alert("User delete test successful");
              // axios
              //   .delete("/api/deleteUser/" + authCtx.clientId)
              //   .then(() => {})
              //   .catch((err) => {
              //     console.error(err);
              //   });
              props.setModal(false);
              setTimeout(() => navigate("/admin"), 100);
            }}
          >
            Delete Client
          </a>
        </form>
        {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default DeleteClientModal;

//   <div className="modalFormDiv">
//     <div className="modalDiv"></div>
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();

//           axios
//             .post("/api/addbill", body)
//             .then((res) => {
//               setReason("");
//               setAmount("");
//               authCtx.setBills(...authCtx.bills, res.data);
//             })
//             .catch((err) => console.error(err));

//           window.scrollTo(0, 0);
//           props.setModal(false);
//           props.setAddedBill(!props.addedBill);
//         }}
//         className="add_charge_form"
//       >
//         <input
//           placeholder="Reason"
//           className="form-input"
//           autoFocus
//           onChange={(e) => {
//             setReason(e.target.value);
//           }}
//         />
//         <input
//           placeholder="Amount (e.g. 50)"
//           className="form-input"
//           onChange={(e) => {
//             setAmount(e.target.value);
//           }}
//         />
//         <button className="orange-btn">Add Charge</button>
//       </form>
//     </div>
//   </div>
