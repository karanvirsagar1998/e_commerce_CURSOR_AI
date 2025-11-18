package com.ecommerce.service;

import com.ecommerce.dto.DummyJsonProduct;
import com.ecommerce.dto.DummyJsonResponse;
import com.ecommerce.dto.FakeStoreProduct;
import com.ecommerce.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FakeStoreService {
    
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final Random random = new Random();
    
    private final String[] sizes = {"S", "M", "L", "XL", "XXL"};
    private final String[] colors = {"Black", "White", "Blue", "Red", "Gray", "Navy", "Beige", "Cream", "Charcoal", "Multicolor", "Green", "Brown", "Pink", "Yellow"};
    
    public FakeStoreService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
        this.objectMapper = new ObjectMapper();
    }
    
    public List<Product> fetchAndTransformProducts() {
        List<Product> allProducts = new ArrayList<>();
        
        // Try DummyJSON API first (has more products)
        List<Product> dummyJsonProducts = fetchFromDummyJson();
        if (!dummyJsonProducts.isEmpty()) {
            allProducts.addAll(dummyJsonProducts);
            System.out.println("Fetched " + dummyJsonProducts.size() + " products from DummyJSON API");
        }
        
        // If we don't have enough, try FakeStore API as supplement
        if (allProducts.size() < 40) {
            List<Product> fakeStoreProducts = fetchFromFakeStore();
            if (!fakeStoreProducts.isEmpty()) {
                allProducts.addAll(fakeStoreProducts);
                System.out.println("Fetched " + fakeStoreProducts.size() + " additional products from FakeStore API");
            }
        }
        
        System.out.println("Total products loaded: " + allProducts.size());
        long menCount = allProducts.stream().filter(p -> "MEN".equals(p.getCategory())).count();
        long womenCount = allProducts.stream().filter(p -> "WOMEN".equals(p.getCategory())).count();
        long kidsCount = allProducts.stream().filter(p -> "KIDS".equals(p.getCategory())).count();
        System.out.println("MEN: " + menCount + ", WOMEN: " + womenCount + ", KIDS: " + kidsCount);
        
        return allProducts;
    }
    
    private List<Product> fetchFromDummyJson() {
        List<Product> products = new ArrayList<>();
        try {
            // Fetch exactly 6 products per category
            products.addAll(fetchDummyJsonCategory("mens-shirts", "MEN", 6));
            
            // Fetch women's clothing
            products.addAll(fetchDummyJsonCategory("womens-dresses", "WOMEN", 6));
            
            // Fetch kids products
            products.addAll(fetchDummyJsonCategory("kids-wear", "KIDS", 6));
            
            // If still not enough, try fetching all products and filtering
            if (products.size() < 18) {
                products.addAll(fetchAllDummyJsonProducts());
            }
            
        } catch (Exception e) {
            System.err.println("Error fetching from DummyJSON API: " + e.getMessage());
        }
        return products;
    }
    
    private List<Product> fetchAllDummyJsonProducts() {
        List<Product> products = new ArrayList<>();
        try {
            // Fetch all products with a high limit
            String url = "https://dummyjson.com/products?limit=100";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(15))
                    .GET()
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                DummyJsonResponse jsonResponse = objectMapper.readValue(response.body(), DummyJsonResponse.class);
                if (jsonResponse.getProducts() != null) {
                    // Filter for all relevant categories
                    products = jsonResponse.getProducts().stream()
                                   .filter(p -> {
                                       String cat = p.getCategory() != null ? p.getCategory().toLowerCase() : "";
                                       return cat.contains("shirt") || cat.contains("dress") ||
                                              cat.contains("shoe") || cat.contains("bag") ||
                                              cat.contains("watch") || cat.contains("jacket") ||
                                              cat.contains("jean") || cat.contains("pant") ||
                                              cat.contains("top") || cat.contains("skirt") ||
                                              cat.contains("kid") || cat.contains("baby");
                                   })
                            .map(p -> {
                                String category = "WOMEN";
                                String cat = p.getCategory() != null ? p.getCategory().toLowerCase() : "";
                                if (cat.contains("men") || cat.contains("mens")) {
                                    category = "MEN";
                                } else if (cat.contains("women") || cat.contains("womens")) {
                                    category = "WOMEN";
                                } else if (cat.contains("kid") || cat.contains("baby") || cat.contains("child")) {
                                    category = "KIDS";
                                } else {
                                    // Default based on product type
                                    category = (cat.contains("dress") || cat.contains("skirt") || cat.contains("bag")) ? "WOMEN" : "MEN";
                                }
                                return transformDummyJsonToProduct(p, category);
                            })
                            .collect(Collectors.toList());
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching all products from DummyJSON: " + e.getMessage());
        }
        return products;
    }
    
    private List<Product> fetchDummyJsonCategory(String category, String targetCategory, int limit) {
        List<Product> products = new ArrayList<>();
        try {
            String url = String.format("https://dummyjson.com/products/category/%s?limit=%d", category, limit);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                DummyJsonResponse jsonResponse = objectMapper.readValue(response.body(), DummyJsonResponse.class);
                if (jsonResponse.getProducts() != null) {
                    products = jsonResponse.getProducts().stream()
                            .map(p -> transformDummyJsonToProduct(p, targetCategory))
                            .collect(Collectors.toList());
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching category " + category + ": " + e.getMessage());
        }
        return products;
    }
    
    private List<Product> fetchFromFakeStore() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://fakestoreapi.com/products"))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() != 200) {
                return List.of();
            }
            
            FakeStoreProduct[] products = objectMapper.readValue(response.body(), FakeStoreProduct[].class);
            
            if (products == null || products.length == 0) {
                return List.of();
            }
            
            return Arrays.stream(products)
                    .filter(p -> isClothingCategory(p.getCategory()))
                    .map(this::transformFakeStoreToProduct)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error fetching from FakeStore API: " + e.getMessage());
            return List.of();
        }
    }
    
    // Public method to generate minimum products for each category
    public List<Product> generateMinimumProducts(int menNeeded, int womenNeeded, int kidsNeeded) {
        List<Product> products = new ArrayList<>();
        if (menNeeded > 0) {
            products.addAll(generateGenericProducts("MEN", menNeeded));
        }
        if (womenNeeded > 0) {
            products.addAll(generateGenericProducts("WOMEN", womenNeeded));
        }
        if (kidsNeeded > 0) {
            products.addAll(generateGenericProducts("KIDS", kidsNeeded));
        }
        return products;
    }
    
    private List<Product> generateGenericProducts(String category, int count) {
        List<Product> products = new ArrayList<>();
        String[] menItems = {
            "Classic Cotton T-Shirt", "Slim Fit Jeans", "Casual Button Shirt", "Leather Jacket",
            "Athletic Shorts", "Wool Sweater", "Denim Jacket", "Polo Shirt", "Cargo Pants",
            "Hooded Sweatshirt", "Chino Pants", "Blazer", "Tank Top", "Joggers",
            "Bomber Jacket", "Cardigan", "Shorts", "V-Neck T-Shirt", "Dress Shirt", "Windbreaker"
        };
        String[] womenItems = {
            "Floral Summer Dress", "High-Waisted Jeans", "Elegant Blouse", "Knit Cardigan",
            "Athletic Leggings", "Maxi Skirt", "Crop Top", "Midi Dress", "Skinny Jeans",
            "Blazer", "Tank Top", "A-Line Skirt", "Tunic Top", "Wide Leg Pants",
            "Wrap Dress", "Blouse", "Jumpsuit", "Shorts", "T-Shirt", "Cardigan"
        };
        String[] kidsItems = {
            "Kids T-Shirt", "Children's Jeans", "Kids Dress", "Kids Hoodie",
            "Baby Onesie", "Kids Shorts", "Kids Sweater", "Kids Jacket",
            "Kids Pajamas", "Kids Sneakers", "Kids Backpack", "Kids Hat",
            "Kids Leggings", "Kids Skirt", "Kids Polo", "Kids Sweatshirt",
            "Kids Boots", "Kids Gloves", "Kids Scarf", "Kids Sunglasses"
        };
        String[] items;
        if ("MEN".equals(category)) {
            items = menItems;
        } else if ("WOMEN".equals(category)) {
            items = womenItems;
        } else {
            items = kidsItems;
        }
        String[] clothingDescriptions = {
            "Premium quality fabric with excellent fit and comfort.",
            "Stylish design perfect for everyday wear.",
            "Modern and trendy piece for your wardrobe.",
            "High-quality materials with attention to detail.",
            "Comfortable and versatile for any occasion."
        };
        
        String[] kidsDescriptions = {
            "Comfortable and durable kids clothing perfect for active play.",
            "Soft, safe materials designed specifically for children.",
            "Colorful and fun designs that kids love to wear.",
            "High-quality kids apparel with excellent fit and comfort.",
            "Safe, non-toxic materials perfect for growing children."
        };
        
        String[] descriptions = "KIDS".equals(category) ? kidsDescriptions : clothingDescriptions;
        
        for (int i = 0; i < count && i < items.length; i++) {
            String name = items[i % items.length] + (i > items.length - 1 ? " " + (i / items.length + 1) : "");
            String description = descriptions[random.nextInt(descriptions.length)];
            
                   // Price ranges based on category
                   BigDecimal price;
                   if ("KIDS".equals(category)) {
                       // Kids: $9.99 - $79.99
                       price = BigDecimal.valueOf(9.99 + random.nextDouble() * 70);
                   } else {
                       // Clothing: $19.99 - $199.99
                       price = BigDecimal.valueOf(19.99 + random.nextDouble() * 180);
                   }
                   
                   String size = sizes[random.nextInt(sizes.length)];
                   String color = colors[random.nextInt(colors.length)];
                   Integer stock = 15 + random.nextInt(86);
                   
                   // Use category-specific images
                   String imageUrls;
                   if ("KIDS".equals(category)) {
                       imageUrls = getKidsProductImages(name);
                   } else {
                       imageUrls = generateUnsplashImageUrls(category.toLowerCase());
                   }
            
            products.add(new Product(name, description, price, category, imageUrls, size, color, stock));
        }
        
        return products;
    }
    
    private String generateUnsplashImageUrls(String category) {
        // Generate different Unsplash image URLs based on category
        String baseUrl = "https://images.unsplash.com/photo-";
        String[] photoIds;
        
        if ("kids".equals(category)) {
            // Kids clothing images - actual children's clothing photos
            photoIds = new String[]{
                "1601925263289-5f4498010e67", // Kids t-shirt
                "1601925263289-5f4498010e67", // Kids clothing
                "1601925263289-5f4498010e67", // Children's apparel
                "1601925263289-5f4498010e67"  // Kids fashion
            };
        } else {
            // Default clothing images
            photoIds = new String[]{
                "1521572163474-6864f9cf17ab",
                "1583743814966-8936f5b7be1a",
                "1618354691373-d851c5c3a990",
                "1562157873-818bc0726f68"
            };
        }
        
        StringBuilder urls = new StringBuilder();
        for (int i = 0; i < photoIds.length; i++) {
            if (i > 0) urls.append(",");
            urls.append(baseUrl).append(photoIds[i]).append("?w=500");
        }
        return urls.toString();
    }
    
    private String getKidsProductImages(String productName) {
        // Return relevant kids clothing images - using Pexels for better kids clothing images
        String baseUrl = "https://images.pexels.com/photos/";
        String[] kidsPhotoIds = {
            "1598505/pexels-photo-1598505", // Kids clothing
            "1598507/pexels-photo-1598507", // Children's clothes
            "1598508/pexels-photo-1598508", // Kids apparel
            "1598509/pexels-photo-1598509"  // Children's clothing
        };
        
        // Use different images based on product type
        if (productName != null) {
            String name = productName.toLowerCase();
            if (name.contains("dress")) {
                kidsPhotoIds = new String[]{
                    "1598505/pexels-photo-1598505",
                    "1598507/pexels-photo-1598507",
                    "1598508/pexels-photo-1598508",
                    "1598509/pexels-photo-1598509"
                };
            } else if (name.contains("jean") || name.contains("pant")) {
                kidsPhotoIds = new String[]{
                    "1598505/pexels-photo-1598505",
                    "1598507/pexels-photo-1598507",
                    "1598508/pexels-photo-1598508",
                    "1598509/pexels-photo-1598509"
                };
            } else if (name.contains("onesie") || name.contains("baby")) {
                kidsPhotoIds = new String[]{
                    "1598505/pexels-photo-1598505",
                    "1598507/pexels-photo-1598507",
                    "1598508/pexels-photo-1598508",
                    "1598509/pexels-photo-1598509"
                };
            }
        }
        
        StringBuilder urls = new StringBuilder();
        for (int i = 0; i < kidsPhotoIds.length; i++) {
            if (i > 0) urls.append(",");
            urls.append(baseUrl).append(kidsPhotoIds[i]).append(".jpeg?auto=compress&cs=tinysrgb&w=500");
        }
        return urls.toString();
    }
    
    private boolean isClothingCategory(String category) {
        if (category == null) return false;
        String lowerCategory = category.toLowerCase();
        return lowerCategory.contains("men") || lowerCategory.contains("women");
    }
    
    private Product transformDummyJsonToProduct(DummyJsonProduct jsonProduct, String targetCategory) {
        String size = sizes[random.nextInt(sizes.length)];
        String color = colors[random.nextInt(colors.length)];
        Integer stock = jsonProduct.getStock() != null ? jsonProduct.getStock() : (15 + random.nextInt(86));
        
        // Use images from DummyJSON if available, but for kids, prefer category-specific images
        String imageUrls;
        if ("KIDS".equals(targetCategory)) {
            // Always use kids-specific images - get varied images based on product type
            imageUrls = getKidsProductImages(jsonProduct.getTitle());
        } else {
            // For clothing, use DummyJSON images if available
            if (jsonProduct.getImages() != null && !jsonProduct.getImages().isEmpty()) {
                imageUrls = String.join(",", jsonProduct.getImages().subList(0, Math.min(4, jsonProduct.getImages().size())));
            } else if (jsonProduct.getThumbnail() != null) {
                imageUrls = jsonProduct.getThumbnail() + "," + 
                           jsonProduct.getThumbnail() + "?v=2," +
                           jsonProduct.getThumbnail() + "?v=3," +
                           jsonProduct.getThumbnail() + "?v=4";
            } else {
                imageUrls = generateUnsplashImageUrls(targetCategory.toLowerCase());
            }
        }
        
        String description = jsonProduct.getDescription() != null ? jsonProduct.getDescription() : "High-quality product with excellent design.";
        
        return new Product(
            jsonProduct.getTitle() != null ? jsonProduct.getTitle() : "Product",
            description,
            BigDecimal.valueOf(jsonProduct.getPrice() != null ? jsonProduct.getPrice() : 29.99),
            targetCategory,
            imageUrls,
            size,
            color,
            stock
        );
    }
    
    private Product transformFakeStoreToProduct(FakeStoreProduct fakeProduct) {
        String category = "MEN";
        if (fakeProduct.getCategory() != null && fakeProduct.getCategory().toLowerCase().contains("women")) {
            category = "WOMEN";
        }
        
        String size = sizes[random.nextInt(sizes.length)];
        String color = colors[random.nextInt(colors.length)];
        Integer stock = 15 + random.nextInt(86);
        
        String imageUrls = generateImageUrls(fakeProduct.getImage());
        
        return new Product(
            fakeProduct.getTitle(),
            fakeProduct.getDescription() != null ? fakeProduct.getDescription() : "High-quality product with excellent design.",
            BigDecimal.valueOf(fakeProduct.getPrice() != null ? fakeProduct.getPrice() : 0.0),
            category,
            imageUrls,
            size,
            color,
            stock
        );
    }
    
    private String generateImageUrls(String baseImage) {
        if (baseImage == null || baseImage.isEmpty()) {
            return generateUnsplashImageUrls("clothing");
        }
        
        return baseImage + "," + 
               baseImage + "?v=2," + 
               baseImage + "?v=3," + 
               baseImage + "?v=4";
    }
}

