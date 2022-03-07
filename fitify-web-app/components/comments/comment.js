const Comment = ({comment}) => {
    return(
        <div>
            <p>{comment.content}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
}

export default Comment;