import { useUserContext } from "./App";

export default function UserDetails(){
    const {userValidityWrapper} = useUserContext();
    const {user} = userValidityWrapper;

    return (
        <div className="rounded text-bg-danger shadow m-5 p-5">
            <div className="fs-1"><b>Welcome {user.username}</b> </div>
            <div className="fs-4"><b>Access level:</b> {user.level}</div>
        </div>       
    );
}