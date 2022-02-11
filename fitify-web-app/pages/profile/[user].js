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
        <div className="flex flex-col w-full">
        <div className="flex w-full">
        <h1 className=" font-bold text-3xl my-5 text-fitify-purple ml-10 mt-10">My Profile</h1>
        <div className="w-9/12 mt-10 flex justify-between ml-16 items-baseline">
        <button className=" bg-fitify-purple h-10 px-4 text-white text-lg hover:opacity-75 whitespace-nowrap w-32">Edit</button>
        <button onClick={(e) => LogOut(e)} className="bg-red-700 h-10 px-4 text-white text-lg hover:opacity-75 whitespace-nowrap w-32">Log Out</button>
        </div>
        </div>
        <div className=" ml-16 my-12 flex justify-start">
        <div className="relative h-52 w-52 mr-16">
            <Image
                src="/profileImage.png"
                alt="Profile image"
                layout="fill"
                objectFit="cover"
            />
        </div>
        <div >
        <p className=" text-lg"><span className=" font-semibold">Username:</span> <span>{data.username}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">Email:</span> <span>{data.email}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">Name:</span> <span>{data.name}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">Surname:</span> <span>{data.surname}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">Address:</span> <span>{data.address}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">City:</span> <span>{data.city}</span></p>
        <p className=" my-3 text-lg"><span className=" font-semibold">Phone number:</span> <span>{data.phoneNumber}</span></p>
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