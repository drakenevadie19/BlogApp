import ArticleList from "../components/articles-list";
import articles from "./article-content";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ArticleListPage = () => {
    const [toFind, setToFind] = useState("No Thing"); 
    const [openingSearch, setOpeningSearch] = useState(false);

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
            {
                openingSearch
                ?
                    <form className="d-flex flex-row align-self-center" role='search' onSubmit={findElement}>
                        <input className="form-control me-2" type="search" placeholder="Search" name={toFind} aria-label="Search" onChange={handleChange} />
                        <div className="find-article-bar-button-group">
                            <button className="search-now" type="submit">
                                {/* <span className='search-word'>Search</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                            <button className="find-article-cancel" onClick={() => setOpeningSearch(false)}>
                                {/* <span className='search-word'>Search</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                :
                    <div className="find-icon" onClick={() => setOpeningSearch(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </div>
            }
        </div>

        <h1>List of Articles</h1>
        <ArticleList articles={articles} />
      </div>
    );
}

export default ArticleListPage;