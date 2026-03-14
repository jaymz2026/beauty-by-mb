# Lumière Beauté Backend

Spring Boot 3 + Spring Data JPA backend for the Lumière Beauté e-commerce site.

## Prerequisites

- Java 21
- Maven 3.x
- A Supabase project (PostgreSQL)

## Setup with Supabase

1. **Database Schema**:
   - Copy the contents of `schema.sql` found in the root of the `backend` directory.
   - Go to your Supabase project -> SQL Editor.
   - Paste the SQL and run it. This will create the tables and seed them with initial data.

2. **Application Configuration**:
   - Open `src/main/resources/application.properties`.
   - Replace `YOUR_PROJECT_ID` with your Supabase project ID (found in Project Settings -> Database -> Connection string -> Host).
   - Replace `YOUR_SUPABASE_PASSWORD` with your database password.

3. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Products
- `GET /api/products`: Get all products.
- `GET /api/products?category=cleansers`: Filter products by category name.
- `GET /api/products/{id}`: Get product details.

### Journal
- `GET /api/journal`: Get all journal posts.
- `GET /api/journal/{id}`: Get journal post details.

### Categories
- Currently managed via database seed, but repositories are available for further expansion.

## Testing
Run tests using:
```bash
mvn test
```
