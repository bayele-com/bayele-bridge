import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import FindHouse from "@/pages/FindHouse";

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
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;