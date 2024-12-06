import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { FeaturedClassifieds } from "@/components/home/FeaturedClassifieds";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProperties />
      <FeaturedClassifieds />
      <FeaturedProducts />
      <CTASection />
    </div>
  );
};

export default Index;