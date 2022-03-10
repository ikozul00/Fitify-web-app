
import { getAssetById } from "pages/api/ContentfulAPI";
import { useEffect, useState } from "react";
import Comment from "../comments/comment";

const CommentsContainer = ({userId}) => {
    const [comments, setComments]=useState([]);

    useEffect(async () => {
        const res = await fetch(`/api/comments/getUserComments?id=${userId}`);
        
        if(res.status===200){
            const commentsData= await res.json();
           
            for(let comment of commentsData.comments){
                comment.image=await getAssetById(comment.imageId);
            }
            setComments(commentsData.comments.sort((el1, el2) => compareFunction(el1, el2)));
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
    <section className="custom:w-4/5 w-11/12">
        {comments.map((comment)=>{return(
            <Comment commentData={comment} key={comment._id}/>
        )
        })}
    </section>
    );
}

export default CommentsContainer;