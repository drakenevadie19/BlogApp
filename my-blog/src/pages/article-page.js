import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

const ArticlePage = () => {
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
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </>
        
    )
}

export default ArticlePage;