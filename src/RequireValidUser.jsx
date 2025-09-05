import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App"
import { useEffect } from "react";

export default function RequireValidUser({children}){
    const {userValidity} = useUserContext();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userValidity){
            navigate("/Logout", {replace: true});
        }
    },[userValidity, navigate])

    if(userValidity){
        return children;
    }else{
        return null;
    }
}