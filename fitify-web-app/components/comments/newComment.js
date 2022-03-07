import { useState } from "react";
import Image from "next/image";

const NewComment = ({setVisibility, productId, productTitle,comments, setComments}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();
    const [error, setError] = useState("");

    console.log(productId);

    function uploadImage(e){
        setImage({
            url: URL.createObjectURL(e.target.files[0]),
            title: e.target.files[0].name,
          });
    }

    async function addComment(e){
        e.preventDefault();
        const res = await fetch("/api/comments/addNew", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title:title,
                content:content,
                productId:productId,
                productTitle:productTitle,
                image:image,
            })
        });
        if(res.status==201){
            setComments([...comments,{
                title:title,
                content:content,
                productId:productId,
                productTitle:productTitle,
                image:image
            }]);
            setVisibility(false);
        }
        else{
            setError("Problem occured please try again later.")
        }
    }


    return(
        <form className="border-2 border-black flex flex-col relative mt-2 mb-5">
            <button onClick={() => setVisibility(false)} className="place-self-end px-4 py-2 font-bold text-2xl absolute">X</button>
            <div className="w-5/6 mx-auto flex flex-col my-4">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 mb-5 border-fitify-purple form-field "></input>
            <label htmlFor="content" >Description:</label>
            <textarea id="content" name="content" rows={6} value={content} onChange={(e) => setContent(e.target.value)} className="border-2 mb-5 border-fitify-purple form-field"></textarea>
            <p>Image:</p>
            {!image && <label htmlFor="image" onChange={(e)=>uploadImage(e)} className="hover:cursor-pointer hover:opacity-70 bg-fitify-purple text-white w-40 text-center py-1">Upload image</label>}
            <input type="file" id="image" name="image" className="hidden" onChange={(e)=>uploadImage(e)}></input>
            {image && (
            <div className="w-2/5 h-56 relative">
            <button onClick={() => setImage(null)} className="text-3xl text-red-700 font-bold absolute -right-2 -top-4 z-10">X</button>
            <Image
                src={image.url}
                alt={image.title}
                layout="fill"
                objectFit="cover"
            />
            </div>
            )}
            {error && <p>{error}</p>}
            <button type="submit" onClick={(e) => addComment(e)} className=" bg-fitify-green text-white text-xl font-semibold w-36 py-2 place-self-end hover:cursor-pointer hover:opacity-70">Post</button>
            </div>
        </form>
    );
}

export default NewComment;