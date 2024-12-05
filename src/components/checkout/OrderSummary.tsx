import { useCart } from "@/contexts/CartContext";

export function OrderSummary() {
  const { state } = useCart();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 border-b pb-4"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-16 w-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item.quantity} x {item.price.toLocaleString()} FCFA
              </p>
            </div>
            <p className="font-medium">
              {(item.price * item.quantity).toLocaleString()} FCFA
            </p>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{state.total.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}