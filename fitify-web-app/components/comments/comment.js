import Image from "next/image";

const Comment = ({comment}) => {
    return(
        <div className="border-2 border-black my-2">
            <h1>{comment.title}</h1>
            <p>{comment.content}</p>
            <div className="relative w-44 h-44">
            <Image
            src={comment.image.url}
            alt={comment.image.title}
            layout="fill"
            objectFit="cover"
            ></Image>
            </div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
}

export default Comment;