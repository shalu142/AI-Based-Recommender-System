package com.task4.recommendation;

import com.task4.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.ThresholdUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class MahoutRecommendationEngine {
    
    private final DataSource dataSource;
    private final RatingRepository ratingRepository;
    
    @Value("${mahout.similarity-threshold:0.5}")
    private double similarityThreshold;
    
    @Value("${mahout.max-recommendations:20}")
    private int maxRecommendations;
    
    private Recommender recommender;
    private DataModel dataModel;
    
    public List<Long> recommend(Long userId, int numRecommendations) {
        try {
            initializeRecommender();
            List<RecommendedItem> recommendations = recommender.recommend(
                    userId, Math.min(numRecommendations, maxRecommendations));
            
            return recommendations.stream()
                    .map(RecommendedItem::getItemID)
                    .collect(Collectors.toList());
                    
        } catch (TasteException e) {
            log.error("Error generating recommendations for user {}: {}", userId, e.getMessage());
            return List.of();
        }
    }
    
    public List<Long> findSimilarItems(Long itemId, int numSimilar) {
        try {
            initializeRecommender();
            
            if (recommender instanceof GenericItemBasedRecommender itemBasedRecommender) {
                long[] similarItems = itemBasedRecommender.mostSimilarItems(
                        itemId, Math.min(numSimilar, maxRecommendations));
                
                return List.of(similarItems).stream()
                        .map(Long::valueOf)
                        .collect(Collectors.toList());
            }
            
            return List.of();
            
        } catch (TasteException e) {
            log.error("Error finding similar items for item {}: {}", itemId, e.getMessage());
            return List.of();
        }
    }
    
    public void retrain() {
        log.info("Retraining recommendation model...");
        try {
            initializeRecommender();
            dataModel.refresh(null);
            log.info("Model retrained successfully");
        } catch (TasteException e) {
            log.error("Error retraining model: {}", e.getMessage());
        }
    }
    
    private void initializeRecommender() throws TasteException {
        if (dataModel == null) {
            // Create data model from database
            dataModel = new MySQLJDBCDataModel(
                    dataSource,
                    "ratings",
                    "user_id",
                    "movie_id",
                    "rating",
                    "created_at"
            );
        }
        
        if (recommender == null) {
            // Create item-based similarity
            ItemSimilarity similarity = new PearsonCorrelationSimilarity(dataModel);
            
            // Create item-based recommender
            recommender = new GenericItemBasedRecommender(dataModel, similarity);
        }
    }
}