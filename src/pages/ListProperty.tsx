import { PropertySubmissionForm } from "@/components/PropertySubmissionForm";

export default function ListProperty() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to list your property on Bayele. We'll help you reach potential tenants.
          </p>
          <PropertySubmissionForm />
        </div>
      </div>
    </div>
  );
}