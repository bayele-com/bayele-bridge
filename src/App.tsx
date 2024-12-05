import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import FindHouse from "@/pages/FindHouse";
import ListProperty from "@/pages/ListProperty";
import Classifieds from "@/pages/Classifieds";
import PostClassified from "@/pages/PostClassified";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-house" element={<FindHouse />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/classifieds" element={<Classifieds />} />
          <Route path="/post-classified" element={<PostClassified />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;