import { Button } from "../../../shared/ui";
import cartIcon from "../../../assets/icons/cart_icon.svg";
import type { IAddToCartButtonProps } from "../models/model";

export const AddToCartButton = ({ disabled, onClick }: IAddToCartButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    variant="primary"
    size="large"
    className="mb-12 w-full"
    icon={<img src={cartIcon} alt="cart" />}
  >
    Add to Cart
  </Button>
);