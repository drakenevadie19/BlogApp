// Component to display all of our comments
const CommentsList = ({ comments }) => (
    <>
        <h3>Comments:</h3>
        {comments.map(comment => (
            <div className="comment" key={comment.postBy + ': ' + comment.text}>
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </>
)

export default CommentsList;