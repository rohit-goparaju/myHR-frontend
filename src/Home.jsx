import { Outlet } from "react-router-dom";
import HomeNav from "./HomeNav";
import MyFooter from "./MyFooter";

export default function Home(){
    return(
        <>
        <HomeNav></HomeNav>
        <div className="flex-grow-1">
            <Outlet></Outlet>
        </div>
        <MyFooter></MyFooter>
        </>
    );
}