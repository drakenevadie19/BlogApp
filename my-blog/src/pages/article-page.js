import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

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

    //if article is undefined, display Not Found Page
    if (!article) {
        return <NotFoundPage />
    }

    //else display content like normal
    return (
        <>
            <h1>{article.title}</h1>
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </>
        
    )
}

export default ArticlePage;