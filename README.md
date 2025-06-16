# Todo App – Frontend

This is the React frontend for the Todo Application that provides user authentication and task management functionalities. It consumes a RESTful API built with Node.js and Express.

## Features

- **Authentication**
  - User login & signup
  - Update password
  - Session persistence with JWT

- **Task Management**
  - Add, edit, delete tasks
  - Mark tasks as complete or not complete
  - Inline task name editing
  - Confirmation modal for task deletion

- **UI/UX**
  - Responsive layout using Bootstrap
  - Notifications using `react-toastify`
  - Loading spinner during API calls
  - Clean and minimal design

## Tech Stack

- **React** (v19+)
- **React Router DOM**
- **Axios**
- **Bootstrap 5**
- **React Hook Form** + **Yup**
- **React Toastify**


## Getting Started

### Prerequisites

Ensure you have the backend API running locally on:  
`http://localhost:3000/api/v1`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

// src/services/axios/authorized.js
baseURL: "http://localhost:3000/api/v1",

