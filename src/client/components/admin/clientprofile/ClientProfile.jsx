import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import DeleteClientModal from "./DeleteClientModal";
import axios from "axios";

const ClientProfile = (props) => {
  const [modal, setModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [inactive, setInactive] = useState(true);
  const [refered, setRefered] = useState(false)
  
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
          {/* {authCtx.admin && !refered
          // {/* {authCtx.admin */}
            {/* ? localStorage.getItem("adminUser") */}
            {/* : localStorage.getItem("client")} */}
            {props.name}
        </h2>
        <form className="editValuesForm">
          <input
            className="editInput"
            id="client"
            defaultValue={
              // authCtx.admin && !refered
              // authCtx.admin
                
              authCtx.admin && props.client ? props.client : authCtx.client
                // : localStorage.getItem("client")
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="email"
            defaultValue={
              // authCtx.admin && !refered
                //  localStorage.getItem("adminEmail")
                // : localStorage.getItem("email")
                authCtx.admin && props.client ? props.email : authCtx.email
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="street"
            defaultValue={
              authCtx.admin && !refered
                ? localStorage.getItem("adminStreet")
                : localStorage.getItem("street")
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="city"
            defaultValue={
              authCtx.admin && !refered
                ? localStorage.getItem("adminCity")
                : localStorage.getItem("city")
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="state"
            // defaultValue={authCtx.state}
            defaultValue={
              authCtx.admin && !refered
                ? localStorage.getItem("adminState")
                : localStorage.getItem("state")
            }
            disabled={inactive}
          />
          <input
            className="editInput"
            id="zip"
            // defaultValue={authCtx.zip}
            defaultValue={
              authCtx.admin && !refered
                ? localStorage.getItem("adminZip")
                : localStorage.getItem("zip")
            }
            disabled={inactive}
          />
          <a
            className="orange-btn"
            onClick={() => {
              setInactive(!inactive);

              let body = {
                id: authCtx.admin ? props.id : localStorage.getItem("userId"),
                client: client.value,
                email: email.value,
                street: street.value,
                city: city.value,
                state: state.value,
                zip: zip.value,
                // let ID = authCtx.admin ? authCtx.clientId : authCtx.userId
                // let body = {
                //   id: ID,
                //   client: client.value,
                //   email: email.value,
                //   street: street.value,
                //   city: city.value,
                //   state: state.value,
                //   zip: zip.value,
              };

              // To comment back in when testing is ready to continue
              {
                !inactive &&
                  axios
                    .put("/api/editUser", body)
                    .then((res) => {
                      authCtx.admin ?
                          localStorage.setItem("adminState", res.data.state)
                        : localStorage.setItem("state", res.data.state);
                      // console.log("--res.data--", res.data);
                      // console.log("--localstorageAdmin--", localStorage.getItem("adminState"));
                      // console.log("--localstorage--", localStorage.getItem("state"));
                      // console.log("success");
                    })
                    .catch((err) => console.error(err));
              }

              // console.log("refered", refered);
              // console.log("admin", authCtx.admin);
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
