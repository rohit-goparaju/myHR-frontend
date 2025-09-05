import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App";

export default function Logout(){
    const navigate = useNavigate();    
    const {setUserValidity} = useUserContext();
    useEffect(
        ()=>{
            localStorage.clear();
            setUserValidity(false);
            navigate("/", {replace : true});
        }
        ,[]
    );
    return null;
}