import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

// Types
export interface Movie {
  id: number;
  title: string;
  genres: string[];
  releaseYear: number;
  averageRating: number;
  posterUrl: string;
  description: string;
  userRating?: number;
  similarityScore?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  preferences: string[];
  totalRatings: number;
  createdAt: string;
}

export interface RecommendationResponse {
  userId: number;
  movies: Movie[];
  algorithm: string;
  confidence: number;
  generatedAt: string;
}

export interface SimilarItemsResponse {
  itemId: number;
  similarItems: Movie[];
  algorithm: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  preferences?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

export interface RatingRequest {
  userId: number;
  movieId: number;
  rating: number;
}

// API Service
export const apiService = {
  // Authentication
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', userData);
    return response.data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/refresh');
    return response.data;
  },

  // Recommendations
  async getRecommendations(userId: number): Promise<RecommendationResponse> {
    const response: AxiosResponse<RecommendationResponse> = await api.get(`/recommend/${userId}`);
    return response.data;
  },

  async getSimilarItems(itemId: number): Promise<SimilarItemsResponse> {
    const response: AxiosResponse<SimilarItemsResponse> = await api.get(`/recommend/similar-items/${itemId}`);
    return response.data;
  },

  async rateMovie(ratingData: RatingRequest): Promise<void> {
    await api.post('/recommend/rate', ratingData);
  },

  async exportRecommendations(userId: number): Promise<Blob> {
    const response: AxiosResponse<Blob> = await api.get(`/recommend/export/${userId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Movies
  async searchMovies(query: string): Promise<Movie[]> {
    const response: AxiosResponse<Movie[]> = await api.get(`/movies/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  async getMovie(id: number): Promise<Movie> {
    const response: AxiosResponse<Movie> = await api.get(`/movies/${id}`);
    return response.data;
  },

  async getTrendingMovies(): Promise<Movie[]> {
    const response: AxiosResponse<Movie[]> = await api.get('/movies/trending');
    return response.data;
  },

  // Admin
  async uploadData(file: File, type: 'ratings' | 'movies'): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response: AxiosResponse<{ message: string }> = await api.post('/admin/upload-data', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getAnalytics(): Promise<any> {
    const response: AxiosResponse<any> = await api.get('/admin/analytics');
    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await api.get('/admin/users');
    return response.data;
  },
};

export default api;