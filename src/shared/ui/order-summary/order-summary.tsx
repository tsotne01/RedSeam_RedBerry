interface IOrderSummaryProps {
  subtotal: number;
  deliveryCost?: number;
  className?: string;
}

export const OrderSummary = ({ 
  subtotal, 
  deliveryCost = 5, 
  className = "" 
}: IOrderSummaryProps) => {
  const total = subtotal + deliveryCost;

  return (
    <div className={`flex flex-col gap-[16px] ${className}`}>
      <div className="flex justify-between items-center font-poppins">
        <span>Items subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between items-center font-poppins">
        <span>Delivery</span>
        <span>${deliveryCost}</span>
      </div>
      <div className="flex justify-between items-center text-[#10151F] text-xl font-poppins">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
};