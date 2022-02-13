import Link from "next/link";
import { useState } from "react";

const Registration = () => {

    const [page, setPage] = useState(1);

    return(
        <>
        <div className=" font-open-sans text-center">
            <div className="w-4/6 mx-auto mt-10 border-2 border-black flex-col text-center ">
                <h1 className=" text-3xl font-semibold pt-10 pb-10 underline underline-offset-2">SIGN UP</h1>
                <form >
                    {(page===1) && 
                        <div className="sm:grid grid-cols-3 flex flex-col items-center  sm:text-right text-left">
                        <label htmlFor="name" className=" pr-3.2 sm:w-full w-11/12 mx-auto">First name:</label>
                        <input type="text" id="name" name="name" className="  border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="surname" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Last name:</label>
                        <input type="text" id="surname" name="surname" className=" mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="username" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Username:</label>
                        <input type="text" id="username" name="username" className="mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="password" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Password:</label>
                        <input type="password" id="password" name="password" className="mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3 "></input>
                        <label htmlFor="password2" className=" pr-3.2 sm:w-full w-11/12 mx-auto mt-5">Repeat password:</label>
                        <input type="password" id="password2" name="password2" className="mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <button type="submit" className="bg-fitify-purple sm:px-10 px-0 py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11 col-start-3  sm:w-36 w-24" onClick={() => setPage(2)}>Next</button>
                        </div>
                    }
                    {(page===2) &&
                        <div className="sm:grid grid-cols-3 flex flex-col items-center  sm:text-right text-left">
                        <label htmlFor="email" className="pr-3.2 sm:w-full w-11/12 mx-auto">Email:</label>
                        <input type="text" id="email" name="email" className=" border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="phone" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Phone number:</label>
                        <input type="text" id="phone" name="phone" className=" mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="address" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Address:</label>
                        <input type="text" id="address" name="address" className=" mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="city" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">City:</label>
                        <input type="text" id="city" name="city" className=" mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <label htmlFor="country" className=" pr-3.2 mt-5 sm:w-full w-11/12 mx-auto">Country:</label>
                        <input type="text" id="country" name="country" className=" mt-5 border-2 border-fitify-purple h-9 sm:w-4/6 w-11/12 sm:mx-0 mx-auto  form-field sm:col-span-2 col-span-3"></input>
                        <div className="col-span-3 flex justify-around w-full">
                        <button type="submit" className="bg-fitify-purple py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11 col-start-2 sm:w-36 w-24" onClick={() => setPage(1)}>Back</button>
                        <Link href="/errorPage" passHref>
                            <button type="submit" className="bg-fitify-purple py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11 col-start-sm:w-36 w-24">Sign Up</button>
                        </Link>
                        </div>
                        
                        </div>
                    }
                </form>
            </div>
            <p className=" text-lg mt-4 mb-10">Already have an account? 
                <Link href="/login" key="login" passHref>
                <a className=" text-fitify-purple font-bold pl-2 hover:text-xl">Sign in.</a>
                </Link>
            </p>
        </div>
        </>
    );
}

export default Registration;