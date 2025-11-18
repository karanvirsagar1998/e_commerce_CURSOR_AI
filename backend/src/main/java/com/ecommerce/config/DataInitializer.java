package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private ProductRepository productRepository;

        @Override
        public void run(String... args) throws Exception {
                // Always clear and reload products to ensure we have all categories
                productRepository.deleteAll();
                System.out.println("Initializing products...");
                
                // Use only the 6 fallback products per category (no API fetching, no duplicates)
                loadFallbackProducts();

                // Ensure we have exactly 6 products in each category
                limitCategoryToMax("MEN", 6);
                limitCategoryToMax("WOMEN", 6);
                limitCategoryToMax("KIDS", 6);

                // Check counts after limiting
                long menCount = productRepository.countByCategory("MEN");
                long womenCount = productRepository.countByCategory("WOMEN");
                long kidsCount = productRepository.countByCategory("KIDS");

                System.out.println("After limiting - MEN: " + menCount + ", WOMEN: " + womenCount + ", KIDS: "
                                + kidsCount);

                System.out.println("Product initialization complete. Total products: " + productRepository.count());
                System.out.println("Final counts - MEN: " + productRepository.countByCategory("MEN") +
                                ", WOMEN: " + productRepository.countByCategory("WOMEN") +
                                ", KIDS: " + productRepository.countByCategory("KIDS"));
        }

        private void limitCategoryToMax(String category, int maxCount) {
                List<Product> categoryProducts = productRepository.findByCategory(category);
                if (categoryProducts != null && categoryProducts.size() > maxCount) {
                        // Keep only the first maxCount products, delete the rest
                        List<Product> toDelete = new ArrayList<>(
                                        categoryProducts.subList(maxCount, categoryProducts.size()));
                        productRepository.deleteAll(toDelete);
                        System.out.println("✓ Limited " + category + " category to " + maxCount + " products (deleted "
                                        + toDelete.size() + " excess)");
                }
        }

        private void loadFallbackProducts() {
                // Men's Clothing
                productRepository.save(new Product(
                                "Classic White T-Shirt",
                                "Premium cotton t-shirt with modern fit. Perfect for everyday wear.",
                                new BigDecimal("29.99"),
                                "MEN",
                                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,https://plus.unsplash.com/premium_photo-1718913931807-4da5b5dd27fa?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                "M",
                                "White",
                                50));

                productRepository.save(new Product(
                                "Slim Fit Jeans",
                                "Comfortable slim-fit jeans with stretch fabric. Available in multiple sizes.",
                                new BigDecimal("79.99"),
                                "MEN",
                                "https://shoptommy.scene7.com/is/image/ShopTommy/78J7535_8LE_alternate11?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/78J7535_8LE_main?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/78J7535_8LE_alternate6?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
                                "L",
                                "Blue",
                                30));

                productRepository.save(new Product(
                                "Leather Jacket",
                                "Genuine leather jacket with classic design. Perfect for cool weather.",
                                new BigDecimal("199.99"),
                                "MEN",
                                "https://coach.scene7.com/is/image/Coach/cu447_blk_a0?$desktopProduct$,https://coach.scene7.com/is/image/Coach/cu447_blk_a45?$desktopProduct$,https://coach.scene7.com/is/image/Coach/cu447_blk_a46?$desktopProduct$,https://coach.scene7.com/is/image/Coach/cu447_blk_a50?$desktopProduct$",
                                "XL",
                                "Black",
                                15));

                productRepository.save(new Product(
                                "Casual Coat",
                                "Versatile Coat suitable for office or casual occasions.",
                                new BigDecimal("49.99"),
                                "MEN",
                                "https://shoptommy.scene7.com/is/image/ShopTommy/XM06111_DW5_alternate2?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06111_DW5_main?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06111_DW5_alternate1?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06111_DW5_alternate5?wid=1728&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
                                "M",
                                "Navy",
                                40));

                productRepository.save(new Product(
                                "Athletic Shorts",
                                "Breathable athletic shorts perfect for workouts and casual wear.",
                                new BigDecimal("34.99"),
                                "MEN",
                                "https://images.lululemon.com/is/image/lululemon/na_apr25_wk1_SpringPlay_SkirtShortRefresh_PromoCard_DoubleWide_M_ZeroedInShorts?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72,https://images.lululemon.com/is/image/lululemon/na_apr25_wk1_SpringPlay_SkirtShortRefresh_PromoCard_DoubleWide_M_LicenseToTrainShorts?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72,https://m.media-amazon.com/images/I/61yqmiNe9iL._AC_SX679_.jpg,https://shop.athletics.ca/cdn/shop/files/CopyofUntitledDesign_a1620e4f-eb14-4244-8e08-c08d754076da.png?v=1700245120",
                                "L",
                                "Gray",
                                60));

                productRepository.save(new Product(
                                "Wool Sweater",
                                "Warm and cozy wool sweater for winter. Soft and comfortable.",
                                new BigDecimal("89.99"),
                                "MEN",
                                "https://shoptommy.scene7.com/is/image/ShopTommy/XM06076_RBL_main?wid=520&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06076_RBL_alternate1?wid=520&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06076_RBL_alternate2?wid=520&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp,https://shoptommy.scene7.com/is/image/ShopTommy/XM06076_RBL_alternate5?wid=520&qlt=80%2C0&resMode=sharp2&op_usm=0.9%2C1.0%2C8%2C0&iccEmbed=0&fmt=webp",
                                "M",
                                "Charcoal",
                                25));

                // Women's Clothing
                productRepository.save(new Product(
                                "Floral Summer Dress",
                                "Beautiful floral print dress perfect for summer occasions.",
                                new BigDecimal("59.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500,https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500,https://images.unsplash.com/photo-1566479179817-278d47a58f3a?w=500,https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600",
                                "M",
                                "Multicolor",
                                35));

                productRepository.save(new Product(
                                "High-Waisted Jeans",
                                "Trendy high-waisted jeans with perfect fit. Flattering and comfortable.",
                                new BigDecimal("69.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500,https://images.unsplash.com/photo-1582418702059-97ebafb9b8e1?w=500,https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500,https://images.unsplash.com/photo-1565084888279-aca607ecce0e?w=500",
                                "S",
                                "Light Blue",
                                45));

                productRepository.save(new Product(
                                "Elegant Blouse",
                                "Sophisticated blouse with delicate details. Perfect for professional settings.",
                                new BigDecimal("54.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500,https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500,https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500,https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500",
                                "M",
                                "Cream",
                                50));

                productRepository.save(new Product(
                                "Knit Cardigan",
                                "Cozy cardigan perfect for layering. Soft and warm.",
                                new BigDecimal("64.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500,https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500,https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500,https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600",
                                "L",
                                "Beige",
                                30));

                productRepository.save(new Product(
                                "Athletic Leggings",
                                "High-performance leggings for workouts. Moisture-wicking and comfortable.",
                                new BigDecimal("44.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1506629905607-1c0c8c0c8b8a?w=500,https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500,https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500,https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                                "M",
                                "Black",
                                55));

                productRepository.save(new Product(
                                "Maxi Skirt",
                                "Flowing maxi skirt with elegant design. Perfect for any occasion.",
                                new BigDecimal("49.99"),
                                "WOMEN",
                                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500,https://images.unsplash.com/photo-1566479179817-278d47a58f3a?w=500,https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500,https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500",
                                "M",
                                "Navy",
                                40));

                // Kids Products - with relevant images from Pexels matching each product type
                // Kids T-Shirt - using kids t-shirt specific images
                productRepository.save(new Product(
                                "Kids T-Shirt",
                                "Comfortable and durable kids clothing perfect for active play.",
                                new BigDecimal("19.99"),
                                "KIDS",
                                "https://static.zara.net/assets/public/0704/077f/40b04bd8b0cf/f3772777ddf0/07878547807-e1/07878547807-e1.jpg?ts=1752753408401&w=1024,https://static.zara.net/assets/public/f577/7e83/44c041aaa9c9/5f4cf2f2c629/07878547807-e2/07878547807-e2.jpg?ts=1752753408463&w=1125,https://static.zara.net/assets/public/8004/7fdd/1ae846c5a1e8/1a834e18342e/07878547807-e3/07878547807-e3.jpg?ts=1752753408626&w=750,https://static.zara.net/assets/public/9d2d/3771/13f3402da2a4/055e029ed3fc/07878547807-e4/07878547807-e4.jpg?ts=1752753408763&w=750",
                                "S",
                                "Blue",
                                50));

                // Children's Jeans - using kids jeans/pants specific images  
                productRepository.save(new Product(
                                "Children's Jeans",
                                "Soft, safe materials designed specifically for children.",
                                new BigDecimal("29.99"),
                                "KIDS",
                                "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTim21OOq_b0H2TgBYGY10S5MyRFSBes5NoeLBWP6leVtWHG6DpdKpPdMlET9tkxUEEJzJZKitW9SA9_vkw9AhYLlJTujAn90uTP4ybBituG3_Fp4rlRhfM,https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQi3MlJoKs0Gv3yO-AIYCJM6krrlXFR0c2SOte38meNAZDOwGTl3QeFAzKHeMBDvc5enrgF3oodq-R-IYDzNvresJQ6KP_QxD0QXTQtAwV84oWLPyzhyFaa,https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRpI-42kk2yZ5G75R91wL8BRwKkn1yua6qlsYtcXMUXc2aLQ8DJbPThM508QOOTHOT8JU3GpCe3J9RihIWwlPt2_fHjbroQIF9RlZEaOPMrnCwk9vEmyzC4nQ,https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS-1xFCkS12s90T6oG2NpVdbs451DPOQ_8PgWI5eo2u60ZKgpAyXtntcLJzXVfYW2mn18cdWMojUKm6Cu7B6lKOoSBxfJXiC7AdgF--HAGRGaLQTGLdNb5fhw",
                                "M",
                                "Light Blue",
                                45));

                // Kids Dress - using kids dress specific images
                productRepository.save(new Product(
                                "Kids Shoes",
                                "Colorful and fun designs that kids love to wear.",
                                new BigDecimal("34.99"),
                                "KIDS",
                                "https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-05-toddler-infant/334544713/adidas-toddler-runfalcon-5-athletic-shoes-11c73ad9-054a-4f32-9fb3-d9dc7da275a5-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom,https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-05-toddler-infant/334544713/adidas-toddler-runfalcon-5-athletic-shoes-cc9492b5-5e69-4d8b-97f5-d60e9f191bc5-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom,,https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-05-toddler-infant/334544713/adidas-toddler-runfalcon-5-athletic-shoes-1e08de87-158a-4784-8f9e-d50afcf794be-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom,https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-05-toddler-infant/334544713/adidas-toddler-runfalcon-5-athletic-shoes-ad6ee8ec-0f71-4044-a38a-0f69ac52f512-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom",
                                "S",
                                "Pink",
                                40));

                // Kids Hoodie - using kids hoodie/sweatshirt specific images
                productRepository.save(new Product(
                                "Kids Hoodie",
                                "High-quality kids apparel with excellent fit and comfort.",
                                new BigDecimal("39.99"),
                                "KIDS",
                                "https://deuxpardeux.com/cdn/shop/files/H20U34_999_LB1_a5149e93-3894-42a9-8ad1-0a776a548848.jpg?v=1752192922&width=600,https://deuxpardeux.com/cdn/shop/files/H20U34_999_P2_4d6782a0-9325-46a7-97bb-61347fe783d4.jpg?v=1752198959&width=600,https://deuxpardeux.com/cdn/shop/files/H20U34_999_1_32a2c441-4b53-4077-8530-2558a3f2eac4.jpg?v=1752197013&width=600,https://deuxpardeux.com/cdn/shop/files/H20U34_999_P3_27a9a545-063b-468d-9aab-f9afa821b04a.jpg?v=1752191096&width=600",
                                "M",
                                "Red",
                                35));

                // Baby Onesie - using baby clothing specific images
                productRepository.save(new Product(
                                "KIds Sweater",
                                "Safe, non-toxic materials perfect for growing children.",
                                new BigDecimal("24.99"),
                                "KIDS",
                                "https://static.zara.net/assets/public/f26d/3776/afec491e9676/9c1bfa0ee246/01880907805-e1/01880907805-e1.jpg?ts=1755704471380&w=1024,https://static.zara.net/assets/public/edeb/7fb1/4e784480ada7/159aa9135d7a/01880907805-e2/01880907805-e2.jpg?ts=1755704471192&w=1125,https://static.zara.net/assets/public/345d/502f/cf1641d9b296/1e89b4759b89/01880907805-e3/01880907805-e3.jpg?ts=1755704473123&w=750,https://static.zara.net/assets/public/e432/b0f0/72d3451495bc/91498152c98c/01880907805-e4/01880907805-e4.jpg?ts=1755704471453&w=750",
                                "S",
                                "Yellow",
                                60));

        }
}
