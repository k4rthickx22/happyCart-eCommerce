# 🛒 happyCart — Full Stack E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

<p align="center">
  A modern, scalable <strong>Full-Stack E-Commerce Web Application</strong> built with <strong>Spring Boot</strong>, <strong>React 18</strong>, and <strong>MongoDB Atlas</strong>.<br/>
  Fully deployed — Backend on <strong>Railway</strong>, Frontend on <strong>Vercel</strong>.
</p>

<p align="center">
  <a href="https://happy-cart-e-commerce.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐 Live Demo-happy--cart--e--commerce.vercel.app-blue?style=for-the-badge"/>
  </a>
</p>

---

## 🚀 Features

### 👤 User Features
| Feature | Description |
|---|---|
| 🔐 Auth | JWT-based Login & Signup with token refresh |
| 🛍️ Products | Browse, search, filter by category, price, rating |
| 🛒 Cart | Add/remove items, quantity controls, price summary |
| ❤️ Wishlist | Save products for later |
| 📦 Orders | Place orders, track status, view history |
| ⭐ Reviews | Read and write product reviews with star ratings |
| 🌙 Dark Mode | System-aware theme toggle |
| 📱 Responsive | Fully mobile-optimized UI with drawer navigation |

### 🛠️ Admin Features
| Feature | Description |
|---|---|
| 📊 Dashboard | Sales stats, top products, recent activity |
| 📦 Products | Create, edit, delete, toggle featured/active |
| 📂 Categories | Manage product categories and hierarchy |
| 👥 Users | View, activate/deactivate, change roles |
| 📋 Orders | Update order status and add tracking numbers |
| 📈 Inventory | Real-time stock control |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 17, Spring Boot 3, Spring Security, JWT |
| **Database** | MongoDB Atlas (Spring Data MongoDB) |
| **Frontend** | React 18, Vite, Tailwind CSS, Zustand |
| **Deployment** | Railway (Backend), Vercel (Frontend) |
| **Container** | Docker (multi-stage build) |

---

## 📂 Project Structure

```
happyCart-eCommerce/
├── backend/                      # Spring Boot API
│   ├── src/main/java/com/ecommerce/
│   │   ├── config/               # Security, CORS, DataSeeder
│   │   ├── controller/           # REST controllers
│   │   ├── dto/                  # Data Transfer Objects
│   │   ├── model/                # MongoDB documents
│   │   ├── repository/           # Spring Data repositories
│   │   ├── security/             # JWT filter & utilities
│   │   └── service/              # Business logic
│   ├── src/main/resources/
│   │   └── application.yml       # App config (env-driven)
│   └── Dockerfile                # Multi-stage Docker build
│
├── frontend/                     # React + Vite app
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   ├── product/          # ProductCard
│   │   │   ├── category/         # CategoryGrid
│   │   │   └── ui/               # Spinners, badges, etc.
│   │   ├── pages/                # Route-level pages
│   │   ├── services/             # Axios API client
│   │   └── store/                # Zustand state (auth, cart, wishlist)
│   ├── .env.production           # Production API URL
│   └── tailwind.config.js
│
├── railway.json                  # Railway deployment config
└── render.yaml                   # Legacy Render config (unused)
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.9+
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/k4rthickx22/happyCart-eCommerce.git
cd happyCart-eCommerce
```

### 2. Backend Setup

Create `backend/.env` (or set environment variables):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce
JWT_SECRET=yourSuperSecretKeyAtLeast256BitsLong
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
PORT=8080
```

Run the backend:

```bash
cd backend
# Windows
.\mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
```

Backend starts at: `http://localhost:8080`

> 💡 The `DataSeeder` automatically seeds **8 categories** and **64 products** on first run.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: `http://localhost:5173`

> The Vite dev server proxies `/api` → `http://localhost:8080` automatically.

---

## 🌍 Environment Variables

### Backend (Railway / local)

| Variable | Description | Default |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | Required |
| `JWT_SECRET` | JWT signing secret (min 256 bits) | Required |
| `CORS_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173,...` |
| `PORT` | Server port | `8080` |

### Frontend (Vercel / local)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

**Production value:**
```
VITE_API_URL=https://happycart-backend-production-0ee8.up.railway.app/api
```

---

## 🐳 Docker (Backend)

The backend uses a **multi-stage Docker build**:

```bash
cd backend
docker build -t happycart-backend .
docker run -p 8080:8080 \
  -e MONGODB_URI=your_uri \
  -e JWT_SECRET=your_secret \
  -e CORS_ORIGINS=http://localhost:5173 \
  happycart-backend
```

---

## 🌐 Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [happy-cart-e-commerce.vercel.app](https://happy-cart-e-commerce.vercel.app) |
| Backend | Railway | [happycart-backend-production-0ee8.up.railway.app](https://happycart-backend-production-0ee8.up.railway.app) |
| Database | MongoDB Atlas | Cloud-hosted |

### Deploy Backend to Railway
1. Connect your GitHub repo to Railway
2. Set root directory to `/backend` (or use `railway.json`)
3. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGINS`
4. Railway auto-deploys on every push to `main`

### Deploy Frontend to Vercel
1. Connect your GitHub repo to Vercel
2. Set framework preset to **Vite**, root directory to `frontend/`
3. Add environment variable: `VITE_API_URL=<your_railway_backend_url>/api`
4. Vercel auto-deploys on every push to `main`

---

## 📡 API Endpoints (Sample)

```
GET    /api/products              → All products (paginated, filterable)
GET    /api/products/:id          → Product detail
GET    /api/products/featured     → Featured products
GET    /api/categories            → All categories
POST   /api/auth/login            → Login (returns JWT)
POST   /api/auth/register         → Register new user
GET    /api/cart                  → Get user cart          [Auth]
POST   /api/cart/add              → Add item to cart       [Auth]
POST   /api/orders                → Place order            [Auth]
GET    /api/orders                → User order history     [Auth]
GET    /api/admin/dashboard/stats → Admin stats            [Admin]
```

---

## ✨ Highlights

- ✅ **JWT Auth** — Stateless authentication with token stored in Zustand
- ✅ **CORS** — Whitelist-based origin control, whitespace-safe parsing
- ✅ **Auto Data Seeding** — 64 products across 8 categories on first boot
- ✅ **Mobile-First UI** — 2-column product grid, drawer filters, tap-optimized cards
- ✅ **Dark Mode** — System-preference aware, persisted in localStorage
- ✅ **Dockerized** — Multi-stage build for lean production images
- ✅ **Lazy Loading** — All pages are code-split via React `lazy()`

---

## 👨‍💻 Developer

### Karthick Kalaivanan

- 🔗 **GitHub**: [github.com/k4rthickx22](https://github.com/k4rthickx22)
- 💼 **LinkedIn**: [linkedin.com/in/k4rthick22](https://www.linkedin.com/in/k4rthick22/)
- 📧 **Email**: [karthickkalaivanan101@gmail.com](mailto:karthickkalaivanan101@gmail.com)

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ by Karthick Kalaivanan</p>
