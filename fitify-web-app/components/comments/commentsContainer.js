import { useSession } from "next-auth/react";
import { getAssetById } from "pages/api/ContentfulAPI";
import { useEffect, useState } from "react";
import Comment from "./comment";
import NewComment from "./newComment";
import LoadingSpin from "react-loading-spin";

const CommentsContainer = ({productId, productTitle, productBrand}) => {
    const [comments, setComments]=useState([]);
    const [addForm, setAddForm] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { data:session } = useSession();

    useEffect(async () => {
        const res = await fetch(`/api/comments/getAll?id=${productId}`);
        
        if(res.status===200){
            const commentsData= await res.json();
           
            for(let comment of commentsData.comments){
                comment.image=await getAssetById(comment.imageId);
            }
            setComments(commentsData.comments.sort((el1, el2) => compareFunction(el1, el2)));
            setLoaded(true);
        }
    },[]);

    function compareFunction(val1, val2){
        if(val1.likes>=val2.likes){
            return -1;
        }
        else{
            return 1;
        }
    }

    function addNew(){
        setAddForm(true);

    }

    return(

    <section className="custom:w-4/5 w-11/12 mx-auto mb-10">
        <h1 className="text-2xl font-bold">Comments</h1>
        {session && loaded && !addForm && <button onClick={() => addNew()} className="px-2 py-3 text-lg bg-fitify-purple text-white font-semibold my-4">Add comment</button>}
        {addForm && <NewComment setVisibility={setAddForm} productId={productId} productTitle={productTitle} productBrand={productBrand} comments={comments} setComments={setComments}/>}
        { loaded && comments.map((comment)=>{return(
            <Comment commentData={comment} key={comment._id} setComments={setComments} comments={comments}/>
        )
        })}
        {loaded && comments.length===0 && <p>No comments!</p>}
        {!loaded && <div className="w-56 mx-auto"><LoadingSpin 
            width="15px"
            timingFunction="ease-in-out"
            direction="alternate"
            size="200px"
            primaryColor="#C20D57"
            secondaryColor="#333"
            numberOfRotationsInAnimation={2}/>
            </div>}
    </section>
    );
}

export default CommentsContainer;