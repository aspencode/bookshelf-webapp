# Bookshelf

Bookshelf is a web application for managing a personal book collection.

Each book represents a specific copy on a user's shelf, including reading progress and reviews.

  

## Services

  

### Backend

- API: http://localhost:3001

- Swagger: http://localhost:3001/api-docs

  

### Frontend

- Web app: http://localhost:3000

  

## Prerequisites

  
- Docker Compose

  

### Windows Requirements

Docker Desktop on Windows uses WSL 2 to run Linux containers.

  

Make sure:

- WSL 2 is installed

- Docker Desktop has WSL 2 integration enabled

  

> If WSL 2 is not installed, Docker Desktop will prompt you to install it during setup.

  

---

  

## Setup

  

1. Clone the repository:

```

git clone https://github.com/aspencode/bookshelf-webapp

cd bookshelf-webapp

```

2. Create an environment file:

  
```
cp .env.example .env
```
  
  

## Running in docker-compose

  

on windows, you have to have WSL and enable the WSL 2 integration.

  

### Dev mode

  

run
```
docker compose -f compose.dev.yaml up --build
```

### Production mode

  

run
```
docker compose -f compose.prod.yaml up --build
```