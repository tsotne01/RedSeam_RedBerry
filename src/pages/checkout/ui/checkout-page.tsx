import { useForm } from "react-hook-form";
import { Button, CartItem, Input, OrderSummary } from "../../../shared/ui";
import { useCart } from "../../../features/cart";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { paths } from "../../../shared/constants";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "../../../shared/api";

const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  surname: z
    .string()
    .min(1, { message: "Surname is required" })
    .min(2, { message: "Surname must be at least 2 characters long" })
    .max(50, { message: "Surname must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Surname can only contain letters and spaces",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(200, { message: "Address must be less than 200 characters" }),
  zipCode: z
    .string()
    .min(1, { message: "Zip code is required" })
    .regex(/^\d{5}(-\d{4})?$/, {
      message: "Please enter a valid zip code (e.g., 12345 or 12345-6789)",
    }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      address: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("Form submitted with data:", data);
    try {
      console.log("Order data:", data);
      const resp = await client.post("/cart/checkout", {
        ...data,
        zip_code: data.zipCode,
      });
      console.log("Order response:", resp);
      toast.success(resp.data.message || "Order placed successfully!");
      clearCart();
      navigate(paths.products);
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const {
    cartItems,
    subtotalPrice,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      toast("Your cart is empty", { duration: 2000 });
      navigate(paths.products);
      return;
    }
  }, [cartItems]);

  const handleItemIncrement = (
    id: string,
    options: { color: string; size: string }
  ) => {
    incrementCartItemQuantity(id, options);
  };
  const handleItemDecrement = (
    id: string,
    options: { color: string; size: string }
  ) => {
    decrementCartItemQuantity(id, options);
  };
  const handleItemRemove = (
    id: string,
    options: { color: string; size: string }
  ) => {
    removeFromCart(id, options);
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold mb-[42px]">Checkout</h1>
      <div className="flex gap-[131px] ">
        <div className="px-[47px] py-[72px] pb-[292px] pr-[324px] bg-[#F8F6F7] rounded-[16px]">
          <h2 className="text-[22px] font-poppins text-[#3E424A] mb-[46px]">
            Order details
          </h2>
          <form
            id="checkout-form"
            className="grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              error={errors.name?.message || ""}
              {...register("name")}
            />
            <Input
              label="Surname"
              type="text"
              placeholder="Surname"
              error={errors.surname?.message || ""}
              {...register("surname")}
            />
            <div className="col-span-2">
              <Input
                className="col-span-2"
                label="Email"
                type="email"
                placeholder="Email"
                error={errors.email?.message || ""}
                {...register("email")}
              />
            </div>
            <Input
              label="Address"
              type="text"
              placeholder="Address"
              error={errors.address?.message || ""}
              {...register("address")}
            />
            <Input
              label="Zip Code"
              type="text"
              placeholder="Zip Code"
              error={errors.zipCode?.message || ""}
              {...register("zipCode")}
            />
          </form>
        </div>
        <div className="w-[460px]">
          <div className="mb-[81px]">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onDecrement={handleItemDecrement}
                onIncrement={handleItemIncrement}
                onRemove={handleItemRemove}
              />
            ))}
          </div>
          <div className="mb-12">
            <OrderSummary subtotal={subtotalPrice} />
          </div>
          <Button type="submit" form="checkout-form" size="large">
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};
