package com.example.backend.controller;

import com.example.backend.model.CartItem;
import com.example.backend.security.AuthInterceptor;
import com.example.backend.store.DataStore;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final DataStore dataStore;

    public CartController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    private String userId(HttpServletRequest request) {
        return (String) request.getAttribute(AuthInterceptor.USER_ID_ATTRIBUTE);
    }

    @GetMapping
    public List<CartItem> getCart(HttpServletRequest request) {
        return dataStore.cartFor(userId(request));
    }

    @PostMapping
    public ResponseEntity<List<CartItem>> addItem(HttpServletRequest request, @RequestBody CartItem item) {
        List<CartItem> cart = dataStore.cartFor(userId(request));

        CartItem existing = cart.stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            existing.setQty(existing.getQty() + Math.max(1, item.getQty()));
        } else {
            item.setQty(Math.max(1, item.getQty()));
            cart.add(item);
        }

        return ResponseEntity.ok(cart);
    }

    @PutMapping
    public ResponseEntity<List<CartItem>> replaceCart(HttpServletRequest request, @RequestBody List<CartItem> items) {
        List<CartItem> cart = dataStore.cartFor(userId(request));
        cart.clear();
        cart.addAll(items);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<List<CartItem>> updateQty(HttpServletRequest request, @PathVariable Long productId, @RequestBody CartItem update) {
        List<CartItem> cart = dataStore.cartFor(userId(request));
        for (CartItem i : cart) {
            if (i.getProductId().equals(productId)) {
                i.setQty(Math.max(1, update.getQty()));
                break;
            }
        }
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<List<CartItem>> removeItem(HttpServletRequest request, @PathVariable Long productId) {
        List<CartItem> cart = dataStore.cartFor(userId(request));
        cart.removeIf(i -> i.getProductId().equals(productId));
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    public ResponseEntity<List<CartItem>> clearCart(HttpServletRequest request) {
        List<CartItem> cart = dataStore.cartFor(userId(request));
        cart.clear();
        return ResponseEntity.ok(cart);
    }
}
