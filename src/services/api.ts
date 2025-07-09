import { ApiResponse, Movie, Recommendation, SimilarItemsResponse, User } from '../types';
import { mockUser, mockMovies, mockRecommendations } from '../data/mockData';

// Mock API service - replace with actual API calls to your Spring Boot backend
class ApiService {
  private baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  // Simulate API delay
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getUser(userId: number): Promise<User> {
    await this.delay(500);
    return mockUser;
  }

  async getRecommendations(userId: number): Promise<Recommendation> {
    await this.delay(800);
    return mockRecommendations;
  }

  async getSimilarItems(itemId: number): Promise<SimilarItemsResponse> {
    await this.delay(600);
    const currentMovie = mockMovies.find(m => m.id === itemId);
    const similarMovies = mockMovies.filter(m => m.id !== itemId && m.similarityScore).slice(0, 5);
    
    return {
      itemId,
      similarItems: similarMovies,
      algorithm: 'Item-Based Similarity'
    };
  }

  async uploadData(file: File, type: 'ratings' | 'movies'): Promise<ApiResponse<string>> {
    await this.delay(2000);
    return {
      data: `${file.name} uploaded successfully`,
      message: `${type} data processed and model updated`,
      success: true
    };
  }

  async exportRecommendations(userId: number, format: 'csv' | 'json'): Promise<Blob> {
    await this.delay(1000);
    const recommendations = await this.getRecommendations(userId);
    
    if (format === 'csv') {
      const csv = [
        'Title,Genre,Year,Rating,Similarity Score',
        ...recommendations.items.map(item => 
          `"${item.title}","${item.genre.join('; ')}",${item.year},${item.rating},${item.similarityScore || 'N/A'}`
        )
      ].join('\n');
      
      return new Blob([csv], { type: 'text/csv' });
    } else {
      return new Blob([JSON.stringify(recommendations, null, 2)], { type: 'application/json' });
    }
  }

  async rateMovie(userId: number, movieId: number, rating: number): Promise<ApiResponse<string>> {
    await this.delay(300);
    return {
      data: 'Rating submitted',
      message: 'Your rating has been recorded and will improve future recommendations',
      success: true
    };
  }

  async searchMovies(query: string): Promise<Movie[]> {
    await this.delay(400);
    return mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

export const apiService = new ApiService();