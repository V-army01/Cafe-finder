package com.cafefinder.controller;

import com.cafefinder.model.Cafe;
import com.cafefinder.service.CafeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cafes")
@CrossOrigin(origins = "*")
public class CafeController {

    private final CafeService cafeService;

    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Cafe>> search(
            @RequestParam String area,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Double maxDistance,
            @RequestParam(required = false, defaultValue = "distance") String sortBy) {

        List<Cafe> results = cafeService.searchCafes(area, minRating, maxPrice, maxDistance, sortBy);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cafe> getById(@PathVariable String id) {
        return cafeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/specials")
    public ResponseEntity<List<Cafe>> getSpecials(@RequestParam String area) {
        return ResponseEntity.ok(cafeService.getCafesWithSpecials(area));
    }

    @PostMapping
    public ResponseEntity<Cafe> create(@RequestBody Cafe cafe) {
        return ResponseEntity.ok(cafeService.save(cafe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cafe> update(@PathVariable String id, @RequestBody Cafe cafe) {
        return cafeService.findById(id)
                .map(existing -> {
                    cafe.setId(id);
                    return ResponseEntity.ok(cafeService.save(cafe));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (cafeService.findById(id).isPresent()) {
            cafeService.delete(id);
            return ResponseEntity.noContent().build(); // 204 response
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
