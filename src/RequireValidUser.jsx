import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App"
import { useEffect } from "react";

export default function RequireValidUser({children}){
    const {userValidityWrapper} = useUserContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(userValidityWrapper.validity === "INVALID"){
            navigate("/Logout", {replace: true});
        }
    },[userValidityWrapper, navigate])

    if(userValidityWrapper.validity !== "INVALID"){
        return children;
    }else{
        return null;
    }
}