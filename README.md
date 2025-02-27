DigiWell - A Mental Health Application
======================================

About the Project
-----------------

DigiWell is a mental health application designed to help users track their mood, practice meditation, and receive AI-powered mental health support. The application consists of a **React.js frontend** and an **Express.js backend** that work together to provide a seamless experience.

Getting Started
---------------

### Prerequisites

Ensure you have the following installed on your system:

*   **Node.js** (Latest LTS version recommended)
    
*   **npm** or **yarn**
    
*   **MongoDB** (For local database or use MongoDB Atlas)
    

Installation and Running the Project
------------------------------------

### 1\. Clone the Repository

Clone the project repository from GitHub and navigate into the project directory:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   shCopyEditgit clone https://github.com/your-username/DigiWell.git  cd DigiWell   `

### 2\. Start the Backend Server

Navigate to the backend folder and install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   shCopyEditcd backend  npm install   `

Run the Express.js server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   shCopyEditnpm start   `

By default, the backend runs on [**http://localhost:5000**](http://localhost:5000).

### 3\. Start the Frontend (React App)

Go back to the root directory and install dependencies:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   shCopyEditcd ..  npm install   `

Run the React development server:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   shCopyEditnpm start   `

The application will open in your browser at [**http://localhost:3000**](http://localhost:3000).

Available Scripts
-----------------

### Backend

Inside the backend folder, you can run the following commands:

*   **npm start** - Starts the Express server.
    
*   **npm run dev** - Runs the server with nodemon for live reloading.
    

### Frontend

Inside the root project directory, you can run:

*   **npm start** - Runs the app in development mode.
    
*   **npm test** - Launches the test runner.
    
*   **npm run build** - Builds the app for production.
    

API Endpoints
-------------

Below are the available API endpoints:

MethodEndpointDescriptionGET/api/moodFetch user mood historyPOST/api/moodLog a new mood entryGET/api/meditationGet meditation recommendationsPOST/api/alertSend emergency alert (Twilio)

Deployment
----------

To deploy the application, you can use:

*   **Vercel / Netlify** for frontend deployment.
    
*   **Render / Heroku** for backend deployment.
    

Troubleshooting
---------------

If you encounter any issues, consider the following:

*   **Backend not connecting?** Ensure MongoDB is running and correctly configured in the .env file.
    
*   **CORS issues?** Check the cors middleware in backend/server.js.
    
*   **Frontend not loading data?** Verify the API base URL in src/config.js.
    

🚀 **Enjoy using DigiWell! Your mental health companion.**
