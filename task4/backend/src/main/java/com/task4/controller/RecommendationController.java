package com.task4.controller;

import com.task4.dto.RecommendationResponse;
import com.task4.dto.RatingRequest;
import com.task4.dto.SimilarItemsResponse;
import com.task4.service.RecommendationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
@Tag(name = "Recommendations", description = "Movie recommendation endpoints")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class RecommendationController {
    
    private final RecommendationService recommendationService;
    
    @GetMapping("/{userId}")
    @Operation(summary = "Get personalized recommendations for user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<RecommendationResponse> getRecommendations(@PathVariable Long userId) {
        return ResponseEntity.ok(recommendationService.getRecommendations(userId));
    }
    
    @GetMapping("/similar-items/{itemId}")
    @Operation(summary = "Get similar items for a movie")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SimilarItemsResponse> getSimilarItems(@PathVariable Long itemId) {
        return ResponseEntity.ok(recommendationService.getSimilarItems(itemId));
    }
    
    @PostMapping("/rate")
    @Operation(summary = "Rate a movie")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> rateMovie(@Valid @RequestBody RatingRequest request) {
        recommendationService.rateMovie(request);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/export/{userId}")
    @Operation(summary = "Export recommendations as CSV")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Resource> exportRecommendations(@PathVariable Long userId) {
        Resource resource = recommendationService.exportRecommendations(userId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=recommendations.csv")
                .contentType(MediaType.parseMediaType("application/csv"))
                .body(resource);
    }
}