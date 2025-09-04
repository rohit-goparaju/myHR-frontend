import WelcomeText from "./WelcomeText";
import styles from './Login.module.css';

export default function Login(){
    return (
        <>
        <div className= {`${styles.loginContainer} row g-0`}>
            <div className= {`${styles.welcomeCol} col-lg-6 py-5`}>
                <WelcomeText></WelcomeText>  
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">
                <h1>Login page coming soon....</h1>
            </div>
        </div>
        </>
    );
}