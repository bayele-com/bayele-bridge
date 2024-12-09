import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileFormValues } from "./types";
import { baseProfileSchema, businessProfileSchema, affiliateProfileSchema } from "./validation-schemas";
import type { Profile as ProfileType } from "@/types/database/profile";

export function useProfileForm() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data as ProfileType;
    },
    enabled: !!user?.id,
  });

  const getValidationSchema = () => {
    switch (profile?.user_type) {
      case "business":
        return businessProfileSchema;
      case "affiliate":
        return affiliateProfileSchema;
      default:
        return baseProfileSchema;
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: {
      full_name: userProfile?.full_name || "",
      whatsapp_number: userProfile?.whatsapp_number || "",
      business_name: userProfile?.business_name || "",
      business_address: userProfile?.business_address || "",
      payment_details: userProfile?.payment_details ? {
        momo_number: String(userProfile.payment_details.momo_number || ""),
        om_number: String(userProfile.payment_details.om_number || ""),
      } : null,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const { error } = await supabase
        .from("profiles")
        .update(values)
        .eq("id", user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };

  return {
    form,
    userProfile,
    isLoading,
    onSubmit,
    updateProfileMutation,
  };
}