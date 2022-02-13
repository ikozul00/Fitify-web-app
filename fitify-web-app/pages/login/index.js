import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const router = useRouter();

    function onChange(event){
        event.preventDefault();
        let name=event.target.name;
        if(name==="username"){
            setUsername(event.target.value);
        }

        else if(name==="password"){
            setPassword(event.target.value);
        } 
    }

    async function handleSubmit(event){
        event.preventDefault();
        if(!(password.length===0) && !(username.length===0)){
            const res = await fetch('/api/login', {
                body: JSON.stringify({
                  name: username,
                  password:password
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              });
              const responseData=await res.json();
              if(responseData.data.length===0){
                  setErrorMessage("Wrong username or password!");
              }
              else{
                localStorage.setItem('user', username);
                router.push(`/profile/${username}`);
              }
        }
        else{
            setErrorMessage("You must enter both username and password!");
        }
    }


    return(
        <>
        <div className=" font-open-sans text-center">
            <div className="md:w-3/6 w-4/6 mx-auto mt-10 border-2 border-black flex flex-col text-center ">
                <h1 className=" md:text-3xl sm:text-xl text-lg font-semibold pt-10 pb-10 underline underline-offset-2">LOGIN</h1>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex-col sm:text-base text-sm">
                    <div className="sm:w-5/6 w-full mx-auto mb-7 sm:block flex flex-col px-10">
                    <label for="username" className="pr-2 sm:text-center text-left">Username:</label>
                    <input type="text" id="username" name="username" required className=" border-2 border-fitify-purple sm:w-7/12 w-full h-9 form-field" value={username}  onChange={(e)=>onChange(e)}></input>
                    </div>
                    <div className="sm:w-5/6 w-full mx-auto mb-7 sm:block flex flex-col px-10">
                    <label for="password" className=" pr-3.2 sm:text-center text-left">Password:</label>
                    <input type="password" id="password" name="password" required className=" border-2 border-fitify-purple sm:w-7/12 w-full h-9 form-field " value={password} onChange={(e)=>onChange(e)}></input>
                    </div>
                    <p className="text-center mt-5 ml-6 font-bold">{errorMessage}</p>
                    <div className="sm:w-3/4 w-full flex sm:justify-end justify-center">
                    <button type="submit" className="bg-fitify-purple px-10 py-2 font-medium uppercase hover:opacity-80 text-white border-none mt-5 mb-10">Login</button>
                    </div>
                </form>
            </div>
            <p className=" sm:text-lg text-base mt-4 mb-10">Don’t have an account? 
                <Link href="/registration" key="registration" passHref>
                <a className=" text-fitify-purple font-bold pl-2 hover:text-xl">Sign up.</a>
                </Link>
            </p>
        </div>
        </>
    );
}

export default Login;