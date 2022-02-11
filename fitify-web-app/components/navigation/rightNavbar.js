import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const RightNavbar = ({counter}) => {
    const router = useRouter();
    const [user, setUser] = useState();

    if (typeof window !== 'undefined'){
        useEffect(() => {
            setUser(localStorage.getItem("user"));
        },localStorage.getItem("user"));
    }

    function LogOut(event){
        event.preventDefault();
        console.log("evo");
        localStorage.removeItem("user");
        router.push("/");
    }

    return(
        <>
        <nav className=" bg-fitify-black  md:text-2xl text-xl md:flex hidden text-white h-20 items-center">
            <div className="relative dropdown md:px-5 px-2">
                <button>
                    <i className={`fas fa-user`}></i>
                </button>
                <div className="hidden dropdown-content absolute bg-fitify-black right-0 w-32 text-lg text-center z-10 shadow-2xl">
                    <Link href={user  ? `/profile/${user}` : "/login"} key="dropdown1" passHref>
                        <a className="px-10 py-4 whitespace-nowrap hover:bg-fitify-green">{user ? user : "Login"}</a>
                    </Link>
                    <Link href={user  ? `/home` : "/registration"} key="dropdown2" passHref>
                        <a className="px-10 py-4 whitespace-nowrap hover:bg-fitify-green" onClick={user ? (e) => LogOut(e) : () => {}}>{user ? "Log Out" : "Sign Up"}</a>
                    </Link>
                </div>
            </div>
            {/* <Link href={user  ? `/profile/${user}` : "/login"} key="login" passHref>
                <a className=" px-4">
                    <div className="text-center hover:opacity-60">
                        <i className={` ${(router.pathname=="/login" || router.pathname.includes(`/profile`)) ? "text-fitify-green" : "text-white"} fas fa-user`}></i>
                        <p className=" font-open-sans text-sm">{user ? user : "Login"}</p>
                    </div>
                </a>
            </Link> */}
            <Link href="/cart" key="cart" passHref>
                <a className=" md:px-4 px-1">
                    <div className={`hover:opacity-60 ${router.pathname=="/cart" ? "text-fitify-green" : "text-white"}`}>
                        <div className="flex">
                            <i className={`fas fa-shopping-cart`}></i> 
                            <p className="px-1">{counter}</p>
                        </div>
                        {/* <p className=" font-open-sans text-sm">Items</p> */}
                    </div>
                </a>
            </Link>
        </nav>
        </>
    );
}

const mapStateToProps = (state) => ({
    counter:state.cartReducer.quantity[0],
});

export default connect(mapStateToProps, null)(RightNavbar); 
