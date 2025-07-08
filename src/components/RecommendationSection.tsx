import React, { useState, useEffect } from 'react';
import { TrendingUp, Download, RefreshCw, Info } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { Recommendation } from '../types';
import { apiService } from '../services/api';

interface RecommendationSectionProps {
  userId: number;
  onMovieRate: (movieId: number, rating: number) => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({ userId, onMovieRate }) => {
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const data = await apiService.getRecommendations(userId);
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshRecommendations = async () => {
    setRefreshing(true);
    await loadRecommendations();
    setRefreshing(false);
  };

  const exportRecommendations = async (format: 'csv' | 'json') => {
    try {
      const blob = await apiService.exportRecommendations(userId, format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recommendations.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export recommendations:', error);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No recommendations available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshRecommendations}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => exportRecommendations('csv')}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
              >
                Export as CSV
              </button>
              <button
                onClick={() => exportRecommendations('json')}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg"
              >
                Export as JSON
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
        <Info className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-white text-sm">
            <span className="font-medium">Algorithm:</span> {recommendations.algorithm} |
            <span className="font-medium ml-2">Confidence:</span> {Math.round(recommendations.confidence * 100)}% |
            <span className="font-medium ml-2">Generated:</span> {new Date(recommendations.generatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {recommendations.items.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRate={onMovieRate}
            showSimilarityScore={true}
          />
        ))}
      </div>
    </div>
  );
};