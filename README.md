# Certificate Generator

Certificate Generator is a web application designed to automate the process of generating and managing certificates for various courses. The application allows users to request certificates, which can then be approved and generated in PDF format. The generated certificates are stored on Google Drive and can be accessed via a link.


## Features

- **CRUD Operations**: Full create, read, update, and delete functionality for certificate generation management.
- **Certificate Request**: Users can request certificates by providing necessary details.
- **Certificate Approval**: Admins can approve or reject certificate requests.
- **PDF Generation**: Generate certificate PDFs with dynamic user data.
- **Google Drive Integration**: Store generated certificates on Google Drive.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

### Frontend

- **Vite**: Fast build tool for modern web projects.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router Dom**: Declarative routing for React applications.
- **SweetAlert2**: Stylish alerts and popups.
- **sweetalert2-react-content**: SweetAlert2 integration for React.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Mongoose

### Frontend Setup

1. Navigate to the client directory:
cd ../client

2. Install dependencies:
```npm install```
OR
```yarn```

3. Create a .env file in the client directory with the following variable(s):

   - BASE_URL=<your_base_url>

4. Start the development server:
```npm run dev```
OR
```yarn dev```
