import articles from "./article-content";
import { Link } from "react-router-dom";

const ArticleListPage = () => {
    return (
        <>
            <h1>List of Articles</h1>
            {articles.map(article => (
                <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                    <h3>{article.title}</h3>
                    <p>{ article.content[0].substring(0,150) }...</p>
                </Link>
            ))}
        </>
        
    )
}

export default ArticleListPage;