import './App.css';

import { BrowserRouter, Routes, Route  } from 'react-router-dom';

import HomePage from './pages/home-page';
import AboutPage from './pages/about-page';
import ArticleListPage from './pages/article-list-page';
import ArticlePage from './pages/article-page';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>My Awesome Blog</h1>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
