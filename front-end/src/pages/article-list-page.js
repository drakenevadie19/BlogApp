import ArticleList from "../components/articles-list";
import articles from "./article-content";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ArticleListPage = () => {
    const [toFind, setToFind] = useState("No Thing"); 

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setToFind(e.target.value);
    }

    const findElement = () => {
        navigate(`/find-articles/${toFind}`);
    }

    return (
      <div className="article-list-page-container">
        <div className='find-article'>
            <form className="d-flex flex-row align-self-center" role='search' onSubmit={findElement}>
                <div>                    
                    <input class="form-control me-2" type="search" placeholder="Search" name={toFind} aria-label="Search" onChange={handleChange} />
                </div>
                <div>
                    <button class="btn btn-outline-success search-now" type="submit">
                        <span className='search-word'>Search</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search search-icon" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>

        <h1>List of Articles</h1>
        <ArticleList articles={articles} />
      </div>
    );
}

export default ArticleListPage;