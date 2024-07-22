# ESX Homework

# Laravel [Breeze API & Next.js](https://github.com/laravel/breeze-next/) CRUD Application

This project is a full-stack web application using Laravel Breeze API with Sanctum for the backend and Next.js with React for the frontend. It provides basic CRUD operations for user management.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [PHP](https://www.php.net/downloads.php) (>=8.0)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (>=20.x)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://www.docker.com/products/docker-desktop) (if you plan to use Warden)
- [Warden](https://github.com/wardenenv/warden)

## Getting Started

### Backend Setup (Laravel)

1. **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
    ```

2. **Install dependencies**

    ```sh
    composer install
    ```

3. **Copy the example environment file and update the environment variables**

    ```sh
    cp .env.example .env
    ```

    - Update the `.env` file with your database credentials and other environment variables. If you are using Warden, the defaults should work out of the box.

### If you are using Warden, start the env (``warden env up``), generate sign certficate (``warden sign-certificate esx.test``) and run the rest of the commands in ``warden shell``, including the frontend setup.

4. **Generate the application key**

    ```sh
    php artisan key:generate
    ```

5. **Run the database migrations and seeders**

    ```sh
    php artisan migrate --seed
    ```

6. **Start the Laravel development server (not necessary if using warden)**

    ```sh
    php artisan serve
    ```

### Frontend Setup (Next.js)

1. **Navigate to the frontend directory**

    ```sh
    cd frontend
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Edit `.env.local` file in the frontend directory and add your environment variables. If you are using Warden, the existing one will work out of the box.**


   Add the following environment variables to the `.env.local` file, adjusting the values as needed:

    ```plaintext
    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
    ```

4. **Run the development server**

    ```sh
    npm run dev
    ```

5. **Open your browser and navigate to**

    ```sh
    https://frontend.esx.test or http://localhost:3000
    ```

## Project Structure

```plaintext
yourproject/
├── /               # Laravel API backend
├── frontend/       # Next.js frontend
```

## Project URLs if using Warden with the provided .env
#### [https://app.esx.test](https://app.esx.test) -> APP_URL
#### [https://frontend.esx.test](https://frontend.esx.test) -> FRONTEND_URL

## Backend (Laravel)

- routes/api.php: Contains API routes for the application.
- app/Http/Controllers: Contains the UserController for CRUD operations.
- database/migrations: Contains migration files for the database schema.
- database/seeders: Contains seeders for populating the database with initial data.

## Frontend (Next.js)

- src/app/: Contains Next.js pages.
- src/components/: Contains React components.
- src/hooks/: Contains custom React hooks for authentication.

## Usage

### Authentication

- Register a new user at http://localhost:3000/register.
- Log in with the registered user at http://localhost:3000/login.

### User Management

After logging in, navigate to http://localhost:3000/dashboard to manage users. You can create, read, update, and delete users from this interface.
