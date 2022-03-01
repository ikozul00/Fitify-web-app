import CheckData from "@/components/buy/checkData";
import Payment from "@/components/buy/payment";
import Success from "@/components/buy/success";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Buy = () => {
    const [step, setStep] = useState(1);
    const[error, setError] = useState();
    const [user, setUser] = useState({firstName:"", lastName:"", phone:"", address:"", city:"", country:""});
    const { data:session } = useSession();
    const [ordered, setOrdered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(!session){
            setError("You need to be log in to be able to access this page!");
        }
        else{
            setError("");
        }
    });

    useEffect(async ()=>{
        if(session){
            const res = await fetch("/api/user", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(session.user)
            });
            if(res.status===200){
                const userData = await res.json();
                console.log(userData.data);
                setUser(userData.data);
            }
            else{
                setError("Error retriving data please try later.");
            }
        }
    },[]);

    function changeStep(value){
        if(!(step===3 && ordered) && value<step){
            setStep(value);
        }
    }


    return(
        <>
        {error && 
        <div>
            <p>{error}</p>
            <button onClick={()=>router.push("/login")}>Login</button>
        </div>}
        {!error &&
        <div>
        <div className="flex justify-between w-9/12 mx-auto relative my-10">
            <hr className="border-2 border-gray-700 absolute top-5 w-full bg-gray-700 -z-20"/>
            <div className="flex flex-col items-center bg-white w-40">
                <button onClick = {()=>changeStep(1)} className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=1 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>1</span>
                </button>
                <p>Check user data</p>
            </div>
            <div className="flex flex-col items-center bg-white w-40">
                <button onClick = {()=>changeStep(2)} className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=2 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>2</span>
                </button>
                <p>Payment method</p>
            </div>
            <div className="flex flex-col items-center bg-white w-40">
                <button onClick = {()=>changeStep(3)} className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=3 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>3</span>
                </button>
                <p>Success</p>
            </div>
        </div>
        {(step==1) && <CheckData changeStep={setStep} user={user} setUser={setUser}/>}
        {(step==2) && <Payment changeStep={setStep} user={user} setUser={setUser}/>}
        {(step==3) && <Success user={user} ordered={ordered} setOrdered={setOrdered}/>}
        </div>
        }
        </>
    );

}

export default Buy;