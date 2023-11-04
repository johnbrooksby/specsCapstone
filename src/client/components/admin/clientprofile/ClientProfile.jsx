import React, { useContext, useState } from "react";
import AuthContext from "../../../store/authContext";
import DeleteClientModal from "./DeleteClientModal";
import axios from "axios";

const ClientProfile = (props) => {
  const [modal, setModal] = useState(false);
  const authCtx = useContext(AuthContext);
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
            {props.name}
        </h2>
        <form className="editValuesForm">
          <input
            className="editInput"
            id="client"
            defaultValue={                
              authCtx.admin && props.client ? props.client : authCtx.client
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="email"
            defaultValue={
                authCtx.admin && props.email ? props.email : authCtx.email
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="street"
            defaultValue={
              authCtx.admin && props.street ? props.street : authCtx.street
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="city"
            defaultValue={
              authCtx.admin && props.city ? props.city : authCtx.city
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="state"
            defaultValue={
              authCtx.admin && props.state ? props.state : authCtx.state
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="zip"
            defaultValue={
              authCtx.admin && props.zip ? props.zip : authCtx.zip
            }
            disabled={inactive}
          />
          <a
            className="orange-btn"
            onClick={() => {
              setInactive(!inactive);

              let body = {
                id: props.id ? props.id : localStorage.getItem("userId"),
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
                    .then((res) => {
                      authCtx.admin ?
                          localStorage.setItem("adminState", res.data.state)
                        : localStorage.setItem("state", res.data.state);
                    })
                    .catch((err) => console.error(err));
              }

            }}
          >
            {inactive ? "Edit" : "Save"}
          </a>
        </form>
        {authCtx.admin && (
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
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
