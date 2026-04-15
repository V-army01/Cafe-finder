package com.cafefinder.service;

import com.cafefinder.model.Cafe;
import com.cafefinder.repository.CafeRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CafeService {

    private final CafeRepository cafeRepository;

    public CafeService(CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    public List<Cafe> searchCafes(String area, Double minRating,Integer maxPrice, Double maxDistance, String sortBy) {
        List<Cafe> cafes = cafeRepository.findByAreaIgnoreCase(area.trim());

        return cafes.stream()
                .filter(c -> minRating == null || c.getRating() >= minRating)
                .filter(c -> maxPrice == null || c.getPriceForTwo() <= maxPrice)
                .filter(c -> maxDistance == null || c.getDistanceKm() <= maxDistance)
                .sorted(getComparator(sortBy))
                .collect(Collectors.toList());
    }

    public Optional<Cafe> findById(String id) {
        return cafeRepository.findById(id);
    }

    public Cafe save(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    public void delete(String id) {
        cafeRepository.deleteById(id);
    }

    public List<Cafe> getCafesWithSpecials(String area) {
        return cafeRepository.findByAreaIgnoreCase(area).stream()
                .filter(c -> c.getTodaySpecial() != null)
                .sorted(Comparator.comparingDouble(Cafe::getDistanceKm))
                .collect(Collectors.toList());
    }

    private Comparator<Cafe> getComparator(String sortBy) {
        if (sortBy == null) return Comparator.comparingDouble(Cafe::getDistanceKm);
        return switch (sortBy.toLowerCase()) {
            case "rating" -> Comparator.comparingDouble(Cafe::getRating).reversed();
            case "price"  -> Comparator.comparingInt(Cafe::getPriceForTwo);
            default       -> Comparator.comparingDouble(Cafe::getDistanceKm);
        };
    }
}
