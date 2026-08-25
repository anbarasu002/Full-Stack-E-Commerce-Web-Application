package com.example.backend.controller;

import com.example.backend.exception.ApiException;
import com.example.backend.model.Product;
import com.example.backend.store.DataStore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final DataStore dataStore;

    public ProductController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @GetMapping
    public List<Product> getAll(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return dataStore.products.values().stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }
        return List.copyOf(dataStore.products.values());
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        Product p = dataStore.products.get(id);
        if (p == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Product not found");
        }
        return p;
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String q) {
        String query = q.toLowerCase();
        return dataStore.products.values().stream()
                .filter(p -> p.getName().toLowerCase().contains(query))
                .collect(Collectors.toList());
    }

    @GetMapping("/category/{category}")
    public List<Product> byCategory(@PathVariable String category) {
        return dataStore.products.values().stream()
                .filter(p -> p.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
}
