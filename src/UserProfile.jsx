import ChangePassword from "./ChangePassword";
import UserDetails from "./UserDetails";

export default function UserProfile(){
    return (
        <>
            <UserDetails></UserDetails>
            <ChangePassword></ChangePassword>
        </>
    );
}