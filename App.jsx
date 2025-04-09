/* eslint-disable prettier/prettier */
// src/renderer/src/App.jsx
import  { useState, useEffect } from 'react';
import './assets/main.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ArticleTable from './components/ArticleTable';
import ArticleForm from './components/ArticleForm';
import Dashboard from './components/Dashboard';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showSidebar, setShowSidebar] = useState(true);
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'

  // Load demo data on startup
  useEffect(() => {
    setArticles([
      { id: 1, title: 'Getting Started with Electron', category: 'Tutorial', status: 'Published', date: '2025-04-07', author: 'John Doe' },
      { id: 2, title: 'React Native Best Practices', category: 'Guide', status: 'Draft', date: '2025-04-06', author: 'Jane Smith' },
      { id: 3, title: 'Cross Platform Development', category: 'Article', status: 'Published', date: '2025-04-05', author: 'Alex Johnson' },
      { id: 4, title: 'Tailwind CSS Tips and Tricks', category: 'Tutorial', status: 'Review', date: '2025-04-04', author: 'Sara Williams' },
      { id: 5, title: 'Monorepo Structure for Apps', category: 'Guide', status: 'Published', date: '2025-04-03', author: 'Mike Brown' },
    ]);
  }, []);

  const handleAddArticle = () => {
    setCurrentArticle(null);
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const handleSaveArticle = (article) => {
    if (formMode === 'add') {
      // Add new article with generated ID
      const newArticle = {
        ...article,
        id: articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1,
        date: new Date().toISOString().split('T')[0]
      };
      setArticles([...articles, newArticle]);
    } else {
      // Update existing article
      setArticles(articles.map(a => a.id === article.id ? article : a));
    }
    setIsFormOpen(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        showSidebar={showSidebar}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenu === 'dashboard' && <Dashboard articleCount={articles.length} />}

          {activeMenu === 'articles' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Article Management</h1>
                <button
                  onClick={handleAddArticle}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Article
                </button>
              </div>

              <ArticleTable
                articles={articles}
                onEdit={handleEditArticle}
                onDelete={handleDeleteArticle}
              />
            </>
          )}
        </main>
      </div>

      {/* Article Form Modal */}
      {isFormOpen && (
        <ArticleForm
          article={currentArticle}
          mode={formMode}
          onSave={handleSaveArticle}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;