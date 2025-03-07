import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
// import SearchResults from "./Components/SearchResults"; // Import SearchResults component
import PaymentPage from "./Components/PaymentPage";
import ProductDetail from "./Components/ProductDetail";
import ResetPassword from "./Components/ResetPassword";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import WishlistPage from "./Components/WishlistPage";
import Home from "./Pages/Home";
import Offers from "./Pages/Offers";
import Vmart from "./Pages/Vmart";
import CartPage from "./Components/cart";
import Profile from "./Pages/Profile";
import LoginPage from "./Components/Login";
import ProductPage from "./Components/ProductPage";
import WomenCategory from "./Components/WomenCategory";
import MenCategory from "./Components/MenCategory";
import KidsCategory from "./Components/KidsCategory";
import Register from "./Components/Register";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/men" element={<MenCategory />} />
            <Route path="/men/:categoryName" element={<MenCategory />} />
            <Route path="/kids" element={<KidsCategory />} />
            <Route path="/kids/:categoryName" element={<KidsCategory />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/vmart" element={<Vmart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:title" element={<ProductPage />} />
            <Route path="/women" element={<WomenCategory />} />
            <Route path="/women/:categoryName" element={<WomenCategory />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            {/* <Route path="/search" element={<SearchResults />} /> Route for search results */}
            <Route path="/new-arrivals" element={<ProductList />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
