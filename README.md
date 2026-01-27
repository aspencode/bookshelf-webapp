# Bookshelf
Bookshelf is a web application designed for readers who want to digitize and manage their personal book collections.
Each book represents a specific copy on a user's shelf, including reading progress and a review.
The project's goal is to provide readers a platform to organise their home libraries, monitor their reading progress, and preserve a history of reviews and ratings, as well as share their bookshelf with the world.
Every library is public and any user can views anyone's library if they know their username.  

# Roadmap

The project is a work-in-progress, and not all planned features have been fully implemented yet.

## Infrastructure & DevOps
- [x] Docker Integration: Fully containerized environment.
    - [x] compose.dev.yaml for local development with hot-reload.
    - [x] compose.prod.yaml for production-ready deployment.
- [x] API Documentation: Automated Swagger/OpenAPI documentation.

## Security and Auth:
- [x] JWT Authentication: Secure token-based communication between Frontend and Backend.
- [ ] User Access:
    - [x] Backend logic for Register/Login.
    - [ ] Frontend UI for Authentication.

## Core Business Logic:
- [x] Public Library Access: Users can browse collections of other registered users. 
    - [x] List book view
    - [x] Detailed book view
- [ ] Advanced Browsing: Search and filter
    - [ ] Search for a book by title or author
    - [ ] Sort/Filter books depending on reading status: tbr, in-progress or read
    - [ ] Sort/Filter books depending on their rating
    - [ ] Sort/Filter books depending on page count
    - [ ] Sort/Filter books depending on format (physical/digital/audiobook)
- [ ] Collection Management: Add, edit, and remove books from your digital shelf.
    - [x] CRUD operations for books (Backend).
    - [ ] Library management dashboard (Frontend).
- [ ] Progress tracking: Visual indicators for reading progress (% of book read).
    - [x] Progress visualization on Frontend.
    - [ ] Interactive progress updates (Frontend UI)

# Technologies used
## Backend:
* NodeJS
* NestJS
* TypeScript
* TypeORM
* Swagger
* JWT
* PostgreSQL
## Frontend:
* React using CRA
* Axios
* Typescript
## Infrastructure & Tools:
* Docker & Docker Compose
* Git


# Installation & Getting started
## Prerequisites
* Docker & Docker Compose: The primary tool for running the application.
* Git: To clone the repository. (Optional)
### Windows Requirements
Docker Desktop on Windows requires WSL 2 (Windows Subsystem for Linux) to run containers efficiently.
* Ensure WSL 2 is installed on your system.
* In Docker Desktop settings, verify that WSL 2 integration is enabled.
> Note: If WSL 2 is missing, Docker Desktop will prompt you to install it during setup.
## Setup
### Cloning the repository
If you have git, you can clone the repository using this command in your terminal:
```
git clone https://github.com/aspencode/bookshelf-webapp
cd bookshelf-webapp
```
If you don't have git, you can download the code manually using github's UI.
### Envinroment configuration
Create a local environment file by copying the provided example. This file contains database credentials and API configuration.
Replace the example values by your own as you wish.

There are two envinroment files: one in the main folder (.) and one inside frontend (./frontend)


```
cp .env.example .env
cp ./frontend/.env-example ./frontend/.env
```


## Running the application
### Development mode
Use this mode if you plan to modify the code. It includes hot-reload, so changes in your files will reflect immediately.
```
docker compose -f compose.dev.yaml build
docker compose -f compose.dev.yaml up
```
### Production mode
Use this mode to see how the application performs in a stable, optimized environment.
```
docker compose -f compose.prod.yaml build
docker compose -f compose.prod.yaml up
```

## Accessing the services
Once the containers are up and running, you can access the following interfaces:
| Service     | URL                            | Description                                     |
|-------------|--------------------------------|-------------------------------------------------|
| Frontend    | http://localhost:3000          | The main web application interface.             |
| Backend API | http://localhost:3001          | The REST API server.                            |
| Swagger UI  | http://localhost:3001/api-docs | Interactive API documentation and testing tool. |


## Code and Configuration
### Version Control

The project is maintained in a Git repository hosted on GitHub.
Git is used for:
* tracking incremental development,
* separating features into logical commits,
* enabling reproducible builds and deployments.

The repository contains both frontend and backend code in a single mono-repository, which simplifies development and deployment using Docker Compose.

### Configuration Files

The application relies on environment-based configuration.

Key configuration files include:

* .env – backend configuration (database, JWT secret, ports),
* frontend/.env – frontend configuration (API base URL),
* compose.dev.yaml – Docker Compose configuration for development,
* compose.prod.yaml – Docker Compose configuration for production.

Environment variables are used to avoid hardcoding sensitive data such as database credentials and secret keys.

# Implemented Features
## User and Library Features

### Public user libraries
Every user has a publicly accessible bookshelf available under `/bookshelf/{username}`.
Any visitor can browse a user’s collection without authentication.
###  Book representation
Each book represents a concrete copy owned by a user, including:
* title and author,
* format (physical, digital, audiobook),
* reading progress,
* rating and review text.
### Reading progress tracking
The application supports tracking reading progress using:
* bookmark position,
* start and finish dates,
* last read date,
* visual progress indicators on the frontend.

# Project structure
## From the main file
```
.
├── api
├── compose.dev.yaml
├── compose.prod.yaml
├── frontend
├── package-lock.json
└── README.md
```
## Backend (API)
```
.
├── Dockerfile.dev
├── Dockerfile.prod
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   ├── auth.service.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt.strategy.ts
│   ├── books
│   │   ├── books.controller.spec.ts
│   │   ├── books.controller.ts
│   │   ├── books.module.ts
│   │   ├── books.service.spec.ts
│   │   ├── books.service.ts
│   │   ├── dto
│   │   │   ├── create-book.dto.ts
│   │   │   └── update-book.dto.ts
│   │   ├── entities
│   │   │   └── book.entity.ts
│   │   └── enums
│   │       └── book-format.enum.ts
│   ├── data-source.ts
│   ├── main.ts
│   └── users
│       ├── dto
│       │   ├── create-user.dto.ts
│       │   ├── login.dto.ts
│       │   ├── update-user.dto.ts
│       │   └── user-response.dto.ts
│       ├── entities
│       │   └── user.entity.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json

```
## Frontend
```
.
├── Dockerfile.dev
├── Dockerfile.prod
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── api.ts
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── BookCard.tsx
│   │   └── StarRating.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── BookDetailsPage.tsx
│   │   └── BookshelfPage.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
└── tsconfig.json

```