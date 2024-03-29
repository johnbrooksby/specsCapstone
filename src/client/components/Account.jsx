import React, { useContext, useEffect, useState } from "react";
import Billing from "./admin/Billing";
import AuthContext from "../store/authContext";
import axios from "axios";
import ClientProfile from "./admin/clientprofile/ClientProfile";
// import StripePayment from './Stripe'

const Account = () => {
  const authCtx = useContext(AuthContext);

  const [client, setClient] = useState("");
  const [bills, setBills] = useState([]);

  useEffect(() => {
    let body = { userId: authCtx.userId };

    axios
      .post("/api/account", body)
      .then((res) => {
        // console.log(res.data)
        setClient(res.data.name);
        setBills(res.data.billinginfos);
        localStorage.setItem("client", res.data.name);
        localStorage.setItem("email", res.data.email_address);
        localStorage.setItem("street", res.data.street_address);
        localStorage.setItem("city", res.data.city);
        localStorage.setItem("state", res.data.state);
        localStorage.setItem("zip", res.data.zip);
        localStorage.setItem("clientId", res.data.id);
        authCtx.setClient(res.data.name);
        authCtx.setEmail(res.data.email_address);
        authCtx.setStreet(res.data.street_address);
        authCtx.setCity(res.data.city);
        authCtx.setState(res.data.state);
        authCtx.setZip(res.data.zip);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authCtx.userId]);
  // console.log(authCtx.client, authCtx.userId, authCtx.email, authCtx.street, authCtx.city, authCtx.state, authCtx.zip)

  return <Billing client={client} bills={bills} user={"User"} />;
};

export default Account;
