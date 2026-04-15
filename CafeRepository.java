package com.cafefinder.repository;

import com.cafefinder.model.Cafe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CafeRepository extends MongoRepository<Cafe, String> {
    List<Cafe> findByAreaIgnoreCase(String area);
}
