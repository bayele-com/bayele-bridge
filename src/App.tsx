import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Loader2 } from "lucide-react";

const Index = lazy(() => import("@/pages/Index"));
const FindHouse = lazy(() => import("@/pages/FindHouse"));
const ListProperty = lazy(() => import("@/pages/ListProperty"));
const Classifieds = lazy(() => import("@/pages/Classifieds"));
const PostClassified = lazy(() => import("@/pages/PostClassified"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const Overview = lazy(() => import("@/pages/dashboard/Overview"));
const Products = lazy(() => import("@/pages/dashboard/Products"));
const Orders = lazy(() => import("@/pages/dashboard/Orders"));
const Settings = lazy(() => import("@/pages/dashboard/Settings"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Moderation = lazy(() => import("@/pages/dashboard/Moderation"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Suspense fallback={<LoadingFallback />}>
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
                    <Route path="/dashboard/moderation" element={<Moderation />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
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