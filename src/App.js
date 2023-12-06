import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./utils/Helper";
import GoToTop from "./utils/GoToTop";
import Header from "./Component/Header/Header";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Footer from "./Component/Footer/Footer";
import MyBook from "./Component/MyBook/MyBook";
import BookDetails from "./Component/Book/BookDetails";
import LendBook from "./Component/Book/LendBook";
import { ToastContainer } from "react-toastify";
import Books from "./Component/Book/Books";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_BOOKS,
  GET_BORROWED_BOOKS,
  GET_LENDED_BOOKS,
} from "./Redux/Acttion/BookAction";
import { useEffect } from "react";
import BookList from "./Component/MyBook/BookList";
import ProtectedRoute from "./Component/Protected/Protected";
import PageNotFound from "./Component/PageNotFound/PageNotFound";
function App() {
  //calling api to get all books as app start
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_ALL_BOOKS());
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/mybook"
          element={
            <ProtectedRoute>
              <MyBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybook/:type"
          element={
            <ProtectedRoute>
              <BookList />
            </ProtectedRoute>
          }
        />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route
          path="/lend-new-book"
          element={
            <ProtectedRoute>
              <LendBook />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GoToTop />
      <Footer />
    </Router>
  );
}

export default App;
