import { Link, NavLink } from "react-router-dom";
import logo from './assets/anger-symbol-svgrepo-com.svg';
import styles from './HomeNav.module.css';

export default function HomeNav(){
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                <img src={logo} alt="myHR logo" width="50px" height="50px"></img>
                <span className={styles.logoText}>myHR</span>
                <span className={`${styles.specialEliteText} navbar-text ms-2`}>
                    portal
                </span>
            </Link>
            <ul className="navbar-nav me-5 flex-row gap-5">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/About' className="nav-link">About</NavLink>
                </li>
            </ul>
        </nav>
    );
}