# ⚡ Backend Environment Setup (`backend/.env`)

Create or update your:

```env id="jlwm92"
backend/.env
```

Paste this:

```env id="jlwm93"
MONGODB_URI=mongodb+srv://happyCart22:karthick%402004@cluster0.ks5dsvk.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=mysecretkey123

CORS_ORIGINS=http://localhost:5173,http://localhost:3000

PORT=8080

SPRING_PROFILES_ACTIVE=dev
```

---

# ▶️ Run Backend

```bash id="jlwm94"
cd backend
.\mvnw.cmd spring-boot:run
```

---

# ▶️ Run Frontend

```bash id="jlwm95"
cd frontend
npm install
npm run dev
```

---

# 🌍 Access Project

| Service     | URL                       |
| ----------- | ------------------------- |
| Frontend    | http://localhost:5173     |
| Backend API | http://localhost:8080/api |

---

# 🔐 Admin Login

```txt id="jlwm96"
Email: karthickkalaivanan101@gmail.com
```

---

# ✅ Features Enabled

* MongoDB Atlas Cloud Database
* JWT Authentication
* Admin Dashboard
* Product Management
* Cart & Wishlist
* Order Tracking
* Reviews & Ratings
* Dark Mode UI

---

<p align="center">
Built with ❤️ by Karthick Kalaivanan
</p>
