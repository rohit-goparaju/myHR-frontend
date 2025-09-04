import { useState } from "react";
import styles from './LoginForm.module.css';

export default function LoginForm(){
    const [inputs, setInputs] = useState({});

    function handleChange(event){
        const {name, value} = event.target;
        setInputs((prev)=>({...prev, [name]:value}));
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);
    }

    return(
        <div className={styles.loginFormContainer}>
        <form onSubmit={handleSubmit} className="d-flex flex-column shadow p-5 rounded border border-1">
            <label className="form-label">
                Username: 
                <input type="text" name="username" value={inputs.username || ""} className="form-control" onChange={handleChange}></input>
            </label>
            <label className="form-label">
                Password:
                <input type="password" name="pwd" value={inputs.pwd || ""} className="form-control" onChange={handleChange}></input>
            </label>
            <input type="submit" value="Login" className="btn btn-primary"></input>
        </form>
        </div>
    );
}