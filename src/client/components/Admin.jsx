import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import Unauthorized from "./Unauthorized";
import Billing from "./Billing";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [billingPage, setBillingPage] = useState(false);
  const [back, setBack] = useState(false);
  const [userid, setUserid] = useState(undefined);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.setAdmin(localStorage.getItem("admin"));
    axios
      .get("/admin")
      .then((res) => {
        if (authCtx.admin) {
          setBillingPage(false);
          setUsers(res.data);
        } else {
          <Unauthorized />;
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

  const mappedUsers = users.map((user) => {
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
            setUserid(user.id);
            let body = { id: user.id };
            axios
              .post("/billing", body)
              .then((res) => {
                setBillingPage(true);
                authCtx.setClient(res.data[0].name);
                authCtx.setBills(res.data[0].billinginfos);
              })
              .catch((err) => console.error(err));
          }}
        >
          See Billing Info
        </a>
      </div>
    );
  });

  return !billingPage ? (
    <div className="adminPage">{mappedUsers}</div>
  ) : (
    <Billing
      back={back}
      setBack={setBack}
      admin={authCtx.admin}
      userid={userid}
    />
  );
};

export default Admin;
