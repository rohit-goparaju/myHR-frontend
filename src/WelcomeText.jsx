import styles from './WelcomeText.module.css'

export default function WelcomeText(){
    return (
        <div className={`${styles.welcomeText}`}>
            <div className={`${styles.line1}`}>
                Welcome
            </div>
            <div className={`${styles.line2}`}>
                To
            </div>
            <div className={`${styles.line3}`}>
                <span className='text-bg-danger p-1'>myHR</span> portal.
            </div>
        </div>
    );
}