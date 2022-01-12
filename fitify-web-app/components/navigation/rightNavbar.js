import Link from "next/link";

const RightNavbar = () => {
    
    return(
        <>
        <nav className=" bg-fitify-black text-white text-2xl">
            <Link href="/login" key="login" passHref>
                <a className=" px-3"><i class="fas fa-user"></i> </a>
            </Link>
            <Link href="/shopping_bag" key="shopping_bag" passHref>
                <a className=" px-3"><i class="fas fa-shopping-cart"></i> </a>
            </Link>
        </nav>
        </>
    );
}

export default RightNavbar;