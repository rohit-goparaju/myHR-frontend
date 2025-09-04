import { Outlet } from "react-router-dom";
import HomeNav from "./HomeNav";
import MyFooter from "./MyFooter";

export default function Home(){
    return(
        <>
        <HomeNav></HomeNav>
        <Outlet></Outlet>
        <div style={{height: "5vh"}}></div>
        <MyFooter></MyFooter>
        </>
    );
}