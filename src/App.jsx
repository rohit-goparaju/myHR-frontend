import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import About from './About';
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import RequireValidUser from "./RequireValidUser";
import UserDetails from "./UserDetails";
import UserProfile from "./UserProfile";
import SecurityQuestion from "./SecurityQuestion";
import ForgotPassword from "./ForgotPassword";

const userContext = createContext();

export function useUserContext(){
  return useContext(userContext);
}

export default function App(){
  const [userValidityWrapper, setUserValidityWrapper] = useState({user: null, validity: "INVALID"});

  useEffect(
    ()=>{
      // console.log("UserVlidityWrapper Init from App.jsx:  ",localStorage.getItem("userValidityWrapper"));
      if(localStorage.getItem("userValidityWrapper")){
        setUserValidityWrapper(JSON.parse(localStorage.getItem("userValidityWrapper")));
      }
    }
    ,[]
  );

  return (
    <>
    <userContext.Provider value={{userValidityWrapper, setUserValidityWrapper}}>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Login></Login>}></Route>
          <Route path="About" element={<About></About>}></Route>
          <Route path="Dashboard" element={<RequireValidUser><Dashboard></Dashboard></RequireValidUser>}></Route>
          <Route path="Logout" element={<Logout></Logout>}></Route>
          <Route path="Profile" element={<RequireValidUser><UserProfile></UserProfile></RequireValidUser>}></Route>
          <Route path="ForgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
        
          <Route path="*" element={<Navigate to="/Dashboard" replace></Navigate>}></Route>
        </Route>
      </Routes>
    </userContext.Provider>
    </>
  );
}

