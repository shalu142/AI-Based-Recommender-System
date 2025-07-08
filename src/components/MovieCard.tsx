import React, { useState } from 'react';
import { Star, Play, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onRate: (movieId: number, rating: number) => void;
  showSimilarityScore?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate, showSimilarityScore = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [userRating, setUserRating] = useState(movie.userRating || 0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    onRate(movie.id, rating);
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        
        {showSimilarityScore && movie.similarityScore && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {Math.round(movie.similarityScore * 100)}% match
          </div>
        )}
        
        <div className={`absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center space-y-4">
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Play</span>
            </button>
            
            <div className="flex items-center justify-center space-x-2">
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <Plus className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <ThumbsUp className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <ThumbsDown className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-white mb-1 truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-2">{movie.year} • {movie.genre.join(', ')}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{movie.rating}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className={`w-4 h-4 ${star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-600'} hover:text-yellow-400 transition-colors`}
              >
                <Star className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-gray-400 text-xs line-clamp-3">{movie.description}</p>
      </div>
    </div>
  );
};