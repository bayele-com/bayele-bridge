import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"; // Add this import
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShippingForm, checkoutFormSchema, type CheckoutFormValues } from "@/components/checkout/ShippingForm";
import { useCheckout } from "@/components/checkout/useCheckout";

export default function Checkout() {
  const { state } = useCart();
  const { handleSubmit } = useCheckout();
  const navigate = useNavigate(); // Add this hook

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      notes: "",
    },
  });

  if (state.items.length === 0) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate("/marketplace")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <OrderSummary />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <ShippingForm form={form} />
              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}