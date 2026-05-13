package com.ecommerce.config;

import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            log.info("Database already seeded ({} categories, {} products), skipping...",
                categoryRepository.count(), productRepository.count());
            return;
        }
        // Clear any stale products and reseed fresh
        log.info("Clearing stale data and seeding fresh catalog...");
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        seedCategories();
        log.info("Database seeding complete!");
    }

    private void seedCategories() {
        String[][] catData = {
            {"Electronics", "Smartphones, laptops, audio gear and gadgets", "electronics", "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80"},
            {"Fashion", "Clothing, footwear and accessories", "fashion", "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80"},
            {"Home & Kitchen", "Appliances, cookware and home essentials", "home-kitchen", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"},
            {"Beauty & Personal Care", "Skincare, makeup and grooming products", "beauty-personal-care", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80"},
            {"Books & Stationery", "Books, pens, notebooks and art supplies", "books-stationery", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80"},
            {"Sports & Fitness", "Sports equipment, fitness gear and activewear", "sports-fitness", "https://images.unsplash.com/photo-1461896836934-bd45ba0c0964?w=400&q=80"},
            {"Toys & Games", "Toys, board games and fun for all ages", "toys-games", "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80"},
            {"Groceries & Essentials", "Daily essentials, food and beverages", "groceries-essentials", "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"},
        };

        for (int i = 0; i < catData.length; i++) {
            Category cat = Category.builder()
                .name(catData[i][0]).description(catData[i][1])
                .slug(catData[i][2]).image(catData[i][3])
                .displayOrder(i + 1).active(true).build();
            cat = categoryRepository.save(cat);
            log.info("Created category: {}", cat.getName());
            seedProductsForCategory(cat);
        }
    }

    private Product p(String name, String desc, String brand, double price, double disc, int pct, Category cat, String img, int stock, boolean feat, List<String> tags, String color, String warranty) {
        return Product.builder()
            .name(name).description(desc).brand(brand)
            .price(BigDecimal.valueOf(price))
            .discountPrice(disc > 0 ? BigDecimal.valueOf(disc) : null)
            .discountPercentage(pct)
            .categoryId(cat.getId()).categoryName(cat.getName())
            .images(List.of(img))
            .stockQuantity(stock).active(true).featured(feat)
            .tags(tags)
            .specs(Product.ProductSpecs.builder().color(color).warranty(warranty).build())
            .build();
    }

    private void seedProductsForCategory(Category cat) {
        List<Product> products;
        switch (cat.getSlug()) {
            case "electronics":
                products = Arrays.asList(
                    p("Samsung Galaxy S24 Ultra","Flagship smartphone with 200MP camera and S Pen","Samsung",129999,109999,15,cat,"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",50,true,List.of("smartphone","samsung","5g"),"Titanium Black","1 Year"),
                    p("Sony WH-1000XM5 Headphones","Industry-leading noise cancelling wireless headphones","Sony",29990,24990,17,cat,"https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",80,true,List.of("headphones","wireless","noise-cancelling"),"Black","1 Year"),
                    p("Apple MacBook Air M3","Lightweight laptop with M3 chip and 18hr battery","Apple",114900,0,0,cat,"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",30,false,List.of("laptop","apple","macbook"),"Silver","1 Year"),
                    p("iPad Air M2","Versatile tablet with M2 chip and Liquid Retina display","Apple",59900,54900,8,cat,"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",45,false,List.of("tablet","apple","ipad"),"Space Gray","1 Year"),
                    p("JBL Flip 6 Bluetooth Speaker","Portable waterproof speaker with powerful sound","JBL",11999,9499,21,cat,"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",100,false,List.of("speaker","bluetooth","portable"),"Red","1 Year"),
                    p("Samsung 55 inch 4K Smart TV","Crystal UHD 4K smart television with HDR","Samsung",54990,44990,18,cat,"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",25,true,List.of("tv","samsung","4k"),"Black","2 Years"),
                    p("Logitech MX Master 3S Mouse","Ergonomic wireless mouse for productivity","Logitech",8995,0,0,cat,"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",60,false,List.of("mouse","wireless","ergonomic"),"Graphite","1 Year"),
                    p("boAt Airdopes 441 TWS Earbuds","True wireless earbuds with 30hr playback","boAt",1299,899,31,cat,"https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80",200,false,List.of("earbuds","wireless","boat"),"Black","1 Year")
                );
                break;
            case "fashion":
                products = Arrays.asList(
                    p("Levi's 511 Slim Fit Jeans","Classic slim fit stretch denim jeans","Levi's",3499,2449,30,cat,"https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",120,false,List.of("jeans","denim","slim-fit"),"Blue","6 Months"),
                    p("Nike Air Max 270 Sneakers","Lifestyle sneakers with Max Air cushioning","Nike",13995,10497,25,cat,"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",70,true,List.of("sneakers","nike","shoes"),"White/Red","1 Year"),
                    p("Allen Solly Formal Shirt","Premium cotton regular fit formal shirt","Allen Solly",2199,1539,30,cat,"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",150,false,List.of("shirt","formal","cotton"),"White","3 Months"),
                    p("Fossil Gen 6 Smartwatch","Wear OS smartwatch with heart rate and SpO2","Fossil",24995,17497,30,cat,"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",35,false,List.of("watch","smartwatch","fossil"),"Brown","2 Years"),
                    p("Ray-Ban Aviator Classic","Iconic aviator sunglasses with UV protection","Ray-Ban",8990,0,0,cat,"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",40,false,List.of("sunglasses","rayban","aviator"),"Gold","1 Year"),
                    p("Adidas Ultraboost Running Shoes","High-performance running shoes with Boost midsole","Adidas",16999,12749,25,cat,"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80",55,false,List.of("shoes","running","adidas"),"Black","1 Year"),
                    p("US Polo Assn T-Shirt","Classic cotton crew neck t-shirt","US Polo",1599,999,37,cat,"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",200,true,List.of("tshirt","casual","cotton"),"Navy Blue","3 Months"),
                    p("Wildcraft Backpack 35L","Durable trekking and travel backpack","Wildcraft",2999,1999,33,cat,"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",80,false,List.of("backpack","travel","trekking"),"Grey","2 Years")
                );
                break;
            case "home-kitchen":
                products = Arrays.asList(
                    p("Prestige Induction Cooktop","Energy efficient induction cooktop with push button","Prestige",3195,2395,25,cat,"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",90,true,List.of("induction","cooktop","kitchen"),"Black","1 Year"),
                    p("Dyson V15 Detect Vacuum","Cordless vacuum with laser dust detection","Dyson",62900,0,0,cat,"https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",20,false,List.of("vacuum","cordless","dyson"),"Yellow","2 Years"),
                    p("Philips Digital Air Fryer","Rapid Air technology for healthy cooking","Philips",9995,7495,25,cat,"https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&q=80",60,false,List.of("airfryer","cooking","philips"),"Black","2 Years"),
                    p("Wipro Smart LED Bulb","WiFi enabled color-changing smart bulb","Wipro",599,449,25,cat,"https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&q=80",300,false,List.of("led","smart","bulb"),"White","1 Year"),
                    p("Milton Thermosteel Flask 1L","Double-walled stainless steel vacuum flask","Milton",1199,849,29,cat,"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",150,false,List.of("flask","steel","thermos"),"Silver","6 Months"),
                    p("Havells Instant Water Heater","3L instant water heater with safety features","Havells",4990,3990,20,cat,"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80",40,false,List.of("geyser","water-heater","havells"),"White","2 Years"),
                    p("Pigeon Nonstick Cookware Set","5-piece nonstick cookware set","Pigeon",2499,1699,32,cat,"https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80",70,false,List.of("cookware","nonstick","kitchen"),"Red","1 Year"),
                    p("Cello Opalware Dinner Set 27pc","Premium opalware dinner set for 6","Cello",3999,2799,30,cat,"https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&q=80",45,true,List.of("dinnerware","opalware","set"),"White","1 Year")
                );
                break;
            case "beauty-personal-care":
                products = Arrays.asList(
                    p("Maybelline Fit Me Foundation","Matte and poreless liquid foundation","Maybelline",599,449,25,cat,"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",180,false,List.of("foundation","makeup","maybelline"),"Natural Beige",""),
                    p("L'Oreal Hyaluronic Acid Serum","Revitalift serum with 1.5% hyaluronic acid","L'Oreal",999,749,25,cat,"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",100,false,List.of("serum","skincare","loreal"),"Clear",""),
                    p("Nivea Body Lotion 400ml","Nourishing body milk for dry skin","Nivea",399,299,25,cat,"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80",250,false,List.of("lotion","moisturizer","nivea"),"White",""),
                    p("Philips BT3211 Beard Trimmer","Corded/cordless trimmer with 20 settings","Philips",1795,1345,25,cat,"https://images.unsplash.com/photo-1621607512022-6e8f1eb2db38?w=400&q=80",85,true,List.of("trimmer","grooming","philips"),"Black","2 Years"),
                    p("Biotique Green Apple Shampoo","Fresh daily purifying shampoo 340ml","Biotique",375,280,25,cat,"https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80",200,false,List.of("shampoo","herbal","haircare"),"Green",""),
                    p("Lakme Absolute Matte Lipstick","Precision liquid matte lipstick","Lakme",850,637,25,cat,"https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",120,false,List.of("lipstick","matte","lakme"),"Crimson Red",""),
                    p("Dove Body Wash 250ml","Nourishing body wash with moisturizing cream","Dove",475,356,25,cat,"https://images.unsplash.com/photo-1556228578-0d85b1a0d2a7?w=400&q=80",180,false,List.of("bodywash","skincare","dove"),"White",""),
                    p("The Man Company Beard Kit","Complete beard grooming kit with oil and wash","The Man Company",1499,999,33,cat,"https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&q=80",65,false,List.of("beard","grooming","kit"),"Brown","")
                );
                break;
            case "books-stationery":
                products = Arrays.asList(
                    p("Atomic Habits by James Clear","Proven framework for building good habits","Penguin",699,399,43,cat,"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",500,true,List.of("book","self-help","bestseller"),"",""),
                    p("Rich Dad Poor Dad","Personal finance classic by Robert Kiyosaki","Plata Publishing",499,299,40,cat,"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",400,false,List.of("book","finance","bestseller"),"",""),
                    p("Parker Vector Standard Pen","Premium fountain pen with stainless steel nib","Parker",395,296,25,cat,"https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&q=80",200,false,List.of("pen","fountain","parker"),"Blue","1 Year"),
                    p("Classmate Notebook Pack of 6","Single-line 180 pages notebooks","Classmate",299,224,25,cat,"https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",350,false,List.of("notebook","stationery","school"),"Brown",""),
                    p("Harry Potter Complete Box Set","All 7 books in paperback box set","Bloomsbury",3999,2799,30,cat,"https://images.unsplash.com/photo-1618666012174-83b441d4b81f?w=400&q=80",60,false,List.of("book","fiction","harry-potter"),"",""),
                    p("The Psychology of Money","Timeless lessons on wealth by Morgan Housel","Jaico",399,249,38,cat,"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",300,false,List.of("book","finance","psychology"),"",""),
                    p("Camlin Artist Colour Kit","24-shade artist quality painting kit","Camlin",1499,1049,30,cat,"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",80,false,List.of("art","painting","colours"),"Multi",""),
                    p("Faber-Castell 48 Colour Pencils","Premium colour pencils for sketching","Faber-Castell",499,374,25,cat,"https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80",150,false,List.of("pencils","colouring","art"),"Multi","")
                );
                break;
            case "sports-fitness":
                products = Arrays.asList(
                    p("Nivia Storm Football Size 5","Machine stitched training football","Nivia",799,599,25,cat,"https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80",100,false,List.of("football","sports","nivia"),"Orange","3 Months"),
                    p("Yonex Nanoray Light 18i Racket","Lightweight badminton racket for beginners","Yonex",2990,2390,20,cat,"https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80",60,false,List.of("badminton","racket","yonex"),"Blue","6 Months"),
                    p("Fitbit Charge 5 Tracker","Advanced fitness tracker with GPS and ECG","Fitbit",14999,11999,20,cat,"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80",40,true,List.of("fitness","tracker","fitbit"),"Black","1 Year"),
                    p("Nike Dri-FIT Sports T-Shirt","Moisture-wicking training t-shirt","Nike",1795,1345,25,cat,"https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400&q=80",180,false,List.of("tshirt","sports","nike"),"Grey","3 Months"),
                    p("Boldfit Yoga Mat 6mm","Anti-slip EVA yoga and exercise mat","Boldfit",699,499,29,cat,"https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",200,false,List.of("yoga","mat","fitness"),"Purple","6 Months"),
                    p("Kookaburra Kahuna Cricket Bat","English willow cricket bat grade 2","Kookaburra",4999,3749,25,cat,"https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80",30,false,List.of("cricket","bat","sports"),"Natural","1 Year"),
                    p("Decathlon Hex Dumbbells 5kg","Pair of rubber-coated hex dumbbells","Decathlon",1999,1499,25,cat,"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",90,false,List.of("dumbbells","gym","weights"),"Black","1 Year"),
                    p("Speedo Swim Goggles","Anti-fog UV protection swim goggles","Speedo",1190,890,25,cat,"https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&q=80",110,false,List.of("swimming","goggles","speedo"),"Blue","6 Months")
                );
                break;
            case "toys-games":
                products = Arrays.asList(
                    p("LEGO City Police Station","486-piece police station building set","LEGO",5999,4499,25,cat,"https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80",40,true,List.of("lego","building","toys"),"Multi",""),
                    p("Monopoly Classic Board Game","Family board game of property trading","Hasbro",1299,974,25,cat,"https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&q=80",80,false,List.of("boardgame","family","monopoly"),"Multi",""),
                    p("Hot Wheels 20-Car Gift Pack","Set of 20 die-cast toy cars","Mattel",1999,1499,25,cat,"https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&q=80",60,false,List.of("cars","hotwheels","diecast"),"Multi",""),
                    p("Barbie Fashionista Doll","Fashion doll with trendy outfit and accessories","Mattel",1499,1124,25,cat,"https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&q=80",100,false,List.of("barbie","doll","fashion"),"Pink",""),
                    p("Rubik's Cube 3x3 Original","Classic 3x3 puzzle cube","Rubik's",499,374,25,cat,"https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&q=80",150,false,List.of("puzzle","rubiks","brain"),"Multi",""),
                    p("Nerf Elite 2.0 Commander","Motorized dart blaster with 12 darts","Nerf",2499,1874,25,cat,"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80",55,false,List.of("nerf","blaster","outdoor"),"Orange",""),
                    p("Play-Doh Mega Pack 36 Cans","Non-toxic modeling compound mega pack","Play-Doh",999,749,25,cat,"https://images.unsplash.com/photo-1560859251-d563a49c777e?w=400&q=80",90,false,List.of("playdoh","creative","kids"),"Multi",""),
                    p("Funskool Scrabble Original","Classic word-building crossword game","Funskool",899,674,25,cat,"https://images.unsplash.com/photo-1611891487122-9d2c68d56ed0?w=400&q=80",70,false,List.of("scrabble","wordgame","board"),"Brown","")
                );
                break;
            case "groceries-essentials":
                products = Arrays.asList(
                    p("Tata Gold Tea 500g","Premium blend of fine Assam tea leaves","Tata",340,0,0,cat,"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",300,false,List.of("tea","beverage","tata"),"",""),
                    p("Aashirvaad Atta 10kg","Whole wheat flour for soft rotis","Aashirvaad",499,449,10,cat,"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",200,false,List.of("atta","flour","staple"),"",""),
                    p("Fortune Sunlite Oil 5L","Refined sunflower cooking oil","Fortune",799,699,13,cat,"https://images.unsplash.com/photo-1474979266404-7f28aaa3a965?w=400&q=80",150,false,List.of("oil","cooking","sunflower"),"",""),
                    p("Surf Excel Matic 4kg","Front load washing machine detergent","Surf Excel",899,749,17,cat,"https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80",100,false,List.of("detergent","laundry","cleaning"),"",""),
                    p("Dettol Handwash 750ml Pack","Original liquid handwash twin pack","Dettol",399,299,25,cat,"https://images.unsplash.com/photo-1584305574647-0cc949a2bb9e?w=400&q=80",250,false,List.of("handwash","hygiene","dettol"),"",""),
                    p("Maggi 2-Minute Noodles 12 Pack","Instant noodles masala flavour","Nestle",240,199,17,cat,"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80",400,false,List.of("noodles","instant","maggi"),"",""),
                    p("Amul Butter 500g","Pasteurized creamy butter","Amul",280,0,0,cat,"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80",180,false,List.of("butter","dairy","amul"),"",""),
                    p("Nescafe Gold 200g","Premium instant coffee blend","Nescafe",650,549,16,cat,"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",120,true,List.of("coffee","instant","nescafe"),"","")
                );
                break;
            default:
                products = List.of();
        }

        productRepository.saveAll(products);
        log.info("Seeded {} products for {}", products.size(), cat.getName());
    }
}
