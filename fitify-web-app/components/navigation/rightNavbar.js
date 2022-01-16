import Link from "next/link";
import { useRouter } from 'next/router';

const RightNavbar = () => {
    const router = useRouter();

    return(
        <>
        <nav className=" bg-fitify-black  text-2xl flex text-white">
            <Link href="/login" key="login" passHref>
                <a className=" px-5">
                    <div className="text-center">
                        <i className={` ${router.pathname=="/login" ? "text-fitify-green" : "text-white"} fas fa-user`}></i>
                        <p className=" font-open-sans text-sm">Login</p>
                    </div>
                </a>
            </Link>
            <Link href="/shopping_bag" key="shopping_bag" passHref>
                <a className=" px-5">
                    <div>
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