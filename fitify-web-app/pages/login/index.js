import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

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
                  alert("Wrong username or password");
              }
              else{
                  alert("All good");
              }
        }
        else{
            console.log("krivo");
        }
    }


    return(
        <>
        <div className=" w-screen">
            <div className="w-2/4 mx-auto my-10 border-2 border-black">
                <h1>LOGIN</h1>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required className=" border-2 border-black" value={username} onChange={(e)=>onChange(e)}></input>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required className=" border-2 border-black" value={password} onChange={(e)=>onChange(e)}></input>
                    <button type="submit" className="bg-fitify-green">Login</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;