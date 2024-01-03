import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import articles from "./article-content";
import NotFoundPage from "./not-found-page";

import CommentsList  from "../components/CommentsList";
import CommentsForm from "../components/CommentsForm";

import axios from "axios";

import useUser from "../hooks/useUsers";

import { useNavigate } from "react-router-dom";


const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const { articleId } = useParams();

    const {canUpvote} = articleInfo;
    const { user, isLoading } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? {authToken: token} : {};
            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,
            });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        if (!isLoading) 
            loadArticleInfo();
    }, [isLoading, user]);

    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authToken: token} : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
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
                ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                : <button onClick={() => {
                    navigate('/login');
                }}>Log in to upvote</button>}
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        {user != null
            ? <CommentsForm
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
            : <button onClick={() => {
                navigate('/login');
            }}>Log in to add a comment</button>}
        <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;