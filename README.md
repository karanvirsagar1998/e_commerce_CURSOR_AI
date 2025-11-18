# E-Commerce Website

A modern, responsive e-commerce website built with Spring Boot (backend) and React (frontend) featuring men's, women's, and kids' clothing.

## Features

- 🛍️ Product catalog with men's, women's, and kids' clothing
- 🔍 Category filtering (All, Men's, Women's, Kids)
- 🛒 Full shopping cart functionality
- ❤️ Wishlist feature
- 🔎 Product search functionality
- 💰 Price sorting (high to low, low to high)
- 🎨 Advanced filtering (price range, size, color)
- 📱 Fully responsive design
- 🎨 Modern and interactive UI with animated backgrounds
- ⚡ Fast and efficient with React and Spring Boot
- 🗄️ H2 in-memory database with real product data from APIs

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven 3.6 or higher

**👉 For detailed setup instructions, see [QUICK_START.md](QUICK_START.md)**

### Quick Setup

1. **Start Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

2. **Start Frontend (new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Open Browser:** Navigate to `http://localhost:5173`

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products?category=MEN` - Get products by category (MEN, WOMEN, KIDS)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/categories` - Get all categories

## Project Structure

```
e-commerce/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/ecommerce/
│   │       │   ├── model/Product.java
│   │       │   ├── repository/ProductRepository.java
│   │       │   ├── controller/ProductController.java
│   │       │   └── config/DataInitializer.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── ProductCard.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Features in Detail

- **Product Listing**: View all products in a responsive grid layout
- **Category Filtering**: Filter products by Men's or Women's clothing
- **Product Cards**: Interactive cards with hover effects, images, and product details
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Stock Management**: Visual indicators for low stock and out-of-stock items

## Development

The application uses H2 in-memory database which is automatically populated with product data on startup. The data includes:
- 6 Men's clothing items
- 6 Women's clothing items
- 6 Kids' clothing items

**Total: 18 products**

### Additional Features:
- **Product Detail Pages**: Click on any product to view detailed information with image carousel
- **Shopping Cart**: Add items to cart, view cart, update quantities, and proceed to checkout
- **Wishlist**: Save favorite products for later
- **Search**: Search products by name
- **Enhanced Filters**: Filter by price range, size, and color
- **Real Product Images**: Products use images from Unsplash, Pexels, and other sources

You can access the H2 console at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:ecommerce`)

## Technologies & APIs Used

- **Product Data Sources**: FakeStore API, DummyJSON API
- **Image Sources**: Unsplash, Pexels, Zara, SportChek, Deux par Deux

