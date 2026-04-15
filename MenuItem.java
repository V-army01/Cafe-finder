package com.cafefinder.model;

public class MenuItem {

    private String item;
    private int price;

    public MenuItem() {}

    public MenuItem(String item, int price) {
        this.item = item;
        this.price = price;
    }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }
}
