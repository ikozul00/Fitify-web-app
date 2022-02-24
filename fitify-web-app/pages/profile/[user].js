import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Profile = ({ user }) => {
  const router = useRouter();
  const { data:session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/login");
    },
  });


  function LogOut(event) {
    event.preventDefault();
    signOut({ callbackUrl: 'http://localhost:3000/' });
  }


  return (
    <>
      {user.name && <div className="flex flex-col  w-full">
        <div className="flex w-full mt-10">
          <h1 className=" font-bold md:text-3xl text-2xl text-fitify-purple ml-10 ">
            My Profile
          </h1>
          <button
            className=" bg-fitify-purple h-10 px-4 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap sm:w-32 w-24 sm:ml-16 ml-6"
            onClick={() => router.push("/errorPage")}
          >
            Edit
          </button>
        </div>
        <div className=" ml-16 my-12 flex sm:flex-row flex-col justify-start ">
          <div className="relative sm:h-52 sm:w-52 h-44 w-44 mr-16">
            <Image
              src={user.image ? user.image : "/profileImage.png"}
              alt="Profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className=" flex flex-col sm:mt-0 mt-10">
            <p className=" mb-3 sm:text-lg text-base">
              <span className=" font-semibold">Username:</span>{" "}
              <span>{user.name ? user.name : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Email:</span>{" "}
              <span>{user.email ? user.email : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Name:</span>{" "}
              <span>{user.firstName ? user.firstName : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Surname:</span>{" "}
              <span>{user.lastName ? user.lastName : "/"}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Phone number:</span>{" "}
              <span>{user.phone ? user.phone : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Address:</span>{" "}
              <span>{user.address ? user.address : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">City:</span>{" "}
              <span>{user.city ? user.city : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Country:</span>{" "}
              <span>{user.country ? user.country : "  /  "}</span>
            </p>
            <button
              onClick={(e) => LogOut(e)}
              className=" bg-fitify-pink uppercase h-10 px-4 py-2 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap w-32 mt-5 sm:ml-0 ml-6"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>}
      {!user.name && 
        <div className="flex justify-center items-center py-20 w-full text-3xl font-semibold">
          <p>Sorry data about user is not found, try again later.</p>
        </div>}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if(session){
      // Fetch data from external API
    const res = await fetch("http://localhost:3000/api/user", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(session.user)
    });
    if(res.status===200){
      const user = await res.json();
      return { props: { user:user.data, session: session } };
    }
    else{
      return { props: { user:{}, session: session } };
    }
  }
  else{
    return {props: {user:{}, session:session}}
  }
  
}

export default Profile;
