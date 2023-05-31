import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([])
  const authCtx = useContext(AuthContext);

  useEffect(() => {

      axios
      .get("http://localhost:5556/admin")
      .then((res) => {
            if (authCtx.admin) {
            console.log(res.data);
            setUsers(res.data)
        } else {
            return
        }
        })
        .catch((err) => {
            console.error(err);
        });
}, [])
    
  return <div>{users.map((u) => {
    return (<div><h3>{u.username}</h3>
        <p>{u.id}</p></div>)
  })}</div>;
};

export default Admin;
