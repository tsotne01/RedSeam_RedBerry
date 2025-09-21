import noItemsImage from "../../../assets/no_items_in_cart.png";
import { Button, CartItem, OrderSummary } from "../../../shared/ui";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/use-cart";

import closeIcon from "../../../assets/icons/close_icon.png"
import { paths } from "../../../shared/constants";
import type { ICartItem } from "../model/model";


export const CartWidget = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalQuantity,
    subtotalPrice,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeFromCart,
  } = useCart();


  return (
    <>
      <div
        className="fixed top-0 right-0 w-full h-full z-10 bg-[#10151F]/70"
        onClick={onClose}
      ></div>
      <div className="fixed top-0 right-0 bg-white z-20 w-1/3 h-fit h-full flex flex-col justify-between p-[40px]">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-[#10151F] font-semibold">Shopping cart ({totalQuantity})</h2>
            <div className="flex items-center gap-3">
              <button className="text-black cursor-pointer" onClick={onClose}>
                <img src={closeIcon} alt="close" />
              </button>
            </div>
          </div>
          {totalQuantity === 0 && (
            <div className="flex items-center justify-center flex-col">
              <img className="mb-[24px]" src={noItemsImage} alt="cart" />
              <h2 className="text-2xl text-[#10151F] font-semibold font-poppins mb-4">Ooops!</h2>
              <p className=" text-[#3E424A] text-sm font-poppins mb-[58px]">You've got nothing in your cart just yet...</p>
              <Button
                size="small"
                onClick={() => {
                  onClose();
                  navigate("/");
                }}
                className="w-[214px]"
              >
                Start shopping
              </Button>
            </div>
          )}
          <div className="overflow-y-scroll h-full max-h-[450px]">
            {cartItems && totalQuantity > 0 &&
              cartItems.map((item: ICartItem) => (
                <CartItem
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  selectedColor={item.selectedColor}
                  selectedSize={item.selectedSize}
                  selectedImage={item.selectedImage}
                  quantity={item.quantity}
                  onIncrement={incrementCartItemQuantity}
                  onDecrement={decrementCartItemQuantity}
                  onRemove={removeFromCart}
                  className="mt-[63px]"
                />
              ))}
          </div>
        </div>
        {totalQuantity > 0 && (
          <div className="flex flex-col">
            <OrderSummary
              subtotal={subtotalPrice}
              deliveryCost={5}
              className="mb-[102px]"
            />
            <Button onClick={() => {
              onClose();
              navigate(paths.checkout)
            }} variant="primary" size="large">Go to checkout</Button>
          </div>
        )}
      </div>
    </>
  );
};


