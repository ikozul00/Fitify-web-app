import { signOut, useSession, getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ParseDate } from "@/lib/parseDateMongo";
import Link from "next/link";
import Edit from "@/components/profile/edit";
import CommentsContainer from "@/components/profile/commentsContainer";

const Profile = ({ userData, orders }) => {
  const router = useRouter();
  const [user, setUser] = useState(userData);
  const [edit, setEdit] = useState(false);
  const [showOrders, setShowOrders] = useState(true);
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
          {!edit && <button
            className=" bg-fitify-purple h-10 px-4 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap sm:w-32 w-24 sm:ml-16 ml-6"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>}
        </div>
        {!edit && <div className=" ml-16 my-12 flex sm:flex-row flex-col justify-start ">
          <div className="relative sm:h-52 sm:w-52 h-44 w-44 mr-16">
            <Image
              src={user.image ? user.image : "/profileImage.png"}
              alt="Profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex w-9/12 justify-between">
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
              <span className=" font-semibold">First name:</span>{" "}
              <span>{user.firstName ? user.firstName : "  /  "}</span>
            </p>
            <p className=" my-3 sm:text-lg text-base">
              <span className=" font-semibold">Last name:</span>{" "}
              <span>{user.lastName ? user.lastName : "/"}</span>
            </p>
            </div>
            <div className=" flex flex-col sm:mt-0 mt-10">
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
            </div>
            
            <button
              onClick={(e) => LogOut(e)}
              className=" bg-fitify-pink uppercase h-10 px-4 py-2 text-white sm:text-lg text-base hover:opacity-75 whitespace-nowrap w-32 mt-5 sm:ml-0 ml-6 justify-self-end"
            >
              Log Out
            </button>
            </div>
        </div>}
        {edit && <Edit setEdit={setEdit} user={user} setUser={setUser}/>}
      <div className="w-11/12 mx-auto my-10">
        <button onClick={()=>setShowOrders(true)} className={`font-bold mb-5 text-xl border-2 border-t-0 border-black  w-36 rounded-md ${showOrders ? "bg-fitify-green text-white" : "bg-white"}`}>Orders</button>
        <button onClick={()=>setShowOrders(false)} className={`font-bold mb-5 text-xl border-2 border-t-0 border-black w-36 rounded-md ${!showOrders ? "bg-fitify-green text-white" : "bg-white"}`}>Comments</button>
        {orders.length===0 && showOrders && <p>No orders made yet.</p>}
        {showOrders && orders.map((order) => {
          return(
            <Link href={`/profile/order/${order.id}`} passHref  key={order.id}>
            <div className="border-2 border-black p-3 my-3 w-3/5 flex flex-col hover:cursor-pointer hover:bg-fitify-green-light">
              <p className="font-semibold text-lg">{ParseDate(order.date)}</p>
              {order.items.map((item) => {
                if(item){
                return(
                  <div key={`${order.id}-${item.title}-${item.size}`} className="ml-3">
                    <p><span className="mr-4 font-semibold">{item.amount}X </span><span>{item.title}</span> <span className="font-semibold">${item.price}</span></p>
                  </div>
                )}
              })}
              <p className="place-self-end font-bold text-xl">${order.price}</p>
            </div>
            </Link>
          )
        })}
        {!showOrders && <CommentsContainer userId={user?.id}/>}
      </div>
      </div>
      }
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
    const res = await fetch("http://localhost:3000/api/profile/user", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(session.user)
    });
    if(res.status===200){
      const user = await res.json();
      const resOrders = await fetch(`http://localhost:3000/api/orders/getOrders?id=${user.data.id}`);
      if(resOrders.status===200){
        const orders=await resOrders.json();
        return { props: { userData:user.data, session: session, orders:orders.userOrders } };
      }
      else{
        return { props: { userData:user.data, session: session, orders:[] } };
      }
    }
    else{
      return { props: { userData:{}, session: session, orders:[] } };
    }
  }
  else{
    return {props: {userData:{}, session:session, orders:[]}}
  }
  
}

export default Profile;
