import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BusinessFields } from "@/components/dashboard/profile/BusinessFields";
import { AffiliateFields } from "@/components/dashboard/profile/AffiliateFields";
import { ProfileFormValues } from "@/components/dashboard/profile/types";
import type { Profile as ProfileType } from "@/types/database/profile";

const baseProfileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  whatsapp_number: z
    .string()
    .regex(/^\+237[0-9]{9}$/, "Please enter a valid Cameroonian phone number")
    .optional()
    .nullable(),
});

const businessProfileSchema = baseProfileSchema.extend({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  business_address: z.string().min(5, "Address must be at least 5 characters"),
});

const affiliateProfileSchema = baseProfileSchema.extend({
  payment_details: z.object({
    momo_number: z.string().regex(/^\+237[0-9]{9}$/, "Invalid MTN MoMo number"),
    om_number: z.string().regex(/^\+237[0-9]{9}$/, "Invalid Orange Money number").optional(),
  }).optional(),
});

export default function Profile() {
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
      payment_details: userProfile?.payment_details || {
        momo_number: "",
        om_number: "",
      },
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const dbValues = {
        ...values,
        payment_details: values.payment_details ? {
          ...values.payment_details,
        } : null
      };

      const { error } = await supabase
        .from("profiles")
        .update(dbValues)
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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile?.email || ""}
                      disabled
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+237" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {profile?.user_type === "business" && (
                    <BusinessFields form={form} />
                  )}

                  {profile?.user_type === "affiliate" && (
                    <AffiliateFields form={form} />
                  )}

                  <Button 
                    type="submit" 
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground capitalize">
                {userProfile?.user_type || "User"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
