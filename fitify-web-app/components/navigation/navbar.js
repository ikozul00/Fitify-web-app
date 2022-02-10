import Link from "next/link";
import { useRouter } from 'next/router';

const menuItems=["home","clothes","shoes","equipment","blog","contact Us"];


const Navbar = () =>{
    const router = useRouter()
    
    const isActive = (pathname) =>{
        return router.pathname.split('/')[1] === pathname.split('/')[1];
    }

    const createLink = (value) => {
        value = value.replace(" ","");
        const itemLink=`/${value==="home" ? "":value}`;
        return itemLink;
    }

    const createItems = () => {
        let number=0;
        const numberOfItmes=menuItems.length;
        const items=menuItems.map((item) => {
            number++;
            const itemLink=createLink(item);
            return (
            <Link href={itemLink} key={item} passHref>
                <a className={`  text-white text-lg font-open-sans whitespace-nowrap w-100 uppercase hover:bg-fitify-green px-5 py-2 ${number===numberOfItmes ? "": "border-r-2"} 
                ${isActive(itemLink) ? "underline-offset-4 text-decoration-line: underline font-bold" : ""}`}>{item} </a>
            </Link>
            );
        });
        return items;
    }


    return(
        <>
            <nav className="bg-fitify-black py-5">
                {
                    createItems()
                }
            </nav>
        </>
    )
}

export default Navbar;