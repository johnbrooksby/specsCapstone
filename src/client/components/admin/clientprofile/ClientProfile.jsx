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
        <h2 className="fourPar">
          {authCtx.admin ? "Client" : "User"} Profile for {localStorage.getItem("client")}
        </h2>
        <form className="editValuesForm">
          <input
            className="editInput"
            defaultValue={localStorage.getItem("client")}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={localStorage.getItem("email")}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={localStorage.getItem("street")}
            disabled={inactive}
          />
          <input
            className="editInput"
            defaultValue={localStorage.getItem("city")}
            disabled={inactive}
          />
          <input
            className="editInput"
            // defaultValue={authCtx.state}
            defaultValue={localStorage.getItem("state")}
            disabled={inactive}
          />
          <input
            className="editInput"
            // defaultValue={authCtx.zip}
            defaultValue={localStorage.getItem("zip")}
            disabled={inactive}
          />
          <a
            className="orange-btn"
            onClick={() => {
              setInactive(!inactive);
            }}
          >
            {inactive ? "Edit" : "Save"}
          </a>
        </form>
        <div className="Centered margin-top">
          <a
            className="orange"
            onClick={() => {
              setModal(true);
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
