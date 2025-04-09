/* eslint-disable prettier/prettier */

import { useState, useEffect } from 'react';

const ArticleForm = ({ article, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    status: 'Draft',
    author: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Load article data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && article) {
      setFormData({ ...article });
    }
  }, [article, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field if exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  const categoryOptions = ['Tutorial', 'Guide', 'Article', 'News', 'Review'];
  const statusOptions = ['Draft', 'Review', 'Published'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {mode === 'add' ? 'Add New Article' : 'Edit Article'}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* Status Field */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="mt-1 flex space-x-4">
                {statusOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={option}
                      checked={formData.status === option}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Author Field */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.author ? 'border-red-500' : ''}`}
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'add' ? 'Add Article' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;