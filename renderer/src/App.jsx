// src/renderer/src/App.jsx
import { useState, useEffect } from 'react'
import './assets/main.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ArticleTable from './components/ArticleTable'
import ArticleForm from './components/ArticleForm'
import Dashboard from './components/Dashboard'
import Categories from './components/Categories'
import Users from './components/Users'

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [showSidebar, setShowSidebar] = useState(true)
  const [articles, setArticles] = useState([])
  const [currentArticle, setCurrentArticle] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState('add') // 'add' or 'edit'

  // Load demo data on startup
  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: 'Belajar Electron',
        category: 'Tutorial',
        status: 'Published',
        date: '2025-04-07',
        author: 'Amri Ikhda'
      },
      {
        id: 2,
        title: 'Belajar React',
        category: 'Guide',
        status: 'Draft',
        date: '2025-04-06',
        author: 'Amri'
      },
      {
        id: 3,
        title: 'Cross Platform Development',
        category: 'Article',
        status: 'Published',
        date: '2025-04-05',
        author: 'Amri Ikhda'
      },
      {
        id: 4,
        title: 'Tailwind CSS Tips and Tricks',
        category: 'Tutorial',
        status: 'Review',
        date: '2025-04-04',
        author: 'Amri Ikhda'
      },
      {
        id: 5,
        title: 'Monorepo Structure for Apps',
        category: 'Guide',
        status: 'Published',
        date: '2025-04-03',
        author: 'M Amri'
      }
    ])
  }, [])

  const handleAddArticle = () => {
    setCurrentArticle(null)
    setFormMode('add')
    setIsFormOpen(true)
  }

  const handleEditArticle = (article) => {
    setCurrentArticle(article)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter((article) => article.id !== id))
    }
  }

  const handleSaveArticle = (article) => {
    if (formMode === 'add') {
      const newArticle = {
        ...article,
        id: articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1,
        date: new Date().toISOString().split('T')[0]
      }
      setArticles([...articles, newArticle])
    } else {
      setArticles(articles.map((a) => (a.id === article.id ? article : a)))
    }
    setIsFormOpen(false)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard articleCount={articles.length} />

      case 'articles':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Article Management</h1>
              <button
                onClick={handleAddArticle}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
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
        )

      case 'categories':
        return <Categories />

      case 'users':
        return <Users />

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
            <p className="text-gray-600">Settings page content goes here.</p>
          </div>
        )

      default:
        return <Dashboard articleCount={articles.length} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}
      >
        <Header toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
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
  )
}

export default App
