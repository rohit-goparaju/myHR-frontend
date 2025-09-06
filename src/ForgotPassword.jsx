import { useState } from "react";
import { validateUsername } from "./myUtil";
import SecurityQuestion from "./SecurityQuestion";
import BackendAxios from "./BackendAxios";

export default function ForgotPassword(){
    const [usrname, setUsrname] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [usrnameValidity, setUsrnameValidity] = useState("");

    const getSecurityQuestion =  async () => {
            try{
                const res =  await BackendAxios.post("/SecurityQuestion",
                    {
                        username: usrname
                    },
                    {
                        withCredentials : true
                    }
                );
                setSecurityQuestion(res.data);
            }catch(err){
                console.error("Error: ", err);
            }
        }

    function handleChange(event){
        setUsrname(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(validateUsername(usrname)){
            setUsrnameValidity("VALID");
            getSecurityQuestion();
        }
        else{
            setUsrnameValidity("INVALID");
        }
    }

    if(securityQuestion !== "" && securityQuestion!=="doesnotexist"){
        return (
            <SecurityQuestion question={securityQuestion} usrname={usrname}></SecurityQuestion>
        );
    }else{
        return (
            <form className="d-flex flex-column shadow p-5 rounded border border-1 w-50 mx-auto mt-5" onSubmit={handleSubmit}>
                <label className="form-label">
                    Enter username: 
                    <input className="form-control" type="text" pattern="[a-z][a-z0-9\.]*@myHR\.in" name="usrname" value={usrname || ""} onChange={handleChange} title="must not contain spaces, must start with a lower case alphabet, can contain only lower case alphabets dots and numbers, must end with domain @myHR.in " required></input>
                </label>
                <input className="btn btn-primary" type="submit" value="reset password"></input>
                {
                    securityQuestion === "doesnotexist" && <span className="text-danger">User does not exist.</span>
                }
                {
                    usrnameValidity === "INVALID" && <span className="text-danger">invalid username.</span>
                }
            </form>
        );
    }

}