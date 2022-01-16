import { useRouter } from "next/router";

const Profile = () => {
    const router=useRouter();

    function LogOut(event){
        event.preventDefault();
        localStorage.removeItem("user");
        router.push("/");
    }

    return(
        <>
        <p>Profile</p>
        <button onClick={(e) => LogOut(e)} className="bg-red-700">Log Out</button>
        </>
    );
}

export default Profile;