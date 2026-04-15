package com.cafefinder.dto;

public class CafeFilterRequest {

    private String area;
    private Double minRating;
    private Integer maxPrice;
    private Double maxDistance;
    private String sortBy;

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public Double getMinRating() { return minRating; }
    public void setMinRating(Double minRating) { this.minRating = minRating; }

    public Integer getMaxPrice() { return maxPrice; }
    public void setMaxPrice(Integer maxPrice) { this.maxPrice = maxPrice; }

    public Double getMaxDistance() { return maxDistance; }
    public void setMaxDistance(Double maxDistance) { this.maxDistance = maxDistance; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }
}
