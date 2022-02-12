import Link from "next/link";

const Logo = () =>{
    return(
        <>
        <Link href={"/"}>
        <p className="text-white bg-fitify-black w-min px-3 sm:mt-0 mt-6 h-16 flex items-center hover:cursor-pointer">
            <span className=" w-min text-4xl uppercase font-logo-allerta-stencil">Fit</span>
            <span className=" w-min text-3xl font-logo-pacifico">ify</span>
        </p>
        </Link>
        </>
    );
}

export default Logo;