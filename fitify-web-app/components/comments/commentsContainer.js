import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Comment from "./comment";
import NewComment from "./newComment";

const CommentsContainer = ({productId, productTitle}) => {
    const [comments, setComments]=useState([]);
    const [addForm, setAddForm] = useState(false);
    const { data:session } = useSession();

    useEffect(async () => {
        const res = await fetch(`/api/comments/getAll?id=${productId}`);
        
        if(res.status===200){
            const commentsData= await res.json();
            setComments(commentsData.comments);
        }
    },[comments])

    function addNew(){
        setAddForm(true);

    }

    return(
    <section className="custom:w-4/5 w-11/12 mx-auto">
        <h1 className="text-2xl font-bold">Comments</h1>
        {session && !addForm && <button onClick={() => addNew()} className="px-2 py-3 text-lg bg-fitify-purple text-white font-semibold my-4">Add comment</button>}
        {addForm && <NewComment setVisibility={setAddForm} productId={productId} productTitle={productTitle} comments={comments} setComments={setComments}/>}
        {comments.map((comment)=>{return(
            <Comment comment={comment}/>
        )
        })}
    </section>
    );
}

export default CommentsContainer;