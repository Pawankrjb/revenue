import React from 'react';
import { User } from '../types';
import { StatsChart } from './StatsChart';
import { DailyInsight } from './DailyInsight';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Lumina</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Analytics
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Settings
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {user.name}
                </span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-300 object-cover ring-2 ring-white"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-red-600 transition-colors duration-150 p-2 rounded-md hover:bg-gray-100"
                title="Sign out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section with Gemini */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="mt-1 text-sm text-gray-500">Here's what's happening with your projects today.</p>
        </div>

        <DailyInsight username={user.name} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$24,560.00', change: '+12%', positive: true },
            { label: 'Active Users', value: '1,234', change: '+5.4%', positive: true },
            { label: 'Bounce Rate', value: '24.57%', change: '-2.1%', positive: true },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white overflow-hidden shadow rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <div className="mt-2 flex items-center text-sm">
                <span className={`flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.positive ? (
                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  ) : (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
                  )}
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200">Weekly</button>
              <button className="px-3 py-1 bg-white text-gray-400 rounded-md text-sm font-medium hover:text-gray-600">Monthly</button>
            </div>
          </div>
          <StatsChart />
        </div>
      </main>
    </div>
  );
};