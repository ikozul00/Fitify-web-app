import CheckData from "@/components/buy/checkData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "pages/login";
import { useEffect, useState } from "react";

const Buy = () => {
    const [step, setStep] = useState(1);
    const[error, setError] = useState();
    const { data:session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!session){
            setError("You need to be log in to be able to access this page!");
        }
        else{
            setError("");
        }
    })



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
                <button onClick = {()=>setStep(1)} className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=1 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>1</span>
                </button>
                <p>Check user data</p>
            </div>
            <div className="flex flex-col items-center bg-white w-40">
                <div className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=2 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>2</span>
                </div>
                <p>Payment method</p>
            </div>
            <div className="flex flex-col items-center bg-white w-40">
                <div className={`border-2 rounded-full w-12 h-12 flex text-xl items-center justify-center border-black ${step>=3 ? "bg-fitify-green" : "bg-white"}`}>
                    <span>3</span>
                </div>
                <p>Success</p>
            </div>
        </div>
        {(step==1) && <CheckData changeStep={setStep}/>}
        </div>
        }
        </>
    );

}

export default Buy;