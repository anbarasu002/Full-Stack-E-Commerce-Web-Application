<div align="center">

# 🛒 E-Commerce Web Application

### A Full-Stack Online Shopping Platform built with React (Vite) + Spring Boot

**[🚀 Live Demo](https://e-commerce-frontend-alpha-lake.vercel.app/)**

</div>

---

## 📌 Overview

**E-Commerce Web Application** is a full-stack online shopping platform that lets users browse products across multiple categories, search and filter items, manage a cart and wishlist, and complete a checkout flow that generates a real order. It pairs a fast, component-driven **React (Vite)** frontend with a **Spring Boot** REST API backend that handles authentication, product catalog, cart, wishlist, and order management.

The backend uses an in-memory data store, keeping the project lightweight and easy to spin up locally with zero external database setup — while remaining straightforward to extend with a persistent database such as MySQL, PostgreSQL, or MongoDB for production use.

This project is a strong reference implementation for a modern e-commerce storefront: category browsing, search, cart/wishlist persistence per user, secure token-based authentication, and a full order placement pipeline.

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Backend](#1-running-the-backend)
  - [Running the Frontend](#2-running-the-frontend)
  - [Environment Configuration](#-environment-configuration)
- [API Reference](#-api-reference)
- [Data Model](#-data-model)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## ✨ Features

### 🔐 Authentication & Security
- **Register** and **login** with hashed passwords (BCrypt)
- Token-based session authentication with a Bearer token attached to protected requests
- **Logout** invalidates the active session server-side
- `/api/auth/me` endpoint to fetch the current authenticated user's profile
- Centralized request authentication via `AuthInterceptor`
- Friendly error messages for duplicate email registration and invalid login credentials

### 🛍️ Product Catalog
- Browse products across dedicated category pages — **Electronics, Fashion, Mobile, Shoes, Appliances, Books, Makeup, Sports, Toys**
- **Product search** by name via a dedicated search endpoint and live search results component
- **Category-based filtering** (both a `category` query param and a dedicated path-based endpoint)
- Product cards with pricing and discount display
- Homepage hero **slider** and category cards for quick navigation

### 🛒 Cart & Wishlist
- Add, update quantity, remove, and clear items in a **per-user cart**
- Add, remove, and clear items in a **per-user wishlist**
- Cart automatically merges quantities when the same product is added twice
- Cart and wishlist state is scoped to the authenticated user on the backend

### 📦 Checkout & Orders
- Full **checkout flow** capturing shipping details (name, email, phone, address, country) and payment method
- Order total calculated server-side from item price, discount, and quantity
- Cart is automatically cleared once an order is successfully placed
- **Order history** — view all past orders, sorted by most recent
- **Order confirmation** page after a successful purchase
- Individual order lookup by order ID

### 🎨 User Experience
- Responsive, component-based UI with a persistent navbar, footer, and search bar
- Dedicated pages per product category for focused browsing
- Clean cart, wishlist, and checkout page layouts with their own styling
- Graceful handling of backend connectivity issues with clear error messaging

### ⚙️ Engineering Quality
- RESTful API design with consistent JSON responses and HTTP status codes
- Centralized global exception handling (`GlobalExceptionHandler`, `ApiException`)
- CORS configuration for safe cross-origin frontend↔backend communication
- Clear separation of concerns: controllers, DTOs, models, security, and in-memory data store
- Environment-based API URL configuration on the frontend (`VITE_API_URL`)
- ESLint-configured frontend for consistent code style

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite |
| **Icons** | react-icons |
| **Backend Framework** | Spring Boot |
| **Language** | Java 17 |
| **Security** | Spring Security Crypto (BCrypt password hashing) |
| **Validation** | Jakarta Bean Validation |
| **Web Server** | Embedded Apache Tomcat |
| **Data Storage** | In-memory (`DataStore`) — swappable for MySQL/PostgreSQL/MongoDB |
| **Build Tools** | Maven (backend), npm (frontend) |
| **Linting** | ESLint |
| **Hosting** | Vercel (frontend) |

---

## 🏗️ Architecture

```
┌─────────────────────┐          HTTPS / REST (JSON)          ┌──────────────────────┐
│                      │  ───────────────────────────────────▶ │                      │
│   React (Vite) SPA   │                                        │   Spring Boot API    │
│  Frontend (Vercel)   │  ◀─────────────────────────────────── │  Products · Cart ·   │
│                      │           fetch + Bearer Token          │  Wishlist · Orders   │
└─────────────────────┘                                        └──────────┬───────────┘
                                                                            │
                                                                            ▼
                                                                 ┌──────────────────────┐
                                                                 │  In-Memory DataStore  │
                                                                 │  (Users, Products,    │
                                                                 │  Carts, Wishlists,    │
                                                                 │  Orders, Sessions)    │
                                                                 └──────────────────────┘
```

- The **frontend** is a single-page application built around category pages, a cart, a wishlist, and a checkout flow, communicating with the backend through a small `api.js` service wrapper around `fetch`.
- The **backend** exposes resource groups for `/api/auth`, `/api/products`, `/api/cart`, `/api/wishlist`, and `/api/orders`, each backed by its own controller and the shared in-memory `DataStore`.
- **Authentication** uses a bearer token generated at login and validated by `AuthInterceptor` on every protected request, with the resolved user ID injected into the request attributes for controllers to use.

---

## 📁 Project Structure

```
Full-Stack E-Commerce Web Application/
│
├── E-Commerce Web Application Backend/           # Spring Boot API
│   ├── src/main/java/com/example/backend/
│   │   ├── BackendApplication.java                # Application entry point
│   │   ├── config/
│   │   │   ├── CorsConfig.java                     # CORS policy
│   │   │   └── WebConfig.java                      # Web/interceptor registration
│   │   ├── controller/
│   │   │   ├── AuthController.java                 # /api/auth endpoints
│   │   │   ├── ProductController.java              # /api/products endpoints
│   │   │   ├── CartController.java                 # /api/cart endpoints
│   │   │   ├── WishlistController.java             # /api/wishlist endpoints
│   │   │   └── OrderController.java                # /api/orders endpoints
│   │   ├── dto/
│   │   │   ├── AuthResponse.java
│   │   │   ├── ErrorResponse.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── OrderRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   └── UserResponse.java
│   │   ├── exception/
│   │   │   ├── ApiException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── model/
│   │   │   ├── CartItem.java
│   │   │   ├── Order.java
│   │   │   ├── Product.java
│   │   │   ├── User.java
│   │   │   └── WishlistItem.java
│   │   ├── security/
│   │   │   └── AuthInterceptor.java                # Bearer token validation
│   │   └── store/
│   │       └── DataStore.java                      # In-memory data store
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
└── E-Commerce Web Application Frontend/           # React (Vite) client
    ├── src/
    │   ├── assets/                                  # Category images & hero slider
    │   ├── components/
    │   │   ├── Navbar.jsx / .css
    │   │   ├── Footer.jsx / .css
    │   │   ├── SearchBar.jsx
    │   │   ├── SearchResults.jsx
    │   │   ├── Slider.jsx / .css                     # Homepage hero slider
    │   │   └── CategoryCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Electronics.jsx / Fashion.jsx / Mobile.jsx
    │   │   ├── Shoes.jsx / Appliances.jsx / Books.jsx
    │   │   ├── Makeup.jsx / Sports.jsx / Toys.jsx      # Category pages
    │   │   ├── Cart.jsx / .css
    │   │   ├── Wishlist.jsx / .css
    │   │   ├── Checkout.jsx / .css
    │   │   ├── OrderSuccess.jsx / .css
    │   │   ├── Orders.jsx
    │   │   └── Login.jsx / Register.jsx / Auth.css
    │   ├── services/
    │   │   └── api.js                                 # Fetch wrapper & API client
    │   ├── App.jsx / App.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

| Tool | Minimum Version | Notes |
|------|-----------------|-------|
| [Java JDK](https://adoptium.net/) | 17+ | Required to run the Spring Boot backend |
| [Node.js](https://nodejs.org/) | 18+ | Required to run the React frontend |
| npm | 9+ | Bundled with Node.js |
| Maven | 3.9+ (optional) | The project ships with the `mvnw` wrapper, so a global install isn't required |
| Git | Any recent version | To clone the repository |

### Installation

Clone the repository:

```bash
git clone https://github.com/anbarasu002/Full-Stack-E-Commerce-Web-Application.git
cd "Full-Stack-E-Commerce-Web-Application/Full-Stack E-Commerce Web Application"
```

### 1. Running the Backend

```bash
cd "E-Commerce Web Application Backend"

# Using the Maven wrapper (recommended, no local Maven install needed)
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```

The API will start on:

```
http://localhost:8080
```

### 2. Running the Frontend

Open a new terminal window/tab:

```bash
cd "E-Commerce Web Application Frontend"
cp .env.example .env
npm install
npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

Open that URL in your browser. Register a new account, log in, browse products, add items to your cart or wishlist, and complete a checkout to place an order.

### 🔧 Environment Configuration

The frontend reads the backend's base URL from a Vite environment variable, defined in `.env`:

```bash
# .env
# Local development:
VITE_API_URL=http://localhost:8080

# Production (after deploying the backend, e.g. to Render):
# VITE_API_URL=https://your-backend-service.onrender.com
```

If `VITE_API_URL` is not set, the frontend falls back to `http://localhost:8080` by default (see `src/services/api.js`).

---

## 📡 API Reference

Base URL: `http://localhost:8080/api`

### Authentication — `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/register` | Register a new user account | ❌ |
| `POST` | `/auth/login` | Authenticate and receive a bearer token | ❌ |
| `POST` | `/auth/logout` | Invalidate the current session token | ✅ |
| `GET`  | `/auth/me` | Retrieve the currently authenticated user's profile | ✅ |

### Products — `/products`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/products` | List all products — optional `?category=` filter | ❌ |
| `GET` | `/products/{id}` | Retrieve a single product by ID | ❌ |
| `GET` | `/products/search?q=` | Search products by name | ❌ |
| `GET` | `/products/category/{category}` | List products in a specific category | ❌ |

### Cart — `/cart`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/cart` | Get the current user's cart | ✅ |
| `POST` | `/cart` | Add an item to the cart (merges quantity if it already exists) | ✅ |
| `PUT` | `/cart` | Replace the entire cart with a new item list | ✅ |
| `PUT` | `/cart/{productId}` | Update the quantity of a specific cart item | ✅ |
| `DELETE` | `/cart/{productId}` | Remove a specific item from the cart | ✅ |
| `DELETE` | `/cart` | Clear the entire cart | ✅ |

### Wishlist — `/wishlist`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/wishlist` | Get the current user's wishlist | ✅ |
| `POST` | `/wishlist` | Add an item to the wishlist (no duplicates) | ✅ |
| `PUT` | `/wishlist` | Replace the entire wishlist with a new item list | ✅ |
| `DELETE` | `/wishlist/{productId}` | Remove a specific item from the wishlist | ✅ |

### Orders — `/orders`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/orders` | Place a new order from the submitted items and shipping details | ✅ |
| `GET` | `/orders` | List the current user's orders, most recent first | ✅ |
| `GET` | `/orders/{orderId}` | Retrieve a specific order by ID | ✅ |

**Example — Place an Order**

```http
POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "items": [
    { "productId": 101, "name": "Wireless Headphones", "price": 2999, "discount": 10, "qty": 1 }
  ],
  "name": "Arun Kumar",
  "email": "arun@example.com",
  "phone": "+91 98765 43210",
  "address": "12 MG Road, Chennai",
  "country": "India",
  "payment": "Cash on Delivery"
}
```

**Example — Order Response**

```json
{
  "id": "1",
  "userId": "b3d2b9b0-...",
  "items": [ { "productId": 101, "name": "Wireless Headphones", "price": 2999, "discount": 10, "qty": 1 } ],
  "total": 2699.1,
  "name": "Arun Kumar",
  "email": "arun@example.com",
  "phone": "+91 98765 43210",
  "address": "12 MG Road, Chennai",
  "country": "India",
  "payment": "Cash on Delivery",
  "status": "PLACED",
  "createdAt": "2026-08-25T10:15:30Z"
}
```

All error responses follow a consistent shape via `GlobalExceptionHandler` and `ApiException`, returning an appropriate HTTP status code with a descriptive message — making it easy for the frontend to surface precise feedback to the user.

---

## 🧬 Data Model

### Product

| Field | Type | Description |
|-------|------|--------------|
| `id` | `Long` | Unique product identifier |
| `name` | `String` | Product name |
| `price` | `double` | Base price |
| `discount` | `double` | Discount percentage applied at checkout |
| `image` | `String` | Product image reference |
| `category` | `String` | Category (Electronics, Fashion, Mobile, Shoes, Appliances, Books, Makeup, Sports, Toys) |

### CartItem / WishlistItem

| Field | Type | Description |
|-------|------|--------------|
| `productId` | `Long` | Reference to the product |
| `qty` | `int` | Quantity (CartItem only) |

### Order

| Field | Type | Description |
|-------|------|--------------|
| `id` | `String` | Auto-generated order ID |
| `userId` | `String` | Owning user's ID |
| `items` | `List<CartItem>` | Items purchased |
| `total` | `double` | Server-calculated total (price − discount) × qty |
| `name`, `email`, `phone`, `address`, `country` | `String` | Shipping details |
| `payment` | `String` | Selected payment method |
| `status` | `String` | Order status (defaults to `PLACED`) |
| `createdAt` | `Instant` | Timestamp the order was placed |

### User

Stores account credentials, with passwords hashed via **BCrypt** before storage — plaintext passwords are never persisted.

---

## ☁️ Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com) → [Live Demo](https://e-commerce-frontend-alpha-lake.vercel.app/)
- **Backend:** Can be deployed to any Java-friendly host such as Render, Railway, Fly.io, or AWS Elastic Beanstalk. Build a production JAR with:

```bash
cd "E-Commerce Web Application Backend"
./mvnw clean package
java -jar target/backend.jar
```

- After deploying the backend, set `VITE_API_URL` in your Vercel project's environment variables to the deployed backend's URL, and update `CorsConfig.java` on the backend to allow your deployed frontend's origin.

---

## 🗺️ Roadmap

- [ ] Replace the in-memory store with a persistent database (PostgreSQL/MySQL) via Spring Data JPA
- [ ] Integrate a real payment gateway (Razorpay/Stripe) instead of a simulated payment method
- [ ] Add product reviews and ratings
- [ ] Add an admin dashboard for managing products and orders
- [ ] Add pagination and sorting to product listing pages
- [ ] Add unit and integration test coverage
- [ ] Add Dockerfile and docker-compose for one-command local setup
- [ ] Add CI/CD pipeline (GitHub Actions) for automated build/test/deploy

---

## 🩺 Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| "Backend was not connected" error in the UI | Backend isn't running or `VITE_API_URL` is misconfigured | Start the Spring Boot backend and confirm `.env` points to the correct URL |
| CORS errors in the browser console | Frontend origin not allowed by backend | Update `CorsConfig.java` to include your frontend's URL |
| `401 Unauthorized` on cart/wishlist/orders | Token missing or expired | Check `localStorage` for the `authToken` key; log in again |
| `mvnw: Permission denied` (macOS/Linux) | Wrapper script isn't executable | Run `chmod +x mvnw` |
| Port `8080` already in use | Another process is using the port | Change `server.port` in `application.properties` or stop the conflicting process |
| Cart/wishlist appears empty after restart | Data is in-memory only | Expected behavior — restarting the backend clears all in-memory data. Add a persistent database to retain data across restarts |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing style conventions (ESLint for the frontend) and includes clear commit messages.

---

## 📄 License

This project is available for learning, portfolio, and personal use. Feel free to fork and build on top of it — attribution is appreciated but not required.

---

## 🙏 Acknowledgements

- [React](https://react.dev/) & [Vite](https://vitejs.dev/) for a fast frontend development experience
- [Spring Boot](https://spring.io/projects/spring-boot) for a productive, convention-driven backend framework
- [Vercel](https://vercel.com/) for effortless frontend hosting

---

<div align="center">

**[⬆ Back to top](#-e-commerce-web-application)**

</div>
