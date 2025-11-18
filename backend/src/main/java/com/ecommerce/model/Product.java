package com.ecommerce.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String category; // "MEN" or "WOMEN"

    @Column(nullable = false, length = 2000)
    private String imageUrls; // Comma-separated list of image URLs

    @Column(nullable = false)
    private String size; // "S", "M", "L", "XL", etc.

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer stock;

    public Product() {}

    public Product(String name, String description, BigDecimal price, String category, 
                   String imageUrls, String size, String color, Integer stock) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrls = imageUrls;
        this.size = size;
        this.color = color;
        this.stock = stock;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }
    
    // Backward compatibility - returns first image
    public String getImageUrl() {
        if (imageUrls != null && !imageUrls.isEmpty()) {
            String[] urls = imageUrls.split(",");
            return urls[0].trim();
        }
        return "";
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }
}

