import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import DeleteClientModal from "./DeleteClientModal";
import axios from "axios";

const ClientProfile = () => {
  const [modal, setModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [inactive, setInactive] = useState(true);

  console.log(authCtx.email);

  return (
    // <div className="clientProfilePage">
    <div>
      {modal && (
        <DeleteClientModal setModal={setModal} userid={authCtx.clientId} />
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
        <h2 className="fourPar">{authCtx.admin ? "Client" : "User"} Profile for {authCtx.client}</h2>
        <form className="editValuesForm">
          <input
            className="editInput"
            defaultValue={authCtx.email}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={authCtx.street}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={authCtx.city}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={authCtx.state}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={authCtx.zip}
            disabled={inactive}
          />
        </form>

        <div className="Centered">
          <a
            className="orange"
            onClick={() => {
              setModal(true);
              // axios
              //   .delete("/api/deleteUser/" + authCtx.clientId)
              //   .then(() => {})
              //   .catch((err) => {
              //     console.error(err);
              //   });
              // setTimeout(() => navigate("/admin"), 300);
            }}
          >
            Delete User
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
