const { useEffect, useState } = require("react");
import { useSession } from "next-auth/react";

const CheckData = ({changeStep, user, setUser}) => {
    const { data:session } = useSession();
    const [error, setError] = useState();

    

    function handleChange(e){
        let field = e.target.name;
        let value = e.target.value;
        switch(field){
            case "name":
                setUser({...user, firstName:value});
                break;
            case "surname":
                setUser({...user, lastName:value});
                break;
            case "phone":
                setUser({...user, phone:value});
                break;
            case "address":
                setUser({...user, address:value});
                break;
            case "city":
                setUser({...user, city:value});
                break;
            case "country":
                setUser({...user, country:value});
                break;
            default:
                console.log("Error in switch-case.");
                break;
        }
    }

    function changePage(e){
        e.preventDefault();
        changeStep(2);
    }


    return(
        <>
        {!error && <form className="w-6/12 mx-auto flex flex-col items-start my-10">
            <label htmlFor="name" className="w-full mx-auto">First name:</label>
            <input type="text" id="name" name="name" value={user?.firstName} onChange={(e) => handleChange(e)} className="  border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field "></input>
            <label htmlFor="surname" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Last name:</label>
            <input type="text" id="surname" name="surname" value = {user?.lastName} onChange={(e) => handleChange(e)} className=" border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field "></input>
            <label htmlFor="phone" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Phone number:</label>
            <input type="text" id="phone" name="phone" value={user?.phone} onChange={(e) => handleChange(e)} className="border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field"></input>
            <label htmlFor="address" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto ">Address:</label>
            <input type="text" id="address" name="address" value={user?.address} onChange={(e) => handleChange(e)} className="border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field"></input>
            <label htmlFor="country" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto ">Country:</label>
            <input type="text" id="country" name="country" value={user?.country} onChange={(e) => handleChange(e)} className="border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field"></input>
            <label htmlFor="city" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto ">City:</label>
            <input type="text" id="city" name="city" value={user?.city} onChange={(e) => handleChange(e)} className="border-2 border-fitify-purple h-9 w-full sm:mx-0 mx-auto  form-field"></input>
            <button type="submit" className="bg-fitify-purple sm:px-10 px-0 py-2 font-bold uppercase hover:opacity-80 text-white border-none my-11 sm:w-36 w-24 place-self-end" onClick={(e) => changePage(e)}>Next</button>
        </form>}
        {error && <p>{error}</p>}
        </>
    );
}

export default CheckData;