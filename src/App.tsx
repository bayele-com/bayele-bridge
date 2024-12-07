import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Loader2 } from "lucide-react";

// Optimize lazy loading with prefetch
const Index = lazy(() => import("@/pages/Index"), { suspense: true });
const FindHouse = lazy(() => import("@/pages/FindHouse"), { suspense: true });
const ListProperty = lazy(() => import("@/pages/ListProperty"), { suspense: true });
const Classifieds = lazy(() => import("@/pages/Classifieds"), { suspense: true });
const PostClassified = lazy(() => import("@/pages/PostClassified"), { suspense: true });
const SignUp = lazy(() => import("@/pages/SignUp"), { suspense: true });
const Login = lazy(() => import("@/pages/Login"), { suspense: true });
const Overview = lazy(() => import("@/pages/dashboard/Overview"), { suspense: true });
const Products = lazy(() => import("@/pages/dashboard/Products"), { suspense: true });
const Orders = lazy(() => import("@/pages/dashboard/Orders"), { suspense: true });
const Settings = lazy(() => import("@/pages/dashboard/Settings"), { suspense: true });
const ProductDetail = lazy(() => import("@/pages/ProductDetail"), { suspense: true });
const Marketplace = lazy(() => import("@/pages/Marketplace"), { suspense: true });
const Checkout = lazy(() => import("@/pages/Checkout"), { suspense: true });
const Moderation = lazy(() => import("@/pages/dashboard/Moderation"), { suspense: true });
const NotFound = lazy(() => import("@/pages/NotFound"), { suspense: true });

// Optimize React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'always',
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

// Optimize loading state
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