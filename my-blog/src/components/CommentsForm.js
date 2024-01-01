import axios from "axios";
import { useState } from "react";

// form to add comment to the article 
const CommentsForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const postComment = async () => {
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText
        });
        const updatedArticleComment = response.data;

        //Reset name, commentText to empty 
        // this function is passed from article-page.js
        onArticleUpdated(updatedArticleComment);
        setName('');
        setCommentText('');
    }

    return (
        <>
            <div id="add-comment-form">
                <h3>Add a comment here!</h3>
                <label>
                    Name: 
                    <input type="text" value={name} onChange={e => setName(e.target.value)} /> 
                </label>
                <label>
                    Comment: 
                    <textarea rows={4} cols={50} value={commentText} onChange={e => setCommentText(e.target.value)} />
                </label>
                <button onClick={postComment}>Post Comment</button>
            </div>
        </>
    )
}

export default CommentsForm;