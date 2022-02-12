import Link from "next/link";
import { useRouter } from "next/router";

const menuItems = [
  { title: "home", link: "home" },
  { title: "clothes", link: "shop?category=Clothes" },
  { title: "shoes", link: "shop?category=Shoes" },
  { title: "equipment", link: "shop?category=Equipment" },
  { title: "blog", link: "blog" },
  { title: "contact us", link: "contactUs" },
];

const Navbar = () => {
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname.split("/")[1] === pathname.split("/")[1];
  };

  
  const createItems = () => {
    let number = 0;
    const numberOfItems = menuItems.length;
    const items = menuItems.map((item) => {
      number++;
      const itemLink = `/${item.link === "home" ? "" : item.link}`;
      return (
        <Link href={itemLink} key={item.title} passHref>
          <a
            className={`  text-white text-lg font-open-sans whitespace-nowrap w-100 uppercase hover:bg-fitify-green px-5 py-2 ${
              number === numberOfItems ? "" : "border-r-2"
            } 
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
    });
    return items;
  };


  return (
    <>
      <nav className="bg-fitify-black py-5">{createItems()}</nav>
    </>
  );
};

export default Navbar;
