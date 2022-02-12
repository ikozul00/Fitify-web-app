import { useState, } from "react";
import BurgerNavIcon from "./burgerNavIcon";
import Link from "next/link";
import { useRouter } from "next/router";
import RightNavbar from "./rightNavbar";
import Cart from "./cart";

const BurgerNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const menuItems = [
        { title: "home", link: "home" },
        { title: "clothes", link: "shop?category=Clothes" },
        { title: "shoes", link: "shop?category=Shoes" },
        { title: "equipment", link: "shop?category=Equipment" },
        { title: "blog", link: "blog" },
        { title: "contact us", link: "contactUs" },
    ];

    const isActive = (pathname) => {
        if(router.pathname.split("/")[1]==="shop"){
          return pathname.includes(router.query.category);
        }
        else
          return router.pathname.split("/")[1] === pathname.split("/")[1];
    };

    return(
        <div className="md:hidden flex flex-col">
        <div className="flex justify-between items-center">
        <Cart isOpen={isOpen}/>
        <BurgerNavIcon clicked={isOpen} setIsClicked={setIsOpen}/>
        </div>
        <main className={`${
            !isOpen ? 'translate-x-full' : 'translate-x-0'
        }  transform translate fixed right-0 m-0 top-0 p-0 bg-fitify-black md:hidden transition duration-500 ease-in-out flex-col justify-center items-center h-screen z-20`}>
        <BurgerNavIcon clicked={isOpen} setIsClicked={setIsOpen} classes={" bg-red-800"}/>
        <div className="flex flex-col text-center mt-10">
        {menuItems.map((item) => {
            const itemLink = `/${item.link === "home" ? "" : item.link}`;
            return(
                <Link href={itemLink} key={item.title} passHref>
                <a
                  className={`  text-white text-lg font-open-sans py-4 px-6 whitespace-nowrap uppercase hover:bg-fitify-green
                      ${
                        isActive(itemLink)
                          ? "underline-offset-4 text-decoration-line: underline font-bold"
                          : ""
                      }`}
                >
                  {item.title}{" "}
                </a>
              </Link>
            );
        })}
        <RightNavbar mobile={true}/>
        </div>
        </main>
        </div>
    );
}

export default BurgerNav;