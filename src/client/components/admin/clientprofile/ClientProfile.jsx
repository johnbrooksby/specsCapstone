import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import DeleteClientModal from "./DeleteClientModal";
import axios from "axios";

const ClientProfile = () => {
  const [modal, setModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="clientProfilePage">
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
        <h2 className="fourPar">Client Profile for {authCtx.client}</h2>
        <a
          className="orange-btn"
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
  );
};

export default ClientProfile;
