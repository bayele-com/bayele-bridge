import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckoutFormValues } from "./ShippingForm";

export function useCheckout() {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: CheckoutFormValues) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to complete your purchase",
      });
      navigate("/login");
      return;
    }

    if (state.items.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Your cart is empty",
      });
      return;
    }

    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          total_amount: state.total,
          status: "pending",
          payment_status: "pending",
          commission_amount: 0,
          product_id: state.items[0].id,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: detailsError } = await supabase
        .from("order_details")
        .insert({
          order_id: order.id,
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
          delivery_address: {
            address: data.address,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
          },
        });

      if (detailsError) throw detailsError;

      clearCart();
      toast({
        title: "Order placed successfully",
        description: "We'll contact you soon with payment instructions.",
      });
      navigate("/dashboard/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to place order. Please try again.",
      });
    }
  };

  return { handleSubmit };
}