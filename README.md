# 📚 Minimal Library Management System (Frontend)

This project is a clean, functional, and responsive client-side application for managing a library system. It interacts with a RESTful API (developed separately) to allow users to view, manage, and borrow books efficiently. The focus is on demonstrating proper state management, UI design, and core functionality without authentication or complex category filters.

## ✨ Features

-   **Public Routes:** All pages are accessible without login or authentication, focusing purely on essential book and borrowing functionalities.
-   **Book Management:**
    -   **Book List Table:** Displays all books in a table format with columns for Title, Author, Genre, ISBN, Copies, Availability, and Action buttons.
    -   **Add New Book:** A dedicated form to create and add new book records to the system. After creation, the UI updates instantly.
    -   **Edit Book:** Allows users to modify existing book details through a form pre-populated with current data. Updates are reflected in the UI immediately.
    -   **Delete Book:** Provides a confirmation dialog (using SweetAlert2) before permanently removing a book from the system. The UI updates in real-time.
    -   **Pagination:** Efficiently displays large lists of books by dividing them into pages (10 items per page by default), with navigation controls (Previous, Next, page numbers) and total item count.
-   **Borrowing Functionality:**
    -   **Borrow Book Form:** A simple form accessible from the book list to borrow a selected book. Includes input for quantity and due date.
    -   **Business Logic Enforcement:** Quantity cannot exceed available copies. If copies reach 0, the book is marked unavailable.
-   **Borrow Summary:** Displays an aggregated summary of all borrowed books, including Book Title, ISBN, and Total Quantity Borrowed, retrieved from the backend's aggregation API.
-   **Responsive Navigation Bar:** Collapses into a "hamburger" menu icon on smaller devices, providing easy access to navigation links.
-   **Intuitive UI/UX:**
    -   **Minimalist Design:** Clean and feature-rich UI built with **Tailwind CSS**.
    -   **User Feedback:** Implements **Toast notifications (react-toastify)** for success/error messages after API operations.
    -   **Interactive Alerts:** Uses **SweetAlert2** for prominent confirmations (e.g., delete) and input validation errors.
    -   **Real-time UI Updates:** Achieved using **RTK Query's tag invalidation** system, ensuring the UI reflects changes immediately after CRUD or borrow operations without manual page refresh.
    -   **Loading Indicators:** Displays a loading spinner when data is being fetched or mutations are in progress, enhancing user experience.
-   **Customizable Title & Favicon:** Easily change the browser tab title and favicon.
-   **404 Not Found Page:** A dedicated page displayed when a user navigates to an undefined route on the frontend.

## 🚀 Technologies Used

-   **React.js:** A JavaScript library for building user interfaces.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
-   **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development.
-   **Redux Toolkit Query (RTK Query):** A powerful data fetching and caching library built on top of Redux Toolkit, used for seamless API integration and state management.
-   **React Router DOM:** For declarative routing in React applications.
-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
-   **react-toastify:** For displaying simple, non-blocking toast notifications.
-   **sweetalert2:** For creating beautiful, customizable, and responsive JavaScript alert boxes.
-   **sweetalert2-react-content:** To easily integrate React components within SweetAlert2 dialogs.
-   **ESLint:** Pluggable linting utility for consistent code quality and style.
-   **Prettier:** An opinionated code formatter integrated with ESLint for consistent formatting.

## 🔗 Backend Integration

This frontend application consumes a separate RESTful API. The API handles data persistence (MongoDB), business logic, and provides the necessary endpoints for book management and borrowing operations.

-   **Backend Repository:** [Link to your Backend GitHub Repo Here] (e.g., `https://github.com/your-username/library-management-api`)
-   **Backend API Base URL (Deployed):** `https://assignment-3-l2-three.vercel.app/api` (Configured in `.env`)

## 🛠️ Setup & Installation

Follow these steps to get the frontend project up and running on your local machine.

### Prerequisites

-   **Node.js:** Ensure you have Node.js (LTS version recommended) installed. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm:** Node Package Manager (comes with Node.js).
-   **Backend API:** Ensure your backend API is running locally or deployed (and accessible via `REACT_APP_API_BASE_URL`).

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/library-management-frontend.git](https://github.com/your-username/library-management-frontend.git) # Replace with your actual repo URL
    cd library-management-frontend
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter peer dependency conflicts with React 19, `npm` might suggest `--force`. If you prefer not to force, you may need to explicitly downgrade `react` and `react-dom` to version `18.x.x` (e.g., `npm install react@18.2.0 react-dom@18.2.0`) and then run `npm install` again. Follow prompts if any.*

3.  **Create a `.env` file:**
    In the root directory of your project, create a file named `.env` and add your backend API's base URL:

    ```env
    # .env
    REACT_APP_API_BASE_URL=[https://assignment-3-l2-three.vercel.app/api](https://assignment-3-l2-three.vercel.app/api) # Your deployed Backend API URL
    ```

## 🚀 Available Scripts

In the project directory, you can run:

-   **`npm start`**:
    Runs the app in the development mode.
    Open [http://localhost:3000](http://localhost:3000) (or another port if 3000 is occupied) to view it in your browser.
    The page will reload when you make changes. You may also see any lint errors in the console.

-   **`npm test`**:
    Launches the test runner in the interactive watch mode.

-   **`npm run build`**:
    Builds the app for production to the `build` folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.
    The build is minified and the filenames include the hashes.
    Your app is ready to be deployed!

-   **`npm run eject`**:
    **Note: this is a one-way operation. Once you `eject`, you can't go back!**
    If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

## 🌐 Page List / Routes

-   `/` (Home Page): Displays a welcome message and general information about the system.
-   `/books`: Lists all books available in the library with pagination, and provides actions (Edit, Delete, Borrow).
-   `/create-book`: A form to add a new book record.
-   `/edit-book/:id`: A form to update details of an existing book by its ID.
-   `/borrow/:bookId`: A form to borrow a specific book by its ID.
-   `/borrow-summary`: Displays an aggregated summary of all borrowed books.
-   `*` (Any other path): Navigates to a 404 Not Found page.

## 🚀 Deployment

This frontend application is designed to be deployed on platforms like Vercel, Netlify, or similar static site hosts.

-   **Vercel Deployment:** Configure a `vercel.json` file in the project root if needed for specific build commands or environment variables, although Create React App builds are often detected automatically. Ensure `REACT_APP_API_BASE_URL` is set as an Environment Variable in your Vercel project settings.

## 🤝 Contributing

Feel free to fork the repository, open issues, or submit pull requests if you have suggestions or improvements!

## 📄 License
