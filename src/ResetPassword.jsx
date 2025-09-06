import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validatePassword } from "./myUtil";
import BackendAxios from "./BackendAxios";

export default function ResetPassword({usrname}){
    const [passwords, setPasswords] = useState({});
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [passwordsInvalid, setPasswordsInvalid] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();
 
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setPasswords((prev)=>({...prev, [name]:value}));
    }

    const resetPassword = async()=>{
        try{
            const res = await BackendAxios.put("/SecurityQuestion/ValidateSecurityAnswer/ResetPassword",
                {
                    username: usrname,
                    password: passwords.pwdOne
                },
                {
                    withCredentials: true
                }
            );
            if(res.data === "SUCCESS"){
                setUserNotFound(false);
                navigate("/Logout");
            }else{
                setUserNotFound(true);
            }
        }catch(err){
            console.log("Error: ", err);
        }
    };

    function handleSubmit(event){
        event.preventDefault();
        if(validatePassword(passwords.pwdOne) && validatePassword(passwords.pwdTwo)){
            setPasswordsInvalid(false);
            if(passwords.pwdOne !== passwords.pwdTwo){
                setPasswordsDontMatch(true);
            }else{
                setPasswordsDontMatch(false);
                resetPassword();                
            }
        }else{
            setPasswordsInvalid(true);
        }
    }

    return (
        <form className="d-flex flex-column shadow p-5 rounded border border-1 w-50 mx-auto mt-5" onSubmit={handleSubmit}>
            <label className="form-label">
                Enter new password:
                <input type="password" className="form-control" name="pwdOne" value={passwords.pwdOne || ""} onChange={handleChange} pattern="^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*" title="Must start with a letter (either lowercase or uppercase)., If it starts lowercase → must contain an uppercase somewhere.,If it starts uppercase → must contain a lowercase somewhere.,Must contain at least one special character.,Must contain at least one digit.,Must not contain spaces." required></input>
            </label>
            <label className="form-label">
                Confirm password:
                <input type="password" className="form-control" name="pwdTwo" value={passwords.pwdTwo || ""} onChange={handleChange} pattern="^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*" title="Must start with a letter (either lowercase or uppercase)., If it starts lowercase → must contain an uppercase somewhere.,If it starts uppercase → must contain a lowercase somewhere.,Must contain at least one special character.,Must contain at least one digit.,Must not contain spaces." required></input>
            </label>
            {passwordsDontMatch && <span className="text-danger">Passwords do not match!!!</span>}
            {passwordsInvalid && <span className="text-danger">Password invalid.</span>}
            {userNotFound && <span className="text-danger">User not found!!! contact support.</span>}
            <input className="btn btn-primary" type="submit" value="set new password"></input>
        </form>
    );
}