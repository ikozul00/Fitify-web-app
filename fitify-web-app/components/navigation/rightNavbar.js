import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const RightNavbar = () => {
    const router = useRouter();
    const [user, setUser] = useState();

    if (typeof window !== 'undefined'){
        useEffect(() => {
            setUser(localStorage.getItem("user"));
        },localStorage.getItem("user"));
    }


    return(
        <>
        <nav className=" bg-fitify-black  text-2xl flex text-white">
            <Link href={user  ? "/profile" : "/login"} key="login" passHref>
                <a className=" px-4">
                    <div className="text-center hover:opacity-60">
                        <i className={` ${(router.pathname=="/login" || router.pathname=="/profile") ? "text-fitify-green" : "text-white"} fas fa-user`}></i>
                        <p className=" font-open-sans text-sm">{user ? user : "Login"}</p>
                    </div>
                </a>
            </Link>
            <Link href="/shopping_bag" key="shopping_bag" passHref>
                <a className=" px-4">
                    <div className="hover:opacity-60">
                        <i class={` ${router.pathname=="" ? "text-fitify-green" : "text-white"} fas fa-shopping-cart`}></i> 
                        <p className=" font-open-sans text-sm">Items</p>
                    </div>
                </a>
            </Link>
        </nav>
        </>
    );
}

export default RightNavbar;