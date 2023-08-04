import React, {useContext} from "react";
import AuthContext from "../../store/authContext";

const ClientProfile = () => {
  const authCtx = useContext(AuthContext);
  return <div className="clientprofilepage">ClientProfile for {authCtx.client}</div>;
};

export default ClientProfile;
