import { useEffect, useState } from "react";
import BackendAxios from "./BackendAxios";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";

export default function SecurityQuestion({question, usrname}){
    const [answer, setAnswer] = useState("");
    const [answerValidity, setAnswerValidity] = useState("");
    const navigate = useNavigate();

    function handleChange(event){
        setAnswer(event.target.value);
    }

    const validateSecurityQuestion =  async () =>{
        try{
           const res = await BackendAxios.post("/SecurityQuestion/ValidateSecurityAnswer",
                {
                    username : usrname,
                    securityAnswer : answer
                }
            );
            setAnswerValidity(res.data);
        }catch(err){
            console.error("Error: ",err);
        }

    }

    function handleSubmit(event){
        event.preventDefault();
        validateSecurityQuestion();
    }

     if(answerValidity === "VALID"){
       return(
        <ResetPassword usrname={usrname}></ResetPassword>
       );
    }
    else{
        return (
            <div>
                <form onSubmit={handleSubmit} className="d-flex flex-column shadow p-5 rounded border border-1 w-50 mx-auto mt-5">
                    <label className="form-label">
                        {question}
                        <input className="form-control" name="answer" value={answer || ""} onChange={handleChange} type="text" required></input>
                    </label>
                    {answerValidity === "INVALID" && <span className="text-danger">Invalid answer!!!</span>}
                    <input className="btn btn-primary" type="submit"></input>
                </form>
            </div>
        );
    }
}