import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClassifiedSubmissionForm } from "@/components/classifieds/ClassifiedSubmissionForm";
import { useToast } from "@/components/ui/use-toast";

export default function PostClassified() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Handle submission logic here
      toast({
        title: "Success!",
        description: "Your ad has been submitted for review.",
      });
      navigate("/classifieds");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your ad. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Post a Classified Ad</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to submit your classified ad
          </p>
          
          <ClassifiedSubmissionForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}