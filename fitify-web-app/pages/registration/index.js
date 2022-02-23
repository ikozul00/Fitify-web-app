import Link from "next/link";
import { useState } from "react";
import { Country, State, City }  from 'country-state-city';
console.log(Country.getAllCountries())
console.log(State.getAllStates())

const Registration = () => {

    const countries = Country.getAllCountries();

    const [cities, setCities] = useState("");
    const [page, setPage] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [rPass, setRPass] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [validate1, setValidate1] = useState("");

    

    function handleChange(e){
        let field = e.target.name;
        let value = e.target.value;
        switch(field){
            case "username":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPass(value);
                break;
            case "password2":
                setRPass(value);
                break;
            case "name":
                setFirstName(value);
                break;
            case "surname":
                setLastName(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "address":
                setAddress(value);
                break;
            default:
                console.log("Error in switch-case.");
                break;
        }
    }

    function validateFirst(){
        if(!name || !email || !pass || !rPass){
            setValidate1("Please fill out all the fields.");
            return false;
        }
        if(pass!=rPass){
            setValidate1("Passwords are not same.");
            return false;
        }
        setValidate1("");
        return true;
    }

    function changePage(e,value){
        e.preventDefault();
        if(value==2){
            if(validateFirst()){
                setPage(2);
            }
        }
    }

    function countryChanged(e){
        setCountry(e.target.value);
        let targetCountry = countries.find((c) => c.name===e.target.value);
        setCities(City.getCitiesOfCountry(targetCountry.isoCode));
    }

    return(
        <>
        <div className=" font-open-sans text-center">
            <div className="w-4/6 mx-auto mt-10 border-2 border-black flex-col text-center ">
                <h1 className=" md:text-3xl text-2xl font-semibold pt-10 pb-10 underline underline-offset-2">SIGN UP</h1>
                <form  className="sm:text-base text-sm">
                    {(page===1) && 
                        <div className="sm:grid grid-cols-3 flex flex-col items-center  sm:text-right text-left">
                        <label htmlFor="username" className=" pr-3.2 sm:w-full w-11/12 mx-auto ">*Username:</label>
                        <input type="text" id="username" name="username" value={name} onChange={(e) => handleChange(e)} className={` border-2  h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  ${(!name && validate1) ? "border-fitify-pink" : "border-fitify-purple"} form-field sm:col-span-2 col-span-3 `}></input>
                        <label htmlFor="email" className="pr-3.2 sm:w-full w-11/12 mx-auto mt-5">*Email:</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => handleChange(e)} className={`sm:mt-5 border-2  ${(!email && validate1) ? "border-fitify-pink" : "border-fitify-purple"} h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3`}></input>
                        <label htmlFor="password" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">*Password:</label>
                        <input type="password" id="password" name="password" value={pass} onChange={(e) => handleChange(e)} className={`sm:mt-5 border-2  ${(!pass && validate1) ? "border-fitify-pink" : "border-fitify-purple"} h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 `}></input>
                        <label htmlFor="password2" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">*Repeat password:</label>
                        <input type="password" id="password2" name="password2" value={rPass} onChange={(e) => handleChange(e)} className={`sm:mt-5 border-2  ${(!rPass && validate1) ? "border-fitify-pink" : "border-fitify-purple"} h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3`}></input>
                        <p className="font-bold text-center col-span-3 w-11/12 mt-5">{validate1}</p>
                        <button type="submit" className="bg-fitify-purple sm:px-10 px-0 py-2 font-bold uppercase hover:opacity-80 text-white border-none my-11 col-start-3  sm:w-36 w-24" onClick={(e) => changePage(e,2)}>Next</button>
                        </div>
                    }
                    {(page===2) &&
                        <div className="sm:grid grid-cols-3 flex flex-col items-center  sm:text-right text-left">
                        <label htmlFor="name" className=" pr-3.2 sm:w-full w-11/12 mx-auto">First name:</label>
                        <input type="text" id="name" name="name" value={firstName} onChange={(e) => handleChange(e)} className="  border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="surname" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Last name:</label>
                        <input type="text" id="surname" name="surname" value = {lastName} onChange={(e) => handleChange(e)} className=" sm:mt-5 mt-0 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="phone" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Phone number:</label>
                        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => handleChange(e)} className=" sm:mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="address" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Address:</label>
                        <input type="text" id="address" name="address" value={address} onChange={(e) => handleChange(e)} className="sm:mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="country" id="country" className="mr-3 sm:text-xl text-lg">Country:</label>
                        <select name="country" id="country-value" className="sm:w-20 w-16 text-center border-2 border-gray-500" value={country} onChange={(e) => countryChanged(e)}>
                            {countries.map((i) => (
                                <option key={i.name} value={`${i.name}`}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        {country && <div>
                        <label htmlFor="city" id="city" className="mr-3 sm:text-xl text-lg">City:</label>
                        <select name="city" id="city-value" className="sm:w-20 w-16 text-center border-2 border-gray-500" value={city} onChange={(e) => setCity(e.target.value)}>
                            {cities.map((i) => (
                                <option key={i.name} value={`${i.name}`}>
                                    {i.name}
                                </option>
                            ))}
                        </select>
                        </div>
                        }
                        <div className="col-span-3 flex sm:justify-around justify-between sm:w-full w-11/12">
                        <button type="submit" className="bg-fitify-purple font-bold uppercase hover:opacity-80 text-white border-none my-11 col-start-2  sm:w-36 w-24 md:ml-10 sm:ml-6 ml-0" onClick={() => setPage(1)}>Back</button>
                        <Link href="/errorPage" passHref>
                            <button type="submit" className="bg-fitify-pink font-bold uppercase py-2 hover:opacity-80 text-white border-none my-11 col-start-3 sm:w-36 w-24 md:mr-16 sm:mr-12 mr-0">Sign Up</button>
                        </Link>
                        </div>
                        
                        </div>
                    }
                </form>
            </div>
            <p className=" sm:text-lg text-base mt-4 mb-10">Already have an account? 
                <Link href="/login" key="login" passHref>
                <a className=" text-fitify-purple font-bold pl-2 hover:text-xl">Sign in.</a>
                </Link>
            </p>
        </div>
        </>
    );
}

export default Registration;