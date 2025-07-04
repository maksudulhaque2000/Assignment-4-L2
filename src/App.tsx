import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/BookListPage";
import CreateBookPage from "./pages/CreateBookPage";
import BorrowSummaryPage from "./pages/BorrowSummaryPage";
import EditBookPage from "./pages/EditBookPage";
import BorrowPage from "./pages/BorrowPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/create-book" element={<CreateBookPage />} />
            <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
            <Route path="/borrow/:bookId" element={<BorrowPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
