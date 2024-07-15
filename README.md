# Patient-Management System

This repository contains code for a Patient Management System, which allows users to manage patients, including adding, viewing, editing, and deleting patient records. The system also provides search functionality based on patient CNIC (Computerized National Identity Card) numbers.

## Features
- Dashboard: Provides an overview of patient records.
- Add Patient: Allows users to add new patient records.
- View Patient: Displays detailed information about a specific patient.
- Edit Patient: Enables users to update patient information.
- Delete Patient: Allows users to delete patient records, with optional hard delete or soft delete functionality.
- Search Patient: Allows users to search for patients based on their CNIC numbers.

## Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB (with Mongoose ODM)
- Frontend Templating: EJS (Embedded JavaScript)
- File Upload: Multer
- Error Handling: Custom Error Handler Middleware
- Email Sending: Nodemailer
- Styling: CSS (with responsive design)

## Installation
1. Clone the repository: `git clone https://github.com/GitMuhammadAli/POS-Patient-Management.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables:
     ```
     PORT=7500
     MONGODB_URI=<your_mongodb_uri>
     SESSION_SECRET=<your_session_secret>
     MAILTRAP_USER=<your_mailtrap_username>
     MAILTRAP_PASS=<your_mailtrap_password>
     ```
4. Run the application: `npm start`
5. Access the application in your browser at `http://localhost:7500`

## Folder Structure
- `server/`: Contains backend code, including routes, controllers, middleware, and error handling.
- `database/`: Includes database connection setup.
- `uploads/`: Directory for storing uploaded patient files.
- `public/`: Contains static assets like CSS files.
- `views/`: Contains EJS templates for rendering HTML views.
- `utils/`: Utility functions and middleware.
- `models/`: Defines Mongoose schemas for database models.
- `routes/`: Defines Express routes for different functionalities.

## Usage
- Navigate to the homepage (`/`) to access the dashboard.
- Use the navigation links to add, view, edit, or delete patient records.
- Search for patients by entering their CNIC numbers in the search form.

## Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author
ALI SHAHID  - alishahids189@gmail.com

## Vedios:

https://github.com/user-attachments/assets/71205114-76b9-4850-b928-4d73442cedf1


https://github.com/user-attachments/assets/7a97e78b-30a7-4eae-934e-1748721159ef






