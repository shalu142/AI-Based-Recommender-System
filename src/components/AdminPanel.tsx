import React, { useState } from 'react';
import { Upload, Database, Settings, BarChart3, Users, Film } from 'lucide-react';
import { apiService } from '../services/api';

export const AdminPanel: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'ratings' | 'movies') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('');

    try {
      const response = await apiService.uploadData(file, type);
      setUploadStatus(response.message);
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Movies', value: '5,678', icon: Film, color: 'bg-green-500' },
    { label: 'Total Ratings', value: '98,765', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Model Accuracy', value: '89.5%', icon: Database, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Data Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Upload Ratings Data</h4>
            <p className="text-gray-400 text-sm">Upload CSV file with user ratings (user_id, movie_id, rating)</p>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="block">
                <span className="sr-only">Choose ratings file</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'ratings')}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Upload Movies Data</h4>
            <p className="text-gray-400 text-sm">Upload CSV file with movie metadata (movie_id, title, genre, year)</p>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="block">
                <span className="sr-only">Choose movies file</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'movies')}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>
          </div>
        </div>
        
        {uploading && (
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-gray-400">Uploading and processing...</span>
          </div>
        )}
        
        {uploadStatus && (
          <div className="mt-4 p-3 bg-green-900 bg-opacity-50 border border-green-500 rounded-lg">
            <p className="text-green-400">{uploadStatus}</p>
          </div>
        )}
      </div>
      
      {/* Model Configuration */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Model Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Similarity Threshold
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              defaultValue="0.5"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.1</span>
              <span>1.0</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Max Recommendations
            </label>
            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Retrain Model
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Reset Configuration
          </button>
        </div>
      </div>
    </div>
  );
};