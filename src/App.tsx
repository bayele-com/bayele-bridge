import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Loader2 } from "lucide-react";

// Lazy load components
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
const Users = lazy(() => import("@/pages/dashboard/Users"));
const Properties = lazy(() => import("@/pages/dashboard/Properties"));
const Businesses = lazy(() => import("@/pages/dashboard/Businesses"));
const Analytics = lazy(() => import("@/pages/dashboard/Analytics"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'always',
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/find-house" element={<FindHouse />} />
                    <Route path="/list-property" element={<ListProperty />} />
                    <Route path="/classifieds" element={<Classifieds />} />
                    <Route path="/post-classified" element={<PostClassified />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/checkout" element={<Checkout />} />

                    {/* Protected admin routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <AdminRoute>
                          <Overview />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/users"
                      element={
                        <AdminRoute requiredPermission="canManageUsers">
                          <Users />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/properties"
                      element={
                        <AdminRoute requiredPermission="canManageContent">
                          <Properties />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/businesses"
                      element={
                        <AdminRoute requiredPermission="canManageContent">
                          <Businesses />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/products"
                      element={
                        <AdminRoute requiredPermission="canManageContent">
                          <Products />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/orders"
                      element={
                        <AdminRoute requiredPermission="canManageContent">
                          <Orders />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/settings"
                      element={
                        <AdminRoute requiredPermission="canManageSettings">
                          <Settings />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/moderation"
                      element={
                        <AdminRoute requiredPermission="canModerateContent">
                          <Moderation />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/dashboard/analytics"
                      element={
                        <AdminRoute requiredPermission="canViewAnalytics">
                          <Analytics />
                        </AdminRoute>
                      }
                    />

                    {/* Error routes */}
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