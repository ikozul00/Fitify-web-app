import { useState } from "react";
import Image from "next/image";
import { createNewAsset } from "pages/api/ModifyProducts";
import { useSession } from "next-auth/react";
import {FaStar, FaRegStar} from 'react-icons/fa';


const NewComment = ({setVisibility, productId, productTitle,productBrand,comments, setComments}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();
    const [rateStars, setRateStars] = useState([0, 0, 0,0,0]);
    const [rate, setRate] = useState(0);
    const [error, setError] = useState("");
    const { data:session } = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          router.push("/login");
        },
      });


    function uploadImage(e){
        console.log("Image:");
        console.log(e.target.files[0]);
        setImage({...image,
            url: URL.createObjectURL(e.target.files[0]),
            title: e.target.files[0].name,
            imageData:e.target.files[0]
          });
    }

    async function addComment(e){
        e.preventDefault();
        let imageId;
        if(image){
            imageId= await createNewAsset(image.imageData);
        }
        else{
            imageId=0;
        }
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
                productBrand:productBrand,
                imageId:imageId,
                user:session.user.userId,
                userName:session.user.name
            })
        });
        if(res.status==201){
            setComments([...comments,{
                title:title,
                content:content,
                productId:productId,
                productTitle:productTitle,
                image:image,
            }]);
            setVisibility(false);
        }
        else{
            setError("Problem occured please try again later.")
        }
    }

    function starClicked(e){
        e.preventDefault();
        let target=e.target;
        let emojis=document.querySelectorAll(".star-icons");
        let br=1;
        let passed=false;
        if(rateStars[0]===0){
            for(let x of emojis){
                if(x.children[0]===target){
                    setRate(br);
                    rateStars[br-1]=1;
                    passed=true;
                }
                else if(passed){
                    rateStars[br-1]=0;
                }
                else{
                    rateStars[br-1]=1;
                }
                br+=1;
            }
        }
        if(rateStars[0]===1){
            for(let x of emojis){
                if(x.children[0]===target){
                    setRate(br);
                    rateStars[br-1]=0;
                    passed=true;
                }
                else if(passed){
                    rateStars[br-1]=0;
                }
                else{
                    rateStars[br-1]=1;
                }
                br+=1;
            }
        }
        setRateStars([...rateStars]);
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
            <div className="flex mt-4">
            <p className="mr-3">Rate:</p>
            {console.log(rateStars)}
            {rateStars.map((value, index) => {
                console.log(value);
                return(
                    <button key={index} onClick={(e)=>starClicked(e)} className="text-2xl mx-1 star-icons">
                        {value===1 && <FaStar/>}
                        {value===0 && <FaRegStar/>}
                    </button>
                );
            })}
            </div>
            {error && <p>{error}</p>}
            <button type="submit" onClick={(e) => addComment(e)} className=" bg-fitify-green text-white text-xl font-semibold w-36 py-2 place-self-end hover:cursor-pointer hover:opacity-70">Post</button>
            </div>
        </form>
    );
}

export default NewComment;