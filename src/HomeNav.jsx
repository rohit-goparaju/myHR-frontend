import { Link, NavLink } from "react-router-dom";
import logo from './assets/anger-symbol-svgrepo-com.svg';
import styles from './HomeNav.module.css';
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useUserContext } from "./App";

export default function HomeNav(){
    const {userValidityWrapper} = useUserContext();
    
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
                {
                userValidityWrapper.validity === "VALID" && 
                <>               
                    <li className="nav-item">
                        <NavLink to="/Dashboard" className="nav-link">Dashboard</NavLink>
                    </li>

                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{userValidityWrapper.user.username}</a>
                        <ul id="userSettingsDropdownList" className="dropdown-menu position-absolute">
                            <li>
                                <NavLink to="/Logout" className="dropdown-item">Logout</NavLink>
                            </li>
                        </ul>
                    </li>
                </>
                }
            </ul>
        </nav>
    );
}