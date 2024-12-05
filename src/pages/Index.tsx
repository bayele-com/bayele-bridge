import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ShoppingBag, FileText, TrendingUp, Search } from "lucide-react";

const Index = () => {
  const featuredProperties = [
    {
      title: "Modern Apartment in Yaoundé",
      location: "Bastos, Yaoundé",
      price: "350,000 FCFA/month",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
      type: "Apartment",
      features: ["2 Bedrooms", "1 Kitchen", "Parking"],
      contact_info: {
        phone: "+237600000000",
        whatsapp: "237600000000"
      }
    },
    {
      title: "Cozy Studio in Douala",
      location: "Bonanjo, Douala",
      price: "200,000 FCFA/month",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
      type: "Studio",
      features: ["1 Bedroom", "1 Kitchen"],
      contact_info: {
        phone: "+237600000000",
        whatsapp: "237600000000"
      }
    },
    {
      title: "Luxury Villa with Pool",
      location: "Bonapriso, Douala",
      price: "800,000 FCFA/month",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      type: "Villa",
      features: ["4 Bedrooms", "2 Kitchens", "Pool", "Parking"],
      contact_info: {
        phone: "+237600000000",
        whatsapp: "237600000000"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge className="mb-4 animate-float">Welcome to Bayele</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Your All-in-One Marketplace in Cameroon
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Find your perfect home, discover great products, and post classified ads all in one place.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for properties, products, or services..."
                className="w-full h-12 pl-12 pr-4 rounded-l-lg border border-r-0 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button size="lg" className="rounded-l-none">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button size="lg" variant="outline" className="flex flex-col items-center p-6 h-auto">
              <Home className="h-6 w-6 mb-2" />
              <span>Find a House</span>
            </Button>
            <Button size="lg" variant="outline" className="flex flex-col items-center p-6 h-auto">
              <ShoppingBag className="h-6 w-6 mb-2" />
              <span>List & Sell</span>
            </Button>
            <Button size="lg" variant="outline" className="flex flex-col items-center p-6 h-auto">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>Promote & Earn</span>
            </Button>
            <Button size="lg" variant="outline" className="flex flex-col items-center p-6 h-auto">
              <FileText className="h-6 w-6 mb-2" />
              <span>Post an Ad</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover all the ways Bayele can help you find, sell, and connect in Cameroon's largest online marketplace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center glass-card rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
              <p className="text-muted-foreground">Find your perfect home with our extensive property listings.</p>
            </div>
            
            <div className="p-6 text-center glass-card rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-muted-foreground">Buy and sell products from trusted sellers across Cameroon.</p>
            </div>
            
            <div className="p-6 text-center glass-card rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Classified Ads</h3>
              <p className="text-muted-foreground">Post and browse classified ads for various categories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Featured Properties</Badge>
            <h2 className="text-3xl font-bold mb-4">Popular Listings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our hand-picked selection of premium properties available for rent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">View All Properties</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h2 className="text-3xl font-bold mb-4">Ready to Join Bayele?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Create your account today and start exploring Cameroon's premier marketplace platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Sign Up Now</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
