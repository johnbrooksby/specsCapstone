import React, { useContext, useEffect, useState } from "react";
import Billing from "./Billing";
import AuthContext from "../store/authContext";
import axios from "axios";
// import StripePayment from './Stripe'

const Account = () => {
  const authCtx = useContext(AuthContext);

  const [client, setClient] = useState('');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    // console.log(authCtx.admin)
    let body = { userId: authCtx.userId };
    // console.log("body", body);
    axios
      .post("/account", body)
      .then((res) => {
        setClient(res.data.name);
        setBills(res.data.billinginfos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authCtx.userId]);
  // console.log("users:", users);
  // console.log('bills', bills)
  // console.log("client", client);
  // console.log(billingPage);
  return <Billing client={client} bills={bills} />;
};

export default Account;
