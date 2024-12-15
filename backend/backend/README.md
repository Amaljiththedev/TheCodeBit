
# Backend Setup and Instructions

## Overview

This document provides instructions to set up and run the backend for the project. The backend is built using **Django** and **Django REST Framework (DRF)** with **Django Channels** for WebSocket support. It uses **Redis** for caching and WebSocket Pub/Sub, **Celery** for background task management, and **PostgreSQL** as the database.

## Prerequisites

Make sure the following are installed on your system:

- **Python** (version 3.8 or higher)
- **PostgreSQL** (latest stable version)
- **Redis** (latest stable version)
- **pip** (Python package manager)
- **virtualenv** (optional, for creating a virtual environment)

## Installation Steps

1. **Clone the Repository:**
    
    ```
    git clone <repository-url>
    cd <repository-folder>
    ```
    
2. **Set Up a Virtual Environment:**
    
    It is recommended to create a virtual environment to isolate dependencies.
    
    ```
    python3 -m venv venv
    source venv/bin/activate  # For Linux/Mac
    venv\Scripts\activate  # For Windows
    ```
    
3. **Install Dependencies:**
    
    Install the required Python packages using `pip`:
    
    ```
    pip install -r requirements.txt
    ```
    
4. **Configure the Environment Variables:**
    
    Create a `.env` file in the project root directory and define the following variables:
    
    ```
    DEBUG=True
    SECRET_KEY=<your-secret-key>
    DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database-name>
    REDIS_URL=redis://localhost:6379/0
    CELERY_BROKER_URL=redis://localhost:6379/0
    ALLOWED_HOSTS=127.0.0.1,localhost
    ```
    
5. **Apply Migrations:**
    
    Run the following commands to apply database migrations:
    
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
    
6. **Create a Superuser (Optional):**
    
    To access the admin panel, create a superuser:
    
    ```
    python manage.py createsuperuser
    ```
    
7. **Run Redis:**
    
    Start the Redis server if it's not already running:
    
    ```
    redis-server
    ```
    
8. **Start Celery Worker (Optional):**
    
    If you are using Celery for background tasks, start a worker:
    
    ```
    celery -A <project-name> worker --loglevel=info
    ```
    
9. **Run the Development Server:**
    
    Start the Django development server:
    
    ```
    python manage.py runserver
    ```
    
    The server will run at `http://127.0.0.1:8000/` by default.
    
10. **Run WebSocket Server (Django Channels):**
    
    Ensure the WebSocket server is configured in `settings.py` and running with the development server.
    

## Testing

Run tests using Django's testing framework:

```
python manage.py test
```

## Useful Commands

- **Run the server:**
    
    ```
    python manage.py runserver
    ```
    
- **Make migrations:**
    
    ```
    python manage.py makemigrations
    ```
    
- **Apply migrations:**
    
    ```
    python manage.py migrate
    ```
    
- **Start Celery worker:**
    
    ```
    celery -A <project-name> worker --loglevel=info
    ```
    
- **Clear Redis cache:**
    
    ```
    redis-cli FLUSHALL
    ```
    

## Additional Notes

- Ensure you have proper configurations for production in `settings.py`, such as setting `DEBUG=False` and adding `ALLOWED_HOSTS`.
- Use tools like `gunicorn` and `nginx` for production deployment.

For any issues, refer to the project's documentation or contact the developer.

Backend/
├── users/                     # Handles user authentication and profiles
├── projects/                  # Core project logic (e.g., CRUD operations)
├── collaboration/             # Real-time collaboration (e.g., live editing)
├── tasks/                     # Background tasks (e.g., notifications)
├── realtime/                  # WebSocket-based features (chat, status updates)
├── payments/                  # Optional: Payments and subscriptions
├── analytics/                 # Optional: Analytics and tracking