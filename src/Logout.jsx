import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App";
import BackendAxios from "./BackendAxios";

export default function Logout(){
    const navigate = useNavigate();    
    const {setUserValidityWrapper} = useUserContext();
    useEffect(
        ()=>{
            BackendAxios.post("/Logout",{},{withCredentials: true}).then(
                (res)=>{
                    localStorage.clear();
                    setUserValidityWrapper({user: null, validity: "INVALID"});
                    navigate("/", {replace : true});
                }
            ).catch((err)=>console.error("Error: ", err))
        }
        ,[setUserValidityWrapper, navigate]
    );
    return null;
}