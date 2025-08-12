import { useParams } from "react-router-dom";
import articles from "./article-content";
import ArticleList from "../components/articles-list";
import NotFoundPage from "./not-found-page";
import { useNavigate } from "react-router-dom";

const FindArticles = () => {
    // Get the name to find
    const { articleName } = useParams();

    // Get the lowercase of the finding word
    const articleNameLower = articleName.toLowerCase();

    // converting to Lowecase will helping Searching tool to reconize article containing "Re" same as "re"
    const articleFound = articles.filter(article => article.title.toLowerCase().includes(articleNameLower));

    const navigate = useNavigate();

    return (
      <div className="find-articles-resule-page">
        <div className="find-articles-back-button-wrapper">
            <button className="button-class find-articles-back-button" onClick={() => navigate("/articles")}>
                Go Back
            </button>
        </div>

        <h2 className="find-articles-title">Articles with titles containing "{articleName}"</h2>

        {articleFound.length !== 0 ? (
          <ArticleList articles={articleFound} />
        ) : (
          <NotFoundPage />
        )}
      </div>
    );
}

export default FindArticles;
