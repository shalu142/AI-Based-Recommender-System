import { Movie, User, Recommendation } from '../types';

export const mockUser: User = {
  id: 101,
  username: 'john_doe',
  email: 'john@example.com',
  preferences: ['Sci-Fi', 'Thriller', 'Drama'],
  totalRatings: 47
};

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Stranger Things',
    genre: ['Sci-Fi', 'Horror', 'Drama'],
    year: 2016,
    rating: 8.7,
    posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
    userRating: 5,
    trailerUrl: 'https://www.youtube.com/watch?v=mnd7sFt5c3A'
  }
  {
    id: 2,
    title: 'Breaking Bad',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2008,
    rating: 9.5,
    posterUrl: 'https://images.pexels.com/photos/4668509/pexels-photo-4668509.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing meth.',
    userRating: 4,
    trailerUrl: 'https://www.youtube.com/watch?v=ceqOTZnhgp8'
  }
  {
    id: 3,
    title: 'Dark',
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    year: 2017,
    rating: 8.8,
    posterUrl: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes double lives.',
    userRating: 5,
    trailerUrl: 'https://www.youtube.com/watch?v=ESEUoa-mz2c'
  }
  {
    id: 4,
    title: 'Mindhunter',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    rating: 8.6,
    posterUrl: 'https://images.pexels.com/photos/7991668/pexels-photo-7991668.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Set in the late 1970s, two FBI agents are tasked with interviewing serial killers to solve open cases.',
    similarityScore: 0.87,
    trailerUrl: 'https://www.youtube.com/watch?v=oQ2cBbN6YWs'
  }
  {
    id: 5,
    title: 'The Witcher',
    genre: ['Fantasy', 'Adventure', 'Drama'],
    year: 2019,
    rating: 8.2,
    posterUrl: 'https://images.pexels.com/photos/7991436/pexels-photo-7991436.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    similarityScore: 0.82,
    trailerUrl: 'https://www.youtube.com/watch?v=eb6gLt-dqIw'
  }
  {
    id: 6,
    title: 'Money Heist',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2017,
    rating: 8.3,
    posterUrl: 'https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.',
    similarityScore: 0.79,
    trailerUrl: 'https://www.youtube.com/watch?v=htqXL94Rza4'
  }
  {
    id: 7,
    title: 'Narcos',
    genre: ['Biography', 'Crime', 'Drama'],
    year: 2015,
    rating: 8.8,
    posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.',
    similarityScore: 0.85
  },
  {
    id: 8,
    title: 'Westworld',
    genre: ['Sci-Fi', 'Western', 'Drama'],
    year: 2016,
    rating: 8.6,
    posterUrl: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    similarityScore: 0.81,
    trailerUrl: 'https://www.youtube.com/watch?v=IuS5huqOND4'
    trailerUrl: 'https://www.youtube.com/watch?v=xl8zdCY-abw'
  }
];

export const mockRecommendations: Recommendation = {
  userId: 101,
  items: mockMovies.slice(3, 8),
  generatedAt: new Date().toISOString(),
  algorithm: 'Item-Based Collaborative Filtering',
  confidence: 0.89
};