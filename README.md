# Bookshelf
Bookshelf is a web application designed for readers who want to digitize and manage their personal book collections.
Each book represents a specific copy on a user's shelf, including reading progress and a review.
The project's goal is to provide readers a platform to organise their home libraries, monitor their reading progress, and preserve a history of reviews and ratings, as well as share their bookshelf with the world.
Every library is public and any user can views anyone's library if they know their username.  

# Features

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


