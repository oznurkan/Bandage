import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyToken } from "./store/actions/clientActions";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ScrollToTop from "./components/Scrolltop/ScrollToTop";
import OrderPage from "./pages/OrderPage";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Router/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="shop" element={<ShopPage key={location.pathname} />} />
          <Route
            path="/shop/:gender/:categoryName/:categoryId"
            element={<ShopPage key={location.pathname} />}
          />
          <Route path="blog" element={<BlogPage />} />
          <Route
            path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
