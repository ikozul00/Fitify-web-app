import { useRouter } from "next/router";
import { FaRunning } from "react-icons/fa";

const ErrorPage = () => {
    const router = useRouter();
    return(
        <>
        <div className="flex items-center justify-between md:w-8/12 sm:w-10/12 w-11/12 mx-auto sm:my-40 my-32">
            <FaRunning className=" sm:text-9xl text-7xl"/>
            <div className="text-center">
            <p className=" sm:text-3xl text-xl font-bold">Page is still under construction.</p>
            <button className="sm:text-xl text-lg uppercase bg-fitify-purple text-white font-bold md:px-8 sm:px-6 px-4 md:py-4 sm:py-2 py-1 sm:mt-16 mt-4 hover:cursor-pointer hover:opacity-75" onClick={() =>router.back() }>go back</button>
            </div>
            <FaRunning className=" sm:text-9xl text-7xl"/>
        </div>
        
        </>
    )
}

export default ErrorPage;