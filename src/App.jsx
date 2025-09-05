import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import About from './About';
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import RequireValidUser from "./RequireValidUser";

const userContext = createContext();

export function useUserContext(){
  return useContext(userContext);
}

export default function App(){
  const [userValidity, setUserValidity] = useState(false);

  useEffect(
    ()=>{
      setUserValidity(localStorage.getItem("userValidity")==="valid");
    }
    ,[]
  );

  return (
    <>
    <userContext.Provider value={{userValidity, setUserValidity}}>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="About" element={<About></About>}></Route>
          <Route path="Dashboard" element={<RequireValidUser><Dashboard></Dashboard></RequireValidUser>}></Route>
          <Route path="Logout" element={<Logout></Logout>}></Route>
        </Route>
      </Routes>
    </userContext.Provider>
    </>
  );
}

