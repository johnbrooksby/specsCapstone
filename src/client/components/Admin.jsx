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

  const mappedUsers = users.map(user => {
    return (
      <div key={user.id} className="userCard">
        <h3>{user.username}</h3>
        <p>User Id: {user.id}</p>
      </div>
    )
  })
    
  return <div>
    <form>
      <h3>Add Billing info</h3>
    </form>
      {mappedUsers}
  </div>;
};

export default Admin;
