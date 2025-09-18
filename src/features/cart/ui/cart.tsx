import noItemsImage from "../../../assets/no_items_in_cart.png";
import { Button } from "../../../shared/ui/button/button";
import { useNavigate } from "react-router";
import { useCart, type ICartItem } from "../hooks/use-cart";

import closeIcon from "../../../assets/icons/close_icon.png"

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
      <div className="fixed top-0 right-0 bg-white z-20 w-1/3 h-full flex flex-col justify-between p-[40px]">
        <div>
          <div className="flex justify-between items-center mb-[151px]">
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
          {cartItems && totalQuantity > 0 &&
            cartItems.map((item: ICartItem) => (
              <div className="flex items-center gap-[17px] mt-[63px]" key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                <div>
                  <img
                    className="w-[100px] height-[134px] rounded-[10px] border-1 border-[#E1DFE1]"
                    src={item.selectedImage}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3 className="mb-[10px]">{item.name}</h3>
                    <span className="block">{item.selectedColor}</span>
                    <span className="block">{item.selectedSize}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 border-1 border-[#E1DFE1] rounded"
                        onClick={() =>
                          decrementCartItemQuantity(item.id, {
                            color: item.selectedColor,
                            size: item.selectedSize,
                          })
                        }
                      >
                        -
                      </button>
                      <span className="min-w-[16px] text-center">{item.quantity}</span>
                      <button
                        className="w-6 h-6 border-1 border-[#E1DFE1] rounded"
                        onClick={() =>
                          incrementCartItemQuantity(item.id, {
                            color: item.selectedColor,
                            size: item.selectedSize,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeFromCart(item.id, {
                          color: item.selectedColor,
                          size: item.selectedSize,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {totalQuantity > 0 && (
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between items-center font-poppins">
              <span>Items subtotal</span>
              <span>${subtotalPrice}</span>
            </div>
            <div className="flex justify-between items-center font-poppins">
              <span>Delivery</span>
              <span>$5</span>
            </div>
            <div className="flex justify-between items-center text-[#10151F] text-xl mb-[102px] font-poppins">
              <span>Total</span>
              <span>${subtotalPrice + 5}</span>
            </div>
            <Button variant="primary" size="large">Go to checkout</Button>
          </div>
        )}
      </div>
    </>
  );
};


