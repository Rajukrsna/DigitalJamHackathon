
`# DigiWell - A Mental Health Application

## About the Project
DigiWell is a mental health application designed to help users track their mood, practice meditation, and receive AI-powered mental health support. The application consists of a **React.js frontend** and an **Express.js backend** that work together to provide a seamless experience.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn**
- **MongoDB** (For local database or use MongoDB Atlas)

## Installation and Running the Project

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/DigiWell.git
cd DigiWell `

### 2\. Start the Backend Server

Navigate to the `backend` folder and install dependencies:

sh

CopyEdit

`cd backend
npm install`

Run the Express.js server:

sh

CopyEdit

`npm start`

By default, the backend runs on **<http://localhost:5000>**.

### 3\. Start the Frontend (React App)

Go back to the root directory and install dependencies:

sh

CopyEdit

`cd handwriting-recognition..
npm install`

similarly go to the backend folder and type npm install

Run the React development server:

sh

CopyEdit

`npm start`

The application will open in your browser at **<http://localhost:3000>**.

Available Scripts
-----------------

### Backend

Inside the `backend` folder, you can run:

-   **`npx nodemon server.js`** - Starts the Express server.

### Frontend

Inside the root project directory, you can run:

-   **`npm start`** - Runs the app in development mode.
-   **`npm test`** - Launches the test runner.
-   **`npm run build`** - Builds the app for production.

API Endpoints
-------------

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/mood` | Fetch user mood history |
| POST | `/api/mood` | Log a new mood entry |
| GET | `/api/meditation` | Get meditation recommendations |
| POST | `/api/alert` | Send emergency alert (Twilio) |

Deployment
----------

To deploy the application, you can use:

-   **Vercel / Netlify** for frontend deployment.
-   **Render / Heroku** for backend deployment.

Troubleshooting
---------------

-   **Backend not connecting?** Ensure MongoDB is running and correctly configured in `.env`.
-   **CORS issues?** Check `cors` middleware in `backend/server.js`.
-   **Frontend not loading data?** Verify the API base URL in `src/config.js`.

🚀 **Enjoy using DigiWell! Your mental health companion.**



