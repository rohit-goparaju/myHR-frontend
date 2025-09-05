export default function Dashboard(){
    return (
        <h1>{localStorage.getItem("userValidity")} user</h1>
    );
}