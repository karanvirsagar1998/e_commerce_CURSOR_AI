# Quick Start Guide

Get the e-commerce application running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17+ (`java -version`)
- ✅ Maven 3.6+ (`mvn -version`)
- ✅ Node.js 18+ (`node -v`)

If not installed, see [SETUP.md](SETUP.md) for installation instructions.

---

## 🚀 Quick Start (3 Steps)

### Step 1: Start Backend
```bash
cd backend
mvn spring-boot:run
```

**Wait for:** `Started EcommerceApplication in X.XXX seconds`

### Step 2: Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

**Wait for:** `Local: http://localhost:5173`

### Step 3: Open Browser
Navigate to: **http://localhost:5173**

---

## ✅ Verify It's Working

1. **Backend is running:**
   - Open: http://localhost:8080/api/products
   - Should see JSON array of products

2. **Frontend is running:**
   - Open: http://localhost:5173
   - Should see product grid with 18 products

3. **Test Features:**
   - Click on categories (Men, Women, Kids)
   - Search for products
   - Add items to cart
   - View product details

---

## 🐛 Troubleshooting

### Backend Issues:
- **Port 8080 in use?** Change port in `backend/src/main/resources/application.properties`
- **Java version wrong?** Must be Java 17 or higher
- **Maven not found?** Add Maven to PATH (see SETUP.md)

### Frontend Issues:
- **Port 5173 in use?** Vite will auto-select next port
- **npm install fails?** Try: `npm cache clean --force` then `npm install`
- **Products not loading?** Make sure backend is running first!

### Common Errors:
- **"Failed to load products"** → Backend not running or wrong port
- **CORS errors** → Backend CORS configured for localhost:5173
- **Images not loading** → Requires internet connection (external CDN)

---

## 📚 More Information

- **Detailed Setup:** See [SETUP.md](SETUP.md)
- **Full Documentation:** See [README.md](README.md)
- **Verification:** See [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)

---

## 🎯 What to Expect

- **18 Products Total:**
  - 6 Men's clothing items
  - 6 Women's clothing items
  - 6 Kids' clothing items

- **Features Available:**
  - Category filtering
  - Product search
  - Price sorting
  - Advanced filters (price, size, color)
  - Shopping cart
  - Wishlist
  - Product details
  - Checkout process

---

**Need Help?** Check the troubleshooting section in [SETUP.md](SETUP.md) or [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)

