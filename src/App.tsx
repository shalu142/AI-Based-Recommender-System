import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RecommendationSection } from './components/RecommendationSection';
import { AdminPanel } from './components/AdminPanel';
import { SimilarItems } from './components/SimilarItems';
import { UserProfile } from './components/UserProfile';
import { MovieCard } from './components/MovieCard';
import { User } from './types';
import { apiService } from './services/api';
import { mockUser, mockMovies } from './data/mockData';

type TabType = 'recommendations' | 'admin' | 'similar' | 'profile' | 'search';

function App() {
  const [user, setUser] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<TabType>('recommendations');
  const [searchResults, setSearchResults] = useState(mockMovies.slice(0, 3));
  const [selectedMovieId, setSelectedMovieId] = useState<number>(1);
  const [recentRatings, setRecentRatings] = useState(5);

  const handleMovieRate = async (movieId: number, rating: number) => {
    try {
      await apiService.rateMovie(user.id, movieId, rating);
      setRecentRatings(prev => prev + 1);
    } catch (error) {
      console.error('Failed to rate movie:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await apiService.searchMovies(query);
      setSearchResults(results);
      if (results.length > 0) {
        setActiveTab('search');
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  useEffect(() => {
    // Load user data on component mount
    const loadUserData = async () => {
      try {
        const userData = await apiService.getUser(user.id);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header user={user} onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'recommendations'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Recommendations
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('similar')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'similar'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Similar Items
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'admin'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Content */}
        {activeTab === 'recommendations' && (
          <RecommendationSection userId={user.id} onMovieRate={handleMovieRate} />
        )}
        
        {activeTab === 'profile' && (
          <UserProfile user={user} recentRatings={recentRatings} />
        )}
        
        {activeTab === 'similar' && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select a movie to find similar items:
              </label>
              <select
                value={selectedMovieId}
                onChange={(e) => setSelectedMovieId(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                {mockMovies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title} ({movie.year})
                  </option>
                ))}
              </select>
            </div>
            <SimilarItems itemId={selectedMovieId} onMovieRate={handleMovieRate} />
          </div>
        )}
        
        {activeTab === 'admin' && <AdminPanel />}
        
        {activeTab === 'search' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onRate={handleMovieRate}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;