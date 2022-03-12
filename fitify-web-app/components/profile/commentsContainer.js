
import { getAssetById } from "pages/api/ContentfulAPI";
import { useEffect, useState } from "react";
import Comment from "../comments/comment";
import LoadingSpin from "react-loading-spin";

const CommentsContainer = ({userId}) => {
    const [comments, setComments]=useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const res = await fetch(`/api/comments/getUserComments?id=${userId}`);
        
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


    return(
    <>
    {loaded && <section className="custom:w-4/5 w-11/12">
        {comments.map((comment)=>{return(
            <Comment commentData={comment} key={comment._id} userId={userId} setComments={setComments} comments={comments}/>
        )
        })}
        {loaded && comments.length===0 && <p>No comments!</p>}
         
    </section>}
    {!loaded && <div className="w-56 mx-auto"><LoadingSpin 
            width="15px"
            timingFunction="ease-in-out"
            direction="alternate"
            size="200px"
            primaryColor="#C20D57"
            secondaryColor="#333"
            numberOfRotationsInAnimation={2}/>
            </div>}
    </>
    );
}

export default CommentsContainer;