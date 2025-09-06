import AdminDashboard from "./AdminDashboard";
import { useUserContext } from "./App";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard";

export default function Dashboard(){
    const {userValidityWrapper} = useUserContext();
    return(
        <>
           {userValidityWrapper.user.level === "ADMIN" && <AdminDashboard></AdminDashboard>}
           {userValidityWrapper.user.level === "HR" && <HRDashboard></HRDashboard>}
           {userValidityWrapper.user.level === "EMPLOYEE" && <EmployeeDashboard></EmployeeDashboard>}
        </>
    );
}