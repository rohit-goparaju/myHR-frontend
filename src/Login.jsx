import WelcomeText from "./WelcomeText";
import styles from './Login.module.css';
import LoginForm from "./LoginForm";

export default function Login(){
    return (
        <div className={`${styles.loginContainerWrapper} d-flex flex-column justify-content-center align-items-stretch`} >
            <div className= {`${styles.loginContainer} row g-0`}>
                <div className= {`${styles.welcomeCol} col-lg-6 py-5`}>
                    <WelcomeText></WelcomeText>  
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">
                    <div className={styles.loginFormContainer}>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </div>
    );
}