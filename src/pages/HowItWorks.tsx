import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home, 
  UserPlus, 
  Search, 
  MessageSquare, 
  ShieldCheck, 
  DollarSign,
  ShoppingBag,
  FileText
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Create an Account",
      description: "Sign up for free and join Cameroon's premier marketplace platform."
    },
    {
      icon: <Search className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Find What You Need",
      description: "Browse through properties, products, and classified ads."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Connect Directly",
      description: "Contact sellers directly through WhatsApp or phone calls."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Safe Transactions",
      description: "Secure platform with verified users and protected transactions."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-[#0EA5E9]" />,
      title: "Earn as an Affiliate",
      description: "Promote products and earn commissions on successful sales."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h1 className="text-4xl font-bold mb-6">Simple Steps to Get Started</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover how Bayele makes it easy to find properties, buy products, and post classified ads in Cameroon.
          </p>
          <Button asChild>
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Bayele?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Home className="h-8 w-8 text-[#0EA5E9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
              <p className="text-muted-foreground">
                Find your perfect home with our extensive property listings across Cameroon.
              </p>
            </div>
            <div className="p-6">
              <ShoppingBag className="h-8 w-8 text-[#0EA5E9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-muted-foreground">
                Buy and sell products from trusted sellers with secure transactions.
              </p>
            </div>
            <div className="p-6">
              <FileText className="h-8 w-8 text-[#0EA5E9] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Classified Ads</h3>
              <p className="text-muted-foreground">
                Post and browse classified ads for various categories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who trust Bayele for their property, marketplace, and classified needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/find-house">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}