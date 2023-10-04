import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/authContext";
import axios from "axios";

const ClientProfile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="clientProfilePage">
      <h2 className="fourPar">Client Profile for {authCtx.client}</h2>
      <a
      className="orange-btn" 
        onClick={() =>  {
          axios
            .delete("/api/deleteUser/" + authCtx.clientId)
            .then(() => {})
            .catch((err) => {
              console.error(err);
            });
          setTimeout(() => navigate("/admin"), 300);
        }}
      >
        Delete User
      </a>
    </div>
  );
};

export default ClientProfile;
