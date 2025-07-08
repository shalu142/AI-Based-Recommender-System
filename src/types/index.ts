export interface User {
  id: number;
  username: string;
  email: string;
  preferences: string[];
  totalRatings: number;
}

export interface Movie {
  id: number;
  title: string;
  genre: string[];
  year: number;
  rating: number;
  posterUrl: string;
  description: string;
  userRating?: number;
  similarityScore?: number;
}

export interface Recommendation {
  userId: number;
  items: Movie[];
  generatedAt: string;
  algorithm: string;
  confidence: number;
}

export interface Rating {
  userId: number;
  movieId: number;
  rating: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface UploadDataRequest {
  file: File;
  type: 'ratings' | 'movies';
}

export interface SimilarItemsResponse {
  itemId: number;
  similarItems: Movie[];
  algorithm: string;
}