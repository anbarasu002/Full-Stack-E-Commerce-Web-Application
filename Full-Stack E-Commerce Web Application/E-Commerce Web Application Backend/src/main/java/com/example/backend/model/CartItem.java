package com.example.backend.model;

public class CartItem {
    private Long productId;
    private String name;
    private double price;
    private double discount;
    private String image;
    private int qty;

    public CartItem() {}

    public CartItem(Long productId, String name, double price, double discount, String image, int qty) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.image = image;
        this.qty = qty;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getDiscount() { return discount; }
    public void setDiscount(double discount) { this.discount = discount; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public int getQty() { return qty; }
    public void setQty(int qty) { this.qty = qty; }
}
