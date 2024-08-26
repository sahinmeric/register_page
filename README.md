# Register Page Application

This repository contains a full-stack web application consisting of a frontend built with Angular and a backend built with .NET. The application allows users to register with their company details, including NIT, email, phone number, and password. Upon successful registration, a JWT token is generated and stored in session storage for subsequent authentication.

## Technologies Used

- **Frontend:**
  - Angular
  - TypeScript
  - Tailwind CSS
  - Angular Material for UI components
  - Netlify for deployment

- **Backend:**
  - .NET 8.0
  - C#
  - JWT Authentication
  - CORS configuration
  - Azure App Service for deployment

## Features

- User registration with form validation.
- JWT token generation upon successful registration.
- Secure API endpoints protected by JWT authentication.
- Responsive design using Tailwind CSS.
- Deployed on Netlify (frontend) and Azure App Service (backend).

## Prerequisites

- **Node.js** (for frontend development)
- **.NET SDK 8.0** (for backend development)
- **Angular CLI** (for managing Angular projects)

## Setting Up the Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd front-end
    ```

2. Install the required packages:

    ```bash
    npm install
    ```

3. Run the Angular application:

    ```bash
    ng serve
    ```

    The frontend should now be running on `http://localhost:4200`.

## Setting Up the Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend/RegisterAPI
    ```

2. Restore the required packages:

    ```bash
    dotnet restore
    ```

3. Build the application:

    ```bash
    dotnet build
    ```

4. Run the application:

    ```bash
    dotnet run
    ```

    The backend should now be running on `https://localhost:7101`.

## Running the Application Locally

- **Frontend**: The Angular application runs on `http://localhost:4200` by default.
- **Backend**: The .NET API runs on `https://localhost:7101` by default.

To test the full functionality, ensure both the frontend and backend are running simultaneously.

## Deployment

### Frontend Deployment (Netlify)

1. Build the Angular application:

    ```bash
    ng build --configuration production
    ```

2. Deploy the contents of the `dist` folder to Netlify using the Netlify CLI or web interface.

### Backend Deployment (Azure App Service)

1. Create a zip file of the contents inside the `publish` folder.
2. Deploy the zip file using the Azure CLI:

    ```bash
    az webapp deploy --resource-group MyResourceGroup --name MyDotNetApp23423 --src-path publish.zip
    ```

Ensure CORS is correctly configured on the backend to allow requests from the frontend URL.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
