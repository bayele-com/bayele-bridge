import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import FindHouse from "@/pages/FindHouse";
import ListProperty from "@/pages/ListProperty";
import Classifieds from "@/pages/Classifieds";
import PostClassified from "@/pages/PostClassified";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
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
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;