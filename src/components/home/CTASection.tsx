import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-accent/10 rounded-2xl p-8 md:p-12 text-center">
          <Badge variant="secondary" className="mb-4">Get Started</Badge>
          <h2 className="text-3xl font-bold mb-4">Ready to Join Bayele?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your account today and start exploring Cameroon's premier marketplace platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}