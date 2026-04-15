package com.cafefinder.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Document(collection = "cafes")
public class Cafe {

    @Id
    private String id;

    private String name;

    @Indexed
    private String area;

    private String city;
    private String address;
    private double rating;
    private int priceForTwo;
    private double distanceKm;
    private String timings;
    private String imageUrl;
    private List<String> tags;
    private List<MenuItem> menu;
    private TodaySpecial todaySpecial;

    public Cafe() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getPriceForTwo() { return priceForTwo; }
    public void setPriceForTwo(int priceForTwo) { this.priceForTwo = priceForTwo; }

    public double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(double distanceKm) { this.distanceKm = distanceKm; }

    public String getTimings() { return timings; }
    public void setTimings(String timings) { this.timings = timings; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public List<MenuItem> getMenu() { return menu; }
    public void setMenu(List<MenuItem> menu) { this.menu = menu; }

    public TodaySpecial getTodaySpecial() { return todaySpecial; }
    public void setTodaySpecial(TodaySpecial todaySpecial) { this.todaySpecial = todaySpecial; }
}
