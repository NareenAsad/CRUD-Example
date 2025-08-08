# NestJS CRUD Mock API

A simple REST API built with NestJS that provides CRUD (Create, Read, Update, Delete) operations for items. This project serves as a mock API with in-memory data storage.

## 🚀 Features

- **RESTful API** - Full CRUD operations for items
- **TypeScript** - Built with TypeScript for type safety
- **NestJS Framework** - Modern, scalable Node.js framework
- **In-Memory Storage** - Simple mock data storage (no database required)
- **DTO Validation** - Request/response data transfer objects
- **Error Handling** - Proper HTTP status codes and error messages
- **Code Formatting** - Prettier and ESLint for consistent code style

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd nestjs-crud-mock
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run start:dev
```
This will start the application in watch mode, automatically restarting when files change.

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## 📡 API Endpoints

The API runs on `http://localhost:3000` by default.

### Items API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/items` | Get all items | - | Array of items |
| `GET` | `/items/:id` | Get item by ID | - | Single item |
| `POST` | `/items` | Create new item | `{ "name": "string", "description": "string" }` | Created item |
| `PUT` | `/items/:id` | Update item by ID | `{ "name": "string", "description": "string" }` | Updated item |
| `DELETE` | `/items/:id` | Delete item by ID | - | Deleted item |

### Item Object Structure

```typescript
interface Item {
  id: number;
  name: string;
  description: string;
}
```

## 📝 API Examples

### Postman Collection

A complete Postman collection is included in the project: `postman_collection.json`

**To import the collection:**
1. Open Postman
2. Click "Import" 
3. Select the `postman_collection.json` file
4. The collection will be imported with all CRUD endpoints ready to test

### Create an Item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Item",
    "description": "This is a sample item description"
  }'
```

### Get All Items
```bash
curl -X GET http://localhost:3000/items
```

### Get Item by ID
```bash
curl -X GET http://localhost:3000/items/1
```

### Update an Item
```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Item",
    "description": "This item has been updated"
  }'
```

### Delete an Item
```bash
curl -X DELETE http://localhost:3000/items/1
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:cov
```

### Run E2E Tests
```bash
npm run test:e2e
```

## 🔧 Development

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── items/
│   ├── dto/
│   │   ├── create-item.dto.ts
│   │   └── update-item.dto.ts
│   ├── items.controller.ts
│   ├── items.service.ts
│   └── items.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

### Key Files

- **`main.ts`** - Application entry point
- **`app.module.ts`** - Root module configuration
- **`items/`** - Items feature module
  - **`items.controller.ts`** - HTTP request handling
  - **`items.service.ts`** - Business logic and data management
  - **`dto/`** - Data Transfer Objects for request/response validation

## 🛡️ Error Handling

The API includes proper error handling:

- **404 Not Found** - When trying to access, update, or delete a non-existent item
- **400 Bad Request** - When request body is invalid
- **500 Internal Server Error** - For unexpected server errors

## 🔄 Data Persistence

This is a mock API that uses in-memory storage. Data will be lost when the server restarts. In a production environment, you would typically:

1. Add a database (PostgreSQL, MongoDB, etc.)
2. Implement proper data persistence
3. Add authentication and authorization
4. Add input validation and sanitization
5. Implement logging and monitoring

## 📦 Dependencies

### Production Dependencies
- `@nestjs/common` - NestJS common utilities
- `@nestjs/core` - NestJS core framework
- `@nestjs/mapped-types` - Type utilities for DTOs
- `@nestjs/platform-express` - Express.js integration
- `reflect-metadata` - Metadata reflection
- `rxjs` - Reactive programming library

### Development Dependencies
- `@nestjs/cli` - NestJS command-line interface
- `@nestjs/testing` - Testing utilities
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing framework
- `typescript` - TypeScript compiler

## 📄 License

This project is unlicensed. See the `package.json` file for details.

---

**Happy coding! 🎉**