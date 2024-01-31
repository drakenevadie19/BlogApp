import './App.css';

import { BrowserRouter, Routes, Route  } from 'react-router-dom';

import Navbar from './nav-bar';
import HomePage from './pages/home-page';
import AboutPage from './pages/about-page';
import ArticleListPage from './pages/article-list-page';
import ArticlePage from './pages/article-page';
import NotFoundPage from './pages/not-found-page';

import FindArticles from './pages/find-articles-by-names';

import CreateAccountPage from './pages/create-account-page';
import LoginPage from './pages/login-page';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-account' element={<CreateAccountPage />} />

            <Route path='/find-articles/:articleName' element={<FindArticles />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;