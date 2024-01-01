import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

import CommentsList  from "../components/CommentsList";
import axios from "axios";

const ArticlePage = () => {
    //article information state for specific articles
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []});
    //get the params from URL params
    const {articleId} = useParams();

    useEffect(() => { // not allowed to push an asynchronous function to useEffect
        const loadArticleInfo = async () => {
            // use axios.get function to get all article information from database 
            const response = await axios.get(`/api/articles/${articleId}`);
            const newarticleInfo = response.data;
            setArticleInfo(newarticleInfo);
        }
        
        loadArticleInfo();
    }, []) 

    
    //find article from articles array that have the name match articleId
    // => If found the article that match the articleId, we can see the article displayed in the page
    // => If not found the article that match the articleId, article variable will be undefined 
    //  => Display nothing on the page 
    const article = articles.find(article => article.name === articleId);

    //Create a function to request to server for upvote
    const addUpvote = async () => {
        // Create a PUT request here
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    //if article is undefined, display Not Found Page
    if (!article) {
        return <NotFoundPage />
    }

    //else display content like normal
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Upvote</button>
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <CommentsList comments={articleInfo.comments} />
        </>
        
    )
}

export default ArticlePage;