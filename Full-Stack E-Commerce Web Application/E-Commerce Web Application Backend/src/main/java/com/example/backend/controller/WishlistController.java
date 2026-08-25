package com.example.backend.controller;

import com.example.backend.model.WishlistItem;
import com.example.backend.security.AuthInterceptor;
import com.example.backend.store.DataStore;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final DataStore dataStore;

    public WishlistController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    private String userId(HttpServletRequest request) {
        return (String) request.getAttribute(AuthInterceptor.USER_ID_ATTRIBUTE);
    }

    @GetMapping
    public List<WishlistItem> getWishlist(HttpServletRequest request) {
        return dataStore.wishlistFor(userId(request));
    }

    @PostMapping
    public ResponseEntity<List<WishlistItem>> addItem(HttpServletRequest request, @RequestBody WishlistItem item) {
        List<WishlistItem> wishlist = dataStore.wishlistFor(userId(request));
        boolean exists = wishlist.stream().anyMatch(i -> i.getProductId().equals(item.getProductId()));
        if (!exists) {
            wishlist.add(item);
        }
        return ResponseEntity.ok(wishlist);
    }

    @PutMapping
    public ResponseEntity<List<WishlistItem>> replaceWishlist(HttpServletRequest request, @RequestBody List<WishlistItem> items) {
        List<WishlistItem> wishlist = dataStore.wishlistFor(userId(request));
        wishlist.clear();
        wishlist.addAll(items);
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<List<WishlistItem>> removeItem(HttpServletRequest request, @PathVariable Long productId) {
        List<WishlistItem> wishlist = dataStore.wishlistFor(userId(request));
        wishlist.removeIf(i -> i.getProductId().equals(productId));
        return ResponseEntity.ok(wishlist);
    }
}
