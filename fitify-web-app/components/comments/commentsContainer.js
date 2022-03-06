import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Comment from "./comment";

const CommentsContainer = () => {
    const [comments, setComments]=useState([]);
    const { data:session } = useSession();

    useEffect(async () => {
        const res = await fetch(`/api/comments/getAll`);
        
        if(res.status===200){
            const commentsData= await res.json();
            console.log(commentsData.comments);
            setComments(commentsData.comments);
        }
    },[comments])

    function addNew(){

    }

    return(
    <section className="custom:w-4/5 w-11/12 mx-auto">
        <h1 className="text-2xl font-bold">Comments</h1>
        {session && <button onClick={() => addNew()} className="px-2 py-3 text-lg bg-fitify-purple text-white font-semibold my-4">Add comment</button>}
        {comments.map((comment)=>{return(
            <Comment comment={comment}/>
        )
        })}
    </section>
    );
}

export default CommentsContainer;