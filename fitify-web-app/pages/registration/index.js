import Link from "next/link";
import { useState } from "react";

const Registration = () => {

    const [page, setPage] = useState(1);

    return(
        <>
        <div className=" font-open-sans text-center">
            <div className="w-2/4 mx-auto mt-10 border-2 border-black flex-col text-center ">
                <h1 className=" text-3xl font-semibold pt-10 pb-10 underline underline-offset-2">SIGN UP</h1>
                <form className="flex-col flex">
                    {(page===1) && 
                        <div>
                        <label htmlFor="name" className="pr-2">First name:</label>
                        <input type="text" id="name" name="name" className=" border-2 border-fitify-green w-3/6 h-9 form-field"></input>
                        <label htmlFor="surname" className=" pr-3.2">Last name:</label>
                        <input type="text" id="surname" name="surname" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="username" className=" pr-3.2">Username:</label>
                        <input type="text" id="username" name="username" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="password" className=" pr-3.2">Password:</label>
                        <input type="password" id="password" name="password" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="password2" className=" pr-3.2">Repeat password:</label>
                        <input type="password" id="password2" name="password2" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <button type="submit" className="bg-fitify-purple px-10 py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11" onClick={() => setPage(2)}>Next</button>
                        </div>
                    }
                    {(page===2) &&
                        <div>
                        <label htmlFor="email" className="pr-2">Email:</label>
                        <input type="text" id="email" name="email" className=" border-2 border-fitify-green w-3/6 h-9 form-field"></input>
                        <label htmlFor="phone" className=" pr-3.2">Phone number:</label>
                        <input type="text" id="phone" name="phone" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="address" className=" pr-3.2">Address:</label>
                        <input type="text" id="address" name="address" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="city" className=" pr-3.2">City:</label>
                        <input type="text" id="city" name="city" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <label htmlFor="country" className=" pr-3.2">Country:</label>
                        <input type="text" id="country" name="country" className=" border-2 border-fitify-green w-3/6 h-9 form-field "></input>
                        <button type="submit" className="bg-fitify-purple px-10 py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11" onClick={() => setPage(1)}>Back</button>
                        <button type="submit" className="bg-fitify-purple px-10 py-2 font-medium uppercase hover:opacity-80 text-white border-none my-11">Sign Up</button>
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