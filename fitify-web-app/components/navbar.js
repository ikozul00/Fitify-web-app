import Link from "next/link";

const menuItems=["home","clothes","shoes","equipment","blog","contact us"];

const Navbar = () =>{

    return(
        <>
            <nav>
                {menuItems.map((item) => {
                    return (
                    <Link href={`/${item}`}>
                        <a className="text-3xl">{item} </a>
                    </Link>
                    );
                })}
            </nav>
        </>
    )
}

export default Navbar;