import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "@/pages/Index";
import FindHouse from "@/pages/FindHouse";
import ListProperty from "@/pages/ListProperty";
import Classifieds from "@/pages/Classifieds";
import PostClassified from "@/pages/PostClassified";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import Overview from "@/pages/dashboard/Overview";
import Products from "@/pages/dashboard/Products";
import Orders from "@/pages/dashboard/Orders";
import Settings from "@/pages/dashboard/Settings";
import ProductDetail from "@/pages/ProductDetail";
import Marketplace from "@/pages/Marketplace";
import Checkout from "@/pages/Checkout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/find-house" element={<FindHouse />} />
                  <Route path="/list-property" element={<ListProperty />} />
                  <Route path="/classifieds" element={<Classifieds />} />
                  <Route path="/post-classified" element={<PostClassified />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Overview />} />
                  <Route path="/dashboard/products" element={<Products />} />
                  <Route path="/dashboard/orders" element={<Orders />} />
                  <Route path="/dashboard/settings" element={<Settings />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;