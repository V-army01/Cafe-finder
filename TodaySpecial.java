package com.cafefinder.model;

public class TodaySpecial {

    private String name;
    private String description;
    private int price;
    private int originalPrice;
    private String imageUrl;

    public TodaySpecial() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(int originalPrice) { this.originalPrice = originalPrice; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
