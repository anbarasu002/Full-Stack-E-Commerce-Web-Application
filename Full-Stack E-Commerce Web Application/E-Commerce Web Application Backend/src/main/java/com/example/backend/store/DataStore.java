package com.example.backend.store;

import com.example.backend.model.CartItem;
import com.example.backend.model.Order;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.model.WishlistItem;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Component
public class DataStore {

    public final Map<String, User> usersById = new ConcurrentHashMap<>();
    
    public final Map<String, String> userIdByEmail = new ConcurrentHashMap<>();

    public final Map<String, String> sessions = new ConcurrentHashMap<>();

    public final Map<String, List<CartItem>> carts = new ConcurrentHashMap<>();

    public final Map<String, List<WishlistItem>> wishlists = new ConcurrentHashMap<>();

    public final Map<String, List<Order>> ordersByUser = new ConcurrentHashMap<>();

    public final Map<Long, Product> products = new ConcurrentHashMap<>();

    public final AtomicLong productIdSeq = new AtomicLong(1);
    public final AtomicLong orderIdSeq = new AtomicLong(1);

    @PostConstruct
    public void seedProducts() {
        addProduct("Men Stylish Shirt", 999, 30, "https://img.drz.lazcdn.com/static/bd/p/6f21695360a0e06db002b7a6738d1a27.jpg_720x720q80.jpg", "fashion");
        addProduct("Casual T-Shirt", 699, 25, "https://markmorphy.com/cdn/shop/files/rn-image_picker_lib_temp_9ca97105-1b3f-4cef-a875-85611b9afbca.jpg", "fashion");
        addProduct("iPhone 17 Pro Max Case", 69999, 10, "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGFQ4.jpg", "mobile");
        addProduct("Samsung S25 Ultra", 59999, 15, "https://darlingretail.com/cdn/shop/files/1_2_be316c5f-5d44-4f33-a540-80cedf642b71_800x.jpg", "mobile");
        addProduct("Refrigerator", 24999, 20, "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/vTqfPDV8-C-bpl-brf-3800avss-refrigerator-492284021-1-1200wx1200h.jpeg", "appliances");
        addProduct("Cricket Bat", 2999, 20, "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/dsc-blak-65-supreme-english-willow-india-range-cricket-bat-2.webp", "sports");
        addProduct("Lipstick", 499, 20, "https://ibacosmetics.com/cdn/shop/products/iba-pure-lips-long-stay-matte-lipstick.png", "makeup");
        addProduct("Toy Car", 499, 20, "https://m.media-amazon.com/images/I/61zQbBw-1OL.jpg", "toys");
        addProduct("The Lost Kingdom", 499, 20, "https://m.media-amazon.com/images/I/71rrPVH-xFL.jpg", "books");
        addProduct("Nike Running Shoes", 3499, 25, "https://cdn.plutosport.com/a/ProductMedia/Nike/P.NIKE.RSH.5248/FN0228-001_g1.jpg", "shoes");
        addProduct("Gaming Keyboard", 1299, 18, "https://rukminim2.flixcart.com/image/480/640/xif0q/keyboard/desktop-keyboard/w/l/6/gaming-keyboard-with-87-keys-rgb-backlit.jpeg", "electronics");
    }

    private void addProduct(String name, double price, double discount, String image, String category) {
        long id = productIdSeq.getAndIncrement();
        products.put(id, new Product(id, name, price, discount, image, category));
    }

    public List<CartItem> cartFor(String userId) {
        return carts.computeIfAbsent(userId, k -> new ArrayList<>());
    }

    public List<WishlistItem> wishlistFor(String userId) {
        return wishlists.computeIfAbsent(userId, k -> new ArrayList<>());
    }

    public List<Order> ordersFor(String userId) {
        return ordersByUser.computeIfAbsent(userId, k -> new ArrayList<>());
    }
}
