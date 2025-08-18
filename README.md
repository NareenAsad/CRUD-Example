# NestJS CRUD Mock API with Users & Items

A simple REST API built with **NestJS** that provides CRUD operations for **users** and their **items**.
This project started as a mock items CRUD API and has been extended to support **user registration, login, and user-item relationships**.

## 🚀 Features

* **Users API**: Register & login (no JWT/tokens, simple session-style auth)
* **Items API**: Full CRUD operations for items, owned by users
* **RESTful API** with proper HTTP status codes
* **TypeScript** for type safety
* **NestJS Framework** – modular, scalable, testable
* **In-Memory / SQLite (via TypeORM)** storage
* **DTO Validation** for inputs
* **Error Handling** – 400, 404, 500

---

## 📋 Prerequisites

* **Node.js** (v18+)
* **npm** or **yarn**

---

## 🛠️ Installation

```bash
git clone <your-repo>
cd nestjs-crud-mock
npm install
```

---

## 🏃‍♂️ Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## 📡 API Endpoints

Base URL: `http://localhost:3000`

### 👤 Users API

| Method | Endpoint           | Description             | Body Example                                 |
| ------ | ------------------ | ----------------------- | -------------------------------------------- |
| `POST` | `/users/register`  | Register a new user     | `{ "username": "john", "password": "1234" }` |
| `POST` | `/users/login`     | Login with credentials  | `{ "username": "john", "password": "1234" }` |
| `GET`  | `/users/:id/items` | Get all items of a user | -                                            |

---

### 📦 Items API

| Method   | Endpoint         | Description                | Request Body                                    | Response     |
| -------- | ---------------- | -------------------------- | ----------------------------------------------- | ------------ |
| `GET`    | `/items`         | Get all items              | -                                               | `[ ... ]`    |
| `GET`    | `/items/:id`     | Get single item            | -                                               | `{ ... }`    |
| `POST`   | `/items/:userId` | Create new item for a user | `{ "name": "string", "description": "string" }` | Created item |
| `PUT`    | `/items/:id`     | Update item by ID          | `{ "name": "string", "description": "string" }` | Updated item |
| `DELETE` | `/items/:id`     | Delete item by ID          | -                                               | Deleted item |

---

### 📝 Example Flows

#### 1. Register a user

```bash
POST /users/register
{
  "username": "alice",
  "password": "pass123"
}
```

#### 2. Login

```bash
POST /users/login
{
  "username": "alice",
  "password": "pass123"
}
```

#### 3. Create item for logged-in user (userId = 1)

```bash
POST /items/1
{
  "name": "Laptop",
  "description": "MacBook Pro 2023"
}
```

#### 4. Get all items for a user

```bash
GET /users/1/items
```

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── items/
│   │   ├── dto/
│   │   │   ├── create-item.dto.ts
│   │   │   └── update-item.dto.ts
│   │   ├── entities/item.entity.ts
│   │   ├── items.controller.ts
│   │   ├── items.service.ts
│   │   └── items.module.ts
│   │
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── login-user.dto.ts
│   │   ├── entities/user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   └── seed/
│       ├── seed.service.ts
│
├── app.module.ts
└── main.ts
```

---

## 🧪 Testing

```bash
npm run test
npm run test:e2e
```

---

## 🔧 Development

```bash
npm run lint
npm run format
```

---

## 📦 Dependencies

* `@nestjs/common`, `@nestjs/core`, `@nestjs/typeorm`
* `class-validator`, `class-transformer`
* `reflect-metadata`, `rxjs`
* `typescript`

---

**✅ Current State (Aug 2025):**
The project now supports **users & items with relationships**, working **register, login, and item ownership**, no tokens used (simple auth simulation).
