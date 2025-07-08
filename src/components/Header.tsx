import React from 'react';
import { User, Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  user: {
    username: string;
    email: string;
  };
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSearch }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">RecommendFlix</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Recommendations</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Browse</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">My List</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};