import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/authContext";
import axios from "axios";
// import Unauthorized from "./Unauthorized";
import Billing from "./Billing";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [billingPage, setBillingPage] = useState(false);
  const [back, setBack] = useState(false);
  const [userid, setUserid] = useState(undefined);
  const [bills, setBills] = useState(undefined);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.setAdmin(localStorage.getItem("admin"));
    if (localStorage.getItem("admin")) {
      axios
        .get("/api/admin")
        .then(
          (res) => {
            setBillingPage(false);
            setUsers(res.data);
          }
        )
        .catch((err) => {
          console.error(err);
        });
    } 
  }, [back]);

  const mappedUsers = users.map((user) => {
    console.log(user)
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
            authCtx.setClientId(user.id);
            let body = { id: user.id };
            axios
            .post("/api/billing", body)
            .then((res) => {
              console.log(res.data[0])
                setBillingPage(true);
                authCtx.setClient(res.data[0].name);
                authCtx.setBills(res.data[0].billinginfos);
                setBills(res.data[0].billinginfos);
                authCtx.setEmail(res.data[0].email_address)
                authCtx.setStreet(res.data[0].street_address)
                authCtx.setCity(res.data[0].city)
                authCtx.setState(res.data[0].state)
                authCtx.setZip(res.data[0].zip)
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
      userid={userid}
      bills={bills}
      setBills={setBills}
    />
  );
};

export default Admin;