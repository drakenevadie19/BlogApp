import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

import CommentsList  from "../components/CommentsList";
import CommentsForm from "../components/CommentsForm";

import axios from "axios";

import useUser from "../hooks/useUsers";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
    }, []);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage />
    }

    console.log(user);
    console.log(isLoading);
    return (
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            {user != null
                ? <button onClick={addUpvote}>Upvote</button>
                : <button>Log in to upvote</button>}
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        {user != null
            ? <CommentsForm
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
            : <button>Log in to add a comment</button>}
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;