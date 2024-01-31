import { useParams } from "react-router-dom";
import articles from "./article-content";
import ArticleList from "../components/articles-list";
import NotFoundPage from "./not-found-page";

const FindArticles = () => {
    // Get the name to find
    const { articleName } = useParams();

    const articleFound = articles.filter(article => article.name.includes(articleName));

    return (
        <>
            <h1>Article with name containing "{articleName}"</h1>
            {articleFound.length !== 0 ? (
                <ArticleList articles={articleFound} />
            ) : (
                <NotFoundPage />
            )}
        </>
    )
}

export default FindArticles;
