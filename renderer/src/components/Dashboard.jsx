/* eslint-disable prettier/prettier */
// src/renderer/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const Dashboard = ({ articleCount }) => {
  const [stats, setStats] = useState({
    published: 0,
    draft: 0,
    review: 0
  });

  const [recentActivity] = useState([
    { id: 1, action: 'Published', article: 'SMKN 46 Menjadi juara LKS', user: 'Amri Ikhda', time: '2 hours ago' },
    { id: 2, action: 'Edited', article: 'Kursus Electron JS', user: 'Amri Ikhda', time: '4 hours ago' },
    { id: 3, action: 'Submitted for Review', article: 'Tailwind CSS Tips and Tricks', user: 'Amri Ikhda', time: '6 hours ago' },
    { id: 4, action: 'Created Draft', article: 'Pengelolaan Web', user: 'Amri Ikhda', time: '1 day ago' },
  ]);

  // Simulate fetching stats
  useEffect(() => {
    // In a real app, this would be an API call or read from a database
    setStats({
      published: 3,
      draft: 1,
      review: 1
    });
  }, [articleCount]);

  // Calculate percentages for the statistics visualization
  const getPercentage = (value) => {
    return articleCount > 0 ? Math.round((value / articleCount) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Books</p>
              <p className="text-2xl font-semibold text-gray-900">{articleCount}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Published</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.published}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Review</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.review}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.draft}</p>
            </div>
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Status Visualization */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Status</h2>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-green-500"
              style={{ width: `${getPercentage(stats.published)}%` }}
              title={`Published: ${stats.published} (${getPercentage(stats.published)}%)`}
            ></div>
            <div
              className="bg-yellow-500"
              style={{ width: `${getPercentage(stats.review)}%` }}
              title={`In Review: ${stats.review} (${getPercentage(stats.review)}%)`}
            ></div>
            <div
              className="bg-gray-400"
              style={{ width: `${getPercentage(stats.draft)}%` }}
              title={`Draft: ${stats.draft} (${getPercentage(stats.draft)}%)`}
            ></div>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span>Published ({getPercentage(stats.published)}%)</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>In Review ({getPercentage(stats.review)}%)</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
            <span>Draft ({getPercentage(stats.draft)}%)</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                {activity.action === 'Published' && (
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                {activity.action === 'Edited' && (
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                )}
                {activity.action === 'Submitted for Review' && (
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
                {activity.action === 'Created Draft' && (
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                )}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user} {activity.action.toLowerCase()} <span className="font-semibold">"{activity.article}"</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all activity →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">New Article</p>
              <p className="text-sm text-gray-500">Create a new article</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Review Queue</p>
              <p className="text-sm text-gray-500">Manage pending reviews</p>
            </div>
          </button>
          <button className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Settings</p>
              <p className="text-sm text-gray-500">Configure application</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
