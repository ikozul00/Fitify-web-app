import Image from "next/image";
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown} from "react-icons/fa";
import { useState } from "react";
import { comment } from "postcss";

const Comment = ({commentData}) => {
    const [liked, setLiked] = useState(false);
    const[comment, setComment]=useState(commentData);
    const [disliked, setDisliked] = useState(false);
    const[error, setError] = useState("");

    async function onClickLiked(){
        if(!liked){
            const res = await fetch(`/api/comments/liked?id=${comment._id}`, {
                method: 'PUT'
            });
            if(res.status==200){
                setLiked(true);
                setComment({...comment, likes:comment.likes+1});
                setError("");
            }
            else{
                setError("Problem occured please try again later.");
            }
        }
        else{
            const res = await fetch(`/api/comments/removeLike?id=${comment._id}`, {
                method: 'PUT',
                body: JSON.stringify({id:comment._id})
            });
            if(res.status==200){
                setLiked(false);
                setComment({...comment, likes:comment.likes-1});
                setError("");
            }
            else{
                setError("Problem occured please try again later.");
            }
        }
    }

    async function onClickDislike(){
        if(!disliked){
            const res = await fetch(`/api/comments/disliked?id=${comment._id}`, {
                method: 'PUT',
                body: JSON.stringify({id:comment._id})
            });
            if(res.status==200){
                setDisliked(true);
                setComment({...comment, dislikes:comment.dislikes+1});
                setError("");
            }
            else{
                setError("Problem occured please try again later.");
            }
        }
        else{
            const res = await fetch(`/api/comments/removeDislike?id=${comment._id}`, {
                method: 'PUT',
                body: JSON.stringify({id:comment._id})
            });
            if(res.status==200){
                setDisliked(false);
                setComment({...comment, dislikes:comment.dislikes-1});
                setError("");
            }
            else{
                setError("Problem occured please try again later.");
            }
        }
    }


    return(
        <div className="border-2 border-black my-2 px-5 py-5 rounded-md flex justify-between" key={comment._id}>
            <div>
            <h1 className="text-xl font-bold">{comment.title}</h1>
            <div className="relative w-44 h-44 my-3">
            {comment?.image && <Image
            src={comment.image.url}
            alt={comment.image.title}
            layout="fill"
            objectFit="cover"
            ></Image>}
            </div>
            <p>{comment.content}</p>
            </div>
            <div className="flex flex-col justify-between">
            <button>Edit</button>
            <button>Delete</button>
            <div className="w-44 flex justify-around">
            <button onClick={() => onClickLiked()} className="text-2xl flex items-center">
                <p className="mr-2">{comment.likes}</p>
                {liked && <FaThumbsUp/>}
                {!liked && <FaRegThumbsUp/>}
            </button>
            <button onClick={() => onClickDislike()} className="text-2xl flex items-center">
            <p className="mr-2">{comment.dislikes}</p>
                {!disliked && <FaRegThumbsDown/>}
                {disliked && <FaThumbsDown/>}
            </button>
            <p>{error}</p>
            </div>
            
            </div>
        </div>
    );
}

export default Comment;