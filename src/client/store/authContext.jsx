import { useState, createContext } from "react";
import axios from "axios";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
  userId: null,
  admin: false,
  setAdmin: () => {},
  client: null,
  setClient: () => {},
  clientId: null,
  setClientId: () => {},
  bills: null,
  setBills: () => {},
  email: "",
  setEmail: () => {},
  street: "",
  setStreet: () => {},
  city: "",
  setCity: () => {},
  state: "",
  setState: () => {},
  zip: "",
  setZip: () => {},
  // refered: false,
  // setRefered: () => {},
});

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime();
  const expTime = exp;
  const remainingTime = expTime - currentTime;
  return remainingTime;
};

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storeId = +localStorage.getItem("userId");
  let storedAdmin = localStorage.getItem("admin");
  storedAdmin === "true" ? storedAdmin = true : storedAdmin = false;
  const storedClient = localStorage.getItem("client");
  const storedClientId = +localStorage.getItem("clientId");
  const storedBills = localStorage.getItem("bills");
  const storedEmail = localStorage.getItem("email");
  const storedStreet = localStorage.getItem("street");
  const storedCity = localStorage.getItem("city");
  const storedState = localStorage.getItem("state");
  const storedZip = +localStorage.getItem("zip");
  const remainingTime = calculateRemainingTime(storedExp);

  if (remainingTime <= 60 * 60 * 24 * 14) {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: +storeId,
    admin: storedAdmin,
    client: storedClient,
    clientId: storedClientId,
    bills: storedBills,
    email: storedEmail,
    street: storedStreet,
    city: storedCity,
    state: storedState,
    zip: storedZip,
  };
};

export const AuthContextProvider = (props) => {
  const localData = getLocalData();

  let initialToken;
  let initialId;
  let initialAdmin;
  if (localData) {
    initialToken = localData.token;
    initialId = localData.userId;
  } else if (localData && admin){
    initialToken = localData.token;
    initialId = localData.userId;
    initialAdmin = true;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialId);
  const [admin, setAdmin] = useState(initialAdmin);
  const [client, setClient] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [bills, setBills] = useState(null);
  const [email, setEmail] = useState(null)
  const [street, setStreet] = useState(null)
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [zip, setZip] = useState(null)
  // const [refered, setRefered] = useState(null)

  
  const login = (token, exp, userId, admin) => {
    setToken(token);
    setUserId(userId);
    setAdmin(admin)
    localStorage.setItem("token", token);
    localStorage.setItem("exp", exp);
    localStorage.setItem("userId", userId);
    localStorage.setItem("admin", admin);
    localStorage.setItem("client", client);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("bills", bills);
    localStorage.setItem("email", email);
    localStorage.setItem("street", street);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
    localStorage.setItem("zip", zip);
    // localStorage.setItem("refered", refered);
    
    const remainingTime = calculateRemainingTime(exp);
    
    logoutTimer = setTimeout(logout, remainingTime);
  };
  
  const logout = (logoutTimer) => {
    setToken(null);
    setUserId(null);
    setAdmin(false);
    setClient(null);
    setClientId(null);
    setBills(null);
    setEmail(null);
    setStreet(null);
    setCity(null);
    setState(null);
    setZip(null);
    // setRefered(null);
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("userId");
    window.localStorage.removeItem("admin");
    localStorage.removeItem("client");
    localStorage.removeItem("clientId");
    localStorage.removeItem("bills");
    localStorage.removeItem("email");
    localStorage.removeItem("street");
    localStorage.removeItem("city");
    localStorage.removeItem("state");
    localStorage.removeItem("zip");
    // localStorage.removeItem("refered");
    clearTimeout(logoutTimer);
    axios.put("/api/logout");
  };
  
  const contextValue = {
    token,
    login,
    logout,
    userId,
    admin,
    setAdmin,
    client,
    setClient,
    clientId,
    setClientId,
    bills,
    setBills,
    email,
    setEmail,
    street,
    setStreet,
    city,
    setCity,
    state,
    setState,
    zip,
    setZip,
    // refered,
    // setRefered,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
