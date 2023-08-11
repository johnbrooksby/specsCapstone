import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import axios from "axios";

const ClientProfile = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="clientprofilepage">
      <p>Client Profile for {authCtx.client}</p>
      <a          
        onClick={() =>  {
          axios
            .delete("/deleteUser/" + authCtx.clientId)
            .then(() => {})
            .catch((err) => {
              console.error(err);
            });
          setTimeout(() => navigate("/admin"), 200);
        }}
      >
        Delete User
      </a>
    </div>
  );
};

export default ClientProfile;
