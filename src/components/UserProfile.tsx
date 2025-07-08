import React from 'react';
import { User, Star, TrendingUp, Calendar } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  recentRatings: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, recentRatings }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">User Profile</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white">{user.username}</h3>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Total Ratings</span>
          </div>
          <p className="text-2xl font-bold text-white">{user.totalRatings}</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">Recent Activity</span>
          </div>
          <p className="text-2xl font-bold text-white">{recentRatings}</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-300">Member Since</span>
          </div>
          <p className="text-sm font-medium text-white">Jan 2024</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium text-white mb-3">Preferred Genres</h4>
        <div className="flex flex-wrap gap-2">
          {user.preferences.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};