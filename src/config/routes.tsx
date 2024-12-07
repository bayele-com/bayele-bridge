import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// Lazy load components
const Index = lazy(() => import("@/pages/Index"));
const FindHouse = lazy(() => import("@/pages/FindHouse"));
const ListProperty = lazy(() => import("@/pages/ListProperty"));
const Classifieds = lazy(() => import("@/pages/Classifieds"));
const PostClassified = lazy(() => import("@/pages/PostClassified"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
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
const Affiliates = lazy(() => import("@/pages/dashboard/Affiliates"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Search = lazy(() => import("@/pages/Search"));

export const publicRoutes = [
  { path: "/", element: <Index /> },
  { path: "/find-house", element: <FindHouse /> },
  { path: "/list-property", element: <ListProperty /> },
  { path: "/classifieds", element: <Classifieds /> },
  { path: "/post-classified", element: <PostClassified /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/products/:id", element: <ProductDetail /> },
  { path: "/marketplace", element: <Marketplace /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/search", element: <Search /> },
];

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout>
          <Overview />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/users",
    element: (
      <AdminRoute requiredPermission="canManageUsers">
        <DashboardLayout>
          <Users />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/properties",
    element: (
      <AdminRoute requiredPermission="canManageContent">
        <DashboardLayout>
          <Properties />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/businesses",
    element: (
      <AdminRoute requiredPermission="canManageContent">
        <DashboardLayout>
          <Businesses />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/affiliates",
    element: (
      <AdminRoute requiredPermission="canManageUsers">
        <DashboardLayout>
          <Affiliates />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/products",
    element: (
      <AdminRoute requiredPermission="canManageContent">
        <DashboardLayout>
          <Products />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/orders",
    element: (
      <AdminRoute requiredPermission="canManageContent">
        <DashboardLayout>
          <Orders />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/settings",
    element: (
      <AdminRoute requiredPermission="canManageSettings">
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/moderation",
    element: (
      <AdminRoute requiredPermission="canModerateContent">
        <DashboardLayout>
          <Moderation />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/dashboard/analytics",
    element: (
      <AdminRoute requiredPermission="canViewAnalytics">
        <DashboardLayout>
          <Analytics />
        </DashboardLayout>
      </AdminRoute>
    ),
  },
];

export const errorRoutes = [
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" replace /> },
];
