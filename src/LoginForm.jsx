import { useState } from "react";
import styles from './LoginForm.module.css';
import { Link, useNavigate } from "react-router-dom";
import BackendAxios from './BackendAxios';
import { useUserContext } from "./App";

export default function LoginForm() {
    const [inputs, setInputs] = useState({});
    const { userValidity, setUserValidity } = useUserContext();
    // const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [userPwdIncorrect, setUserPwdIncorrect] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (inputs.pwd.match(/^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*/g) &&
            inputs.username.match(/[a-z][a-z0-9\.]*@myHR\.in/g)) {
            BackendAxios.post("/Login",
                {
                    username: inputs.username,
                    password: inputs.pwd
                },
                { withCredentials: true }
            ).then(
                (res) => {
                    localStorage.setItem("userValidity", res.data);
                    setUserValidity(res.data === "valid");
                    setUserPwdIncorrect(res.data);
                    if (res.data === "valid")
                        navigate("/Dashboard", { replace: true });
                }
            )
        } else {
            setUserPwdIncorrect("invalid");
        }
    }

    if (userValidity) {
        return null;
    }

    else
        return (
            <div className={styles.loginFormContainer}>
                <form onSubmit={handleSubmit} className="d-flex flex-column shadow p-5 rounded border border-1">
                    <label className="form-label">
                        Username:
                        <input type="text" name="username" value={inputs.username || ""} className="form-control" onChange={handleChange} placeholder="Enter Username" pattern="[a-z][a-z0-9\.]*@myHR\.in" title="must not contain spaces, must start with a lower case alphabet, can contain only lower case alphabets dots and numbers, must end with domain @myHR.in " required></input>
                    </label>
                    <label className="form-label">
                        Password:
                        <input type="password" name="pwd" value={inputs.pwd || ""} className="form-control" onChange={handleChange} placeholder="Enter Password" pattern="^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*" title="Must start with a letter (either lowercase or uppercase)., If it starts lowercase → must contain an uppercase somewhere.,If it starts uppercase → must contain a lowercase somewhere.,Must contain at least one special character.,Must contain at least one digit.,Must not contain spaces." required></input>
                    </label>
                    {userPwdIncorrect === "invalid" && <span className="text-danger">invalid username or password</span>}
                    <input type="submit" value="Login" className="btn btn-primary"></input>
                    <div className="text-end">
                        <Link to="/">Forgot password?</Link>
                    </div>
                </form>
            </div>
        );
}