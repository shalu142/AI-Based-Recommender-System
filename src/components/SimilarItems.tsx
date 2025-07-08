import React, { useState, useEffect } from 'react';
import { GitBranch, Loader } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { SimilarItemsResponse } from '../types';
import { apiService } from '../services/api';

interface SimilarItemsProps {
  itemId: number;
  onMovieRate: (movieId: number, rating: number) => void;
}

export const SimilarItems: React.FC<SimilarItemsProps> = ({ itemId, onMovieRate }) => {
  const [similarItems, setSimilarItems] = useState<SimilarItemsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSimilarItems = async () => {
      try {
        setLoading(true);
        const data = await apiService.getSimilarItems(itemId);
        setSimilarItems(data);
      } catch (error) {
        console.error('Failed to load similar items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSimilarItems();
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!similarItems) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No similar items found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <GitBranch className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-white">Similar Items</h2>
        <span className="text-sm text-gray-400">({similarItems.algorithm})</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {similarItems.similarItems.map((movie) => (
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