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
          {authCtx.admin ? "Client" : "User"} Profile for{" "}
          {authCtx.admin && !authCtx.refered ? localStorage.getItem("adminUser") : localStorage.getItem("client")}
        </h2>
        <form className="editValuesForm">
          <input
            className="editInput"
            id="client"
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminUser") : localStorage.getItem("client")}
            disabled={inactive}
          />
          <input
            className="editInput"
            id="email"
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminEmail") : localStorage.getItem("email")}
            disabled={inactive}
          />
          <input
            className="editInput"
            id="street"
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminStreet") : localStorage.getItem("street")}
            disabled={inactive}
          />
          <input
            className="editInput"
            id="city"
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminCity") : localStorage.getItem("city")}
            disabled={inactive}
          />
          <input
            className="editInput"
            id="state"
            // defaultValue={authCtx.state}
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminState") : localStorage.getItem("state")}
            disabled={inactive}
          />
          <input
            className="editInput"
            id="zip"
            // defaultValue={authCtx.zip}
            defaultValue={authCtx.admin && !authCtx.refered ? localStorage.getItem("adminZip") : localStorage.getItem("zip")}
            disabled={inactive}
          />
          <a
            className="orange-btn"
            onClick={() => {
              setInactive(!inactive);
              let body = {
                id: authCtx.clientId,
                client: client.value,
                email: email.value,
                street: street.value,
                city: city.value,
                state: state.value,
                zip: zip.value,
              };
              {
                !inactive &&
                  axios
                    .put("/api/editUser", body)
                    .then(() => {console.log("success")})
                    .catch((err) => console.error(err));
              }
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
