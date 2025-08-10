import ArticleList from "../components/articles-list";
import articles from "./article-content";


const ArticleListPage = () => {
    return (
        <>
            <h1>List of Articles</h1>
            <ArticleList articles={articles} />
        </>
        
    )
}

export default ArticleListPage;