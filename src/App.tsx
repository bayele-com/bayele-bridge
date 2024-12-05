import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import FindHouse from "@/pages/FindHouse";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/find-house" element={<FindHouse />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;