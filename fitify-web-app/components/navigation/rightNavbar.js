import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cart from "./cart";
import { FaUserAlt } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const RightNavbar = ({mobile }) => {
  const { data:session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(()=>{
    if(session){
      setUser(session.user);
    }
  },[session]);

  function LogOut(event) {
    event.preventDefault(); 
    signOut({ callbackUrl: 'https://fitify-nwt.vercel.app/' });
  }
  return (
    <>
      <nav className=" bg-fitify-black  text-2xl  flex text-white h-20 items-center font-open-sans">
        {!mobile && (
          <div className="relative dropdown px-8">
            <button aria-label="User" className="text-center">
              <FaUserAlt className="mx-auto"/>
              {user?.name && <p className=" text-base pt-1">{user.name}</p>}
            </button>
            <div className="hidden dropdown-content absolute bg-fitify-black right-6 w-32 text-lg text-center z-10 shadow-2xl">
              <Link
                href={user?.name ? `/profile/${user.name}` : "/login"}
                key="dropdown1"
                passHref
              >
                <a className="text-center py-4 whitespace-nowrap hover:bg-fitify-green">
                  {user?.name ? user.name : "Login"}
                </a>
              </Link>
              <Link
                href={user?.name ? `/home` : "/registration"}
                key="dropdown2"
                passHref
              >
                <a
                  className="text-center py-4 whitespace-nowrap hover:bg-fitify-green"
                  onClick={user?.name ? (e) => LogOut(e) : () => {}}
                >
                  {user?.name ? "Log Out" : "Sign Up"}
                </a>
              </Link>
            </div>
          </div>
        )}
        {/* how it will be displayed on smaller devices */}
        {mobile && (
          <div className="flex flex-col text-center mt-6 text-lg w-full">
            <Link
              href={user?.name ? `/profile/${user.name}` : "/login"}
              key="dropdown1"
              passHref
            >
              <a
                className={`px-6 py-4 whitespace-nowrap uppercase hover:bg-fitify-green ${
                  router.pathname.includes("profile") ||
                  router.pathname.includes("login")
                    ? "underline-offset-4 text-decoration-line: underline font-bold"
                    : ""
                }`}
              >
                {user?.name ? user?.name : "Login"}
              </a>
            </Link>
            <Link
              href={user?.name ? `/home` : "/registration"}
              key="dropdown2"
              passHref
            >
              <a
                className={`px-6 py-4 whitespace-nowrap uppercase hover:bg-fitify-green ${
                  router.pathname.includes("registration") ||
                  router.pathname.includes("home")
                    ? "underline-offset-4 text-decoration-line: underline font-bold"
                    : ""
                }`}
                onClick={user?.name ? (e) => LogOut(e) : () => {}}
              >
                {user?.name ? "Log Out" : "Sign Up"}
              </a>
            </Link>
          </div>
        )}
        {!mobile && <Cart isOpen={false} />}
      </nav>
    </>
  );
};

export default RightNavbar;
