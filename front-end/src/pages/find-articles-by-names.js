import { useParams } from "react-router-dom";
import articles from "./article-content";
import ArticleList from "../components/articles-list";
import NotFoundPage from "./not-found-page";

const FindArticles = () => {
    // Get the name to find
    const { articleName } = useParams();

    // Get the lowercase of the finding word
    const articleNameLower = articleName.toLowerCase();

    // converting to Lowecase will helping Searching tool to reconize article containing "Re" same as "re"
    const articleFound = articles.filter(article => article.title.toLowerCase().includes(articleNameLower));

    return (
        <>
            <h1>Articles with titles containing "{articleName}"</h1>
            {articleFound.length !== 0 ? (
                <ArticleList articles={articleFound} />
            ) : (
                <NotFoundPage />
            )}
        </>
    )
}

export default FindArticles;
