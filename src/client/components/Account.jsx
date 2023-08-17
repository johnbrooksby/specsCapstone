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
    let body = { userId: authCtx.userId };

    axios
      .post("/api/account", body)
      .then((res) => {
        setClient(res.data.name);
        setBills(res.data.billinginfos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [authCtx.userId]);
  
  return <Billing client={client} bills={bills} />;
};

export default Account;
