# E-Commerce Application Development - Prompt History

This file contains all the prompts and requests used to build this e-commerce application.

## Development Timeline

### 1. Initial Cart Functionality
**Prompt:** "when I click on "Add to cart", I do not see any increment to counter near the Cart icon. can you fix that?"

### 2. Full Cart Implementation
**Prompt:** "also implement the full cart functioanlity, the counter is increasing now, but after clicking on cart, nothing opens. Based on your understanding and knowledge, you are free to use your resources to implement cart functioanlity, if you need to create some more coding designes, or need to add more pages, go ahead."

### 3. Price Sorting Filter
**Prompt:** "additionally, add a filter with following function:- 1. Sort price high to low and vice-versa"

### 4. Filter UI Positioning
**Prompt:** "put the Filter option parallel to th "All Products" title, put it on the extreme right side, and remove the "Sort By;" text, only use a stylish Sort icon"

### 5. Filter Icon Design
**Prompt:** "do not even use default, use one gear icon or any icon, and after clicking on the icon, it should says 2 filter option (Price: high to love and vice versa)"

### 6. Stylish Filter Icon
**Prompt:** "instead of using a Gear icon, search this on internet "stylish Filter icons for shopping website" and get a stylish icon"

### 7. Feature Recommendations
**Prompt:** "what else can you recommend which we can add on this app?"

### 8. Implement Recommended Features
**Prompt:** "Let's finish with Recommended starting points"

### 9. Real Product Data Integration
**Prompt:** "for the products, is it possible to use products from a real website, for example, Amazon, Myntra, Temu or any other clothing website?"

### 10. Proceed with Recommendations
**Prompt:** "Let's proceed with your Recommendation"

### 11. Backend Connection Issues (Multiple Attempts)
**Prompt:** "Failed to load products. Please make sure the backend is running." (appeared multiple times)

### 12. Fix Null Type Safety Error
**Prompt:** "For the code present, we get this error: ``` Null type safety: The expression of type 'Long' needs unchecked conversion to conform to '@NonNull Long' ``` Fix it, verify, and then give a concise explanation. @ProductController.java (29-32)"

### 13. Run Application
**Prompt:** "run the application"

### 14. Fix Kids and Technology Images
**Prompt:** "images in kids sections are not actually kids's images, please fix them and in TECH side, use the latest devices, or use the devices between (2023-until now), in the technology, you can also create one sub-category of Laptops/PC within the Technology section."

### 15. Review Product Counts
**Prompt:** "I see only a few products for men and women and there no products on kids and technology section, pleas review and restart again"

### 16. Fix Image Relevance
**Prompt:** "can you work on the images, the images inthe KIDS section and in Technology are not relevant, maybe you can images from any shopping webiste online for reference"

### 17. Remove Technology Category and Reduce Products
**Prompt:** "let's reduce some code, it's getting to much. remove the Technology category and associated code. Only use 10 products in each section (KIDS, MEN, WOMEN)"

### 18. Fix Product Count Limit
**Prompt:** "YES, men shows more than 1- products, can you ceck the code again, or maybe we can use the loop structure to put counter upto max 10 or any other way you su recommend?"

### 19. Run Application Again
**Prompt:** "run application"

### 20. Image Source Inquiry
**Prompt:** "which source are you using for images?"

### 21. Reduce to 6 Products Per Category
**Prompt:** "I see 6 products in each category in @DataInitializer.java file, so we should use same 6 products without duplicating. Change the counting of prdoucts to be displayed to 6 in each page"

### 22. Fix Kids Category Images
**Prompt:** "the pictures of MEN and WOMEN cateogries are okay, do not need to touch that, but in KIDS, the imagea re some relevatn, please use any open source website and get some KIDS clothing images relevant to the product title and use them"

### 23. Confirmation
**Prompt:** "allright, all good now,"

### 24. Create Prompt History File
**Prompt:** "can you list all the prompts I have used to make this app so far? can you lis them in a file?"

---

## Summary

Total Prompts: 24

### Key Features Implemented:
1. ✅ Cart functionality with counter
2. ✅ Full cart view with add/remove items
3. ✅ Price sorting (high to low, low to high)
4. ✅ Stylish filter UI with icon
5. ✅ Search functionality
6. ✅ Product detail pages
7. ✅ Wishlist feature
8. ✅ Enhanced filtering (price range, size, color)
9. ✅ Checkout process
10. ✅ Real product data from APIs (FakeStore, DummyJSON)
11. ✅ Category management (MEN, WOMEN, KIDS)
12. ✅ Product limit management (6 products per category)
13. ✅ Relevant product images

### Technologies Used:
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Spring Boot, Java
- **Database:** H2 (in-memory)
- **APIs:** FakeStore API, DummyJSON API
- **Image Sources:** Unsplash, Pexels, Zara, SportChek, Deux par Deux

### Final State:
- 6 products per category (MEN, WOMEN, KIDS)
- Total: 18 products
- All images are relevant to product types
- Clean, modern UI with full e-commerce functionality

