package com.example.backend.controller;

import com.example.backend.dto.OrderRequest;
import com.example.backend.exception.ApiException;
import com.example.backend.model.CartItem;
import com.example.backend.model.Order;
import com.example.backend.security.AuthInterceptor;
import com.example.backend.store.DataStore;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final DataStore dataStore;

    public OrderController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    private String userId(HttpServletRequest request) {
        return (String) request.getAttribute(AuthInterceptor.USER_ID_ATTRIBUTE);
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(HttpServletRequest request, @Valid @RequestBody OrderRequest req) {
        String uid = userId(request);

        double total = req.getItems().stream()
                .mapToDouble(i -> (i.getPrice() - (i.getPrice() * i.getDiscount() / 100.0)) * Math.max(1, i.getQty()))
                .sum();

        Order order = new Order();
        order.setId(String.valueOf(dataStore.orderIdSeq.getAndIncrement()));
        order.setUserId(uid);
        order.setItems(req.getItems());
        order.setTotal(total);
        order.setName(req.getName());
        order.setEmail(req.getEmail());
        order.setPhone(req.getPhone());
        order.setAddress(req.getAddress());
        order.setCountry(req.getCountry());
        order.setPayment(req.getPayment());
        order.setStatus("PLACED");

        dataStore.ordersFor(uid).add(0, order);

        dataStore.cartFor(uid).clear();

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping
    public List<Order> getOrders(HttpServletRequest request) {
        return dataStore.ordersFor(userId(request)).stream()
                .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping("/{orderId}")
    public Order getOrder(HttpServletRequest request, @PathVariable String orderId) {
        return dataStore.ordersFor(userId(request)).stream()
                .filter(o -> o.getId().equals(orderId))
                .findFirst()
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Order not found"));
    }
}
