import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      // First, sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            user_type: data.userType,
            whatsapp_number: data.whatsappNumber || null,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Check if the signup was successful and we have a session
      if (authData && authData.session) {
        toast({
          title: "Account created successfully!",
          description: "You are now logged in.",
        });
        
        // Navigate to home page since we have a valid session
        navigate("/");
      } else {
        // If email confirmation is required
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
        
        // Navigate to login page since email verification is required
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
}