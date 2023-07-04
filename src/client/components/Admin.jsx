import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Unauthorized from "./Unauthorized";
import Billing from "./Billing";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [billingPage, setBillingPage] = useState(false);
  const [client, setClient] = useState([]);
  const [back, setBack] = useState(false);
  const [bills, setBills] = useState([]);
  const [userid, setUserid] = useState(undefined)

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // console.log(authCtx.admin)
    authCtx.setAdmin(localStorage.getItem("admin"));
    axios
      .get("/admin")
      .then((res) => {
        if (authCtx.admin) {
          setBillingPage(false);
          // authCtx.setAdmin(true);
          // console.log(res.data);
          setUsers(res.data);
        } else {
          <Unauthorized />
        }
      })
      .catch((err) => {
        console.error(err);
        {
          <Unauthorized />;
        }
      });
    {
      !authCtx.admin && <Unauthorized />;
    }
  }, [back]);
  // console.log("users:", users);
  const mappedUsers = users.map((user) => {
    // console.log("-------User-------",user)
    return (
      <div key={user.id} className="userCard">
        <h3>{user.name}</h3>
        <p>Email: {user.email_address}</p>
        <p>
          Address: {user.street_address} {user.city}, {user.state} {user.zip}
        </p>
        <a
          className="blue-btn"
          onClick={() => {
            setUserid(user.id)
            // setBillingPage(true)
            // console.log("-------User.id--------", user.id);
            let body = { id: user.id };
            axios
              .post("/billing", body)
              .then((res) => {
                // console.log('---res.data---', res.data);
                setBillingPage(true);
                authCtx.setClient(res.data[0].name);
                authCtx.setBills(res.data[0].billinginfos);
                // console.log(client, bills)
              })
              .catch((err) => console.error(err));
          }}
        >
          See Billing Info
        </a>
      </div>
    );
  });
  // console.log('userid', userid)
  // console.log("client", client);
  // console.log(billingPage);
  return !billingPage ? (
    <div className="adminPage">{mappedUsers}</div>
  ) : (
    <Billing
      // client={client}
      // setClient={setClient}
      back={back}
      setBack={setBack}
      // bills={bills}
      // setBills={setBills}
      admin={authCtx.admin}
      userid={userid}
    />
  );
};

export default Admin;
