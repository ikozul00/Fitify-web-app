// import { GetUserData } from "@/lib/ContentfulAPI";
import { GetUserData } from "@/lib/ContentfulAPI";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.development";

const Profile = ({data}) => {
    const router=useRouter();

    function LogOut(event){
        event.preventDefault();
        localStorage.removeItem("user");
        router.push("/");
    }

    return(
        <>
        <div className="flex flex-col  w-full">
        <div className="flex w-full mt-10">
        <h1 className=" font-bold md:text-3xl text-2xl text-fitify-purple ml-10 ">My Profile</h1>
        <button className=" bg-fitify-purple h-10 px-4 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap sm:w-32 w-24 sm:ml-16 ml-6">Edit</button>
        </div>
        <div className=" ml-16 my-12 flex sm:flex-row flex-col justify-start ">
        <div className="relative sm:h-52 sm:w-52 h-44 w-44 mr-16">
            <Image
                src="/profileImage.png"
                alt="Profile image"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div className=" flex flex-col sm:mt-0 mt-10">
        <p className=" mb-3 sm:text-lg text-base"><span className=" font-semibold">Username:</span> <span>{data.username}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">Email:</span> <span>{data.email}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">Name:</span> <span>{data.name}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">Surname:</span> <span>{data.surname}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">Address:</span> <span>{data.address}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">City:</span> <span>{data.city}</span></p>
        <p className=" my-3 sm:text-lg text-base"><span className=" font-semibold">Phone number:</span> <span>{data.phoneNumber}</span></p>
        <button onClick={(e) => LogOut(e)} className=" bg-fitify-pink uppercase h-10 px-4 py-2 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap w-32 mt-5 sm:ml-0 ml-6">Log Out</button>
        </div>

        </div>
        
        
        </div>
        </>
    )
}


export async function getServerSideProps(context) {
    // Fetch data from external API
    const {user}=context.params;
    const res = await GetUserData(user);
    const data=res[0];
    // Pass data to the page via props
    return { props: { data } }
  }
  



export default Profile;