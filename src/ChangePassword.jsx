import { useState } from "react";
import { validatePassword } from "./myUtil";
import BackendAxios from "./BackendAxios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(){
    const [passwords, setPasswords] = useState({});
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const passwordPattern = "^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*";
    const navigate = useNavigate();

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setPasswords((prev)=>({...prev, [name] : value}));
    }

    function handleSubmit(event){
        event.preventDefault();
        if(validatePassword(passwords.oldPwd) && validatePassword(passwords.newPwd)){

            BackendAxios.put("/ChangePassword", 
                {
                    oldPassword : passwords.oldPwd,
                    newPassword : passwords.newPwd
                },
                {
                    withCredentials : true
                }
            )
            .then((res)=>{
                // console.log(res);
                if(res.data === "SUCCESS"){
                    navigate("/Logout", {replace: true});
                }else{
                    setIncorrectPassword(true);
                }
            })
            .catch((err)=>console.error("Error: ", err))
            

        }else{
            setIncorrectPassword(true);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="d-flex flex-column shadow p-5 rounded border border-1 w-50 mx-auto">
            <label className="form-label">
                Old password:
                <input className="form-control" type="password" name="oldPwd" value={passwords.oldPwd || ""} placeholder="Enter old password" onChange={handleChange} pattern="^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*" title="Must start with a letter (either lowercase or uppercase)., If it starts lowercase → must contain an uppercase somewhere.,If it starts uppercase → must contain a lowercase somewhere.,Must contain at least one special character.,Must contain at least one digit.,Must not contain spaces." required></input>
            </label>
            <label className="form-label">
                New password:
                <input className="form-control" type="password" name="newPwd" value={passwords.newPwd || ""} placeholder="Enter new password" onChange={handleChange} pattern="^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*" title="Must start with a letter (either lowercase or uppercase)., If it starts lowercase → must contain an uppercase somewhere.,If it starts uppercase → must contain a lowercase somewhere.,Must contain at least one special character.,Must contain at least one digit.,Must not contain spaces." required></input>
            </label>
            <input className="btn btn-primary" type="submit" value="change password"></input>
            {incorrectPassword && <span className="text-danger">invalid password</span>}
        </form>
    );
}