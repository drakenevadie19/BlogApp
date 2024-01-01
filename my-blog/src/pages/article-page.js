import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

const ArticlePage = () => {
    //article information state for specific articles
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: []});

    //Logic to process when fetching #upvotes and comments from server
    useEffect(() => {
        //What we will do with data when finishing querrying froms server
        // We will use Axios to fetch data from server
        // we will generate a random number of upvote => When we do this, the number of upvotes goes crazy 
        //  => Because useEffect hook runs not only when the component first mounts, but also runs whenever the component updates
        //     and everytime we generate a number (makes changes to components), this action is also caught => number randomize infinitively
        setArticleInfo({ upvotes: Math.ceil(Math.random() * 10), comments: []})
    }, []) 
    // adding empty bracket as second argument => logical function will only be run when the page first loaded
    // if there is avariable inside the array, whenever the value of the variable is changed, the logical function will also be executed AGAIN

    //get the params from URL params
    const {articleId} = useParams();
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