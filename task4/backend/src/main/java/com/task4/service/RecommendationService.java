package com.task4.service;

import com.task4.dto.MovieDto;
import com.task4.dto.RecommendationResponse;
import com.task4.dto.RatingRequest;
import com.task4.dto.SimilarItemsResponse;
import com.task4.model.Movie;
import com.task4.model.Rating;
import com.task4.model.User;
import com.task4.recommendation.MahoutRecommendationEngine;
import com.task4.repository.MovieRepository;
import com.task4.repository.RatingRepository;
import com.task4.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.StringWriter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {
    
    private final MahoutRecommendationEngine recommendationEngine;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final RatingRepository ratingRepository;
    
    public RecommendationResponse getRecommendations(Long userId) {
        log.info("Getting recommendations for user: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Long> recommendedMovieIds = recommendationEngine.recommend(userId, 10);
        List<Movie> recommendedMovies = movieRepository.findAllById(recommendedMovieIds);
        
        List<MovieDto> movieDtos = recommendedMovies.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return RecommendationResponse.builder()
                .userId(userId)
                .movies(movieDtos)
                .algorithm("Item-Based Collaborative Filtering")
                .confidence(0.85)
                .generatedAt(LocalDateTime.now())
                .build();
    }
    
    public SimilarItemsResponse getSimilarItems(Long itemId) {
        log.info("Getting similar items for movie: {}", itemId);
        
        Movie movie = movieRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        
        List<Long> similarMovieIds = recommendationEngine.findSimilarItems(itemId, 5);
        List<Movie> similarMovies = movieRepository.findAllById(similarMovieIds);
        
        List<MovieDto> movieDtos = similarMovies.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return SimilarItemsResponse.builder()
                .itemId(itemId)
                .similarItems(movieDtos)
                .algorithm("Item-Based Similarity")
                .build();
    }
    
    @Transactional
    public void rateMovie(RatingRequest request) {
        log.info("Rating movie {} by user {} with rating {}", 
                request.getMovieId(), request.getUserId(), request.getRating());
        
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        
        Rating existingRating = ratingRepository.findByUserIdAndMovieId(
                request.getUserId(), request.getMovieId());
        
        if (existingRating != null) {
            existingRating.setRating(request.getRating());
            ratingRepository.save(existingRating);
        } else {
            Rating newRating = Rating.builder()
                    .user(user)
                    .movie(movie)
                    .rating(request.getRating())
                    .build();
            ratingRepository.save(newRating);
        }
        
        // Update movie average rating
        movie.updateRating(request.getRating());
        movieRepository.save(movie);
        
        // Retrain recommendation model
        recommendationEngine.retrain();
    }
    
    public Resource exportRecommendations(Long userId) {
        RecommendationResponse recommendations = getRecommendations(userId);
        
        StringWriter writer = new StringWriter();
        writer.append("Title,Genres,Year,Rating,Description\n");
        
        for (MovieDto movie : recommendations.getMovies()) {
            writer.append(String.format("\"%s\",\"%s\",%d,%.1f,\"%s\"\n",
                    movie.getTitle(),
                    String.join("; ", movie.getGenres()),
                    movie.getReleaseYear(),
                    movie.getAverageRating(),
                    movie.getDescription().replace("\"", "\"\"")));
        }
        
        return new ByteArrayResource(writer.toString().getBytes());
    }
    
    private MovieDto convertToDto(Movie movie) {
        return MovieDto.builder()
                .id(movie.getId())
                .title(movie.getTitle())
                .genres(movie.getGenres())
                .releaseYear(movie.getReleaseYear())
                .averageRating(movie.getAverageRating())
                .posterUrl(movie.getPosterUrl())
                .description(movie.getDescription())
                .build();
    }
}