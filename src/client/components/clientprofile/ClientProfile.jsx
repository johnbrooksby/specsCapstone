import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import axios from "axios";

const ClientProfile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="clientprofilepage">
      <p>Client Profile for {authCtx.client}</p>
      <a onClick={() => {
        axios
        .delete('/deleteUser/' + authCtx.clientId)
        .then(res => {
            <NavLink to="/admin" />
        })
        .catch(err => {
            console.error(err)
        })
      }}>Delete User</a>
    </div>
  );
};

export default ClientProfile;
