interface ICartItemProps {
  id: string;
  name: string;
  price: number;
  selectedColor: string;
  selectedSize: string;
  selectedImage: string;
  quantity: number;
  onIncrement: (id: string, options: { color: string; size: string }) => void;
  onDecrement: (id: string, options: { color: string; size: string }) => void;
  onRemove: (id: string, options: { color: string; size: string }) => void;
  className?: string;
}

export const CartItem = ({
  id,
  name,
  price,
  selectedColor,
  selectedSize,
  selectedImage,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
  className = ""
}: ICartItemProps) => {
  const itemOptions = { color: selectedColor, size: selectedSize };

  return (
    <div className={`flex items-center gap-[17px] ${className}`}>
      <div>
        <img
          className="w-[100px] height-[134px] rounded-[10px] border-1 border-[#E1DFE1]"
          src={selectedImage}
          alt={name}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="mb-[10px] font-poppins text-[#10151F] font-medium">{name}</h3>
          <span className="block text-[#3E424A] text-sm">${price}</span>
          <span className="block text-[#3E424A] text-sm">{selectedColor}</span>
          <span className="block text-[#3E424A] text-sm">{selectedSize}</span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 border-1 border-[#E1DFE1] rounded flex items-center justify-center text-[#10151F] hover:bg-[#F8F6F7]"
              onClick={() => onDecrement(id, itemOptions)}
            >
              -
            </button>
            <span className="min-w-[16px] text-center font-poppins">{quantity}</span>
            <button
              className="w-6 h-6 border-1 border-[#E1DFE1] rounded flex items-center justify-center text-[#10151F] hover:bg-[#F8F6F7]"
              onClick={() => onIncrement(id, itemOptions)}
            >
              +
            </button>
          </div>
          <button
            className="text-[#3E424A] text-sm hover:text-[#10151F] font-poppins"
            onClick={() => onRemove(id, itemOptions)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};