import { createBrowserRouter, RouterProvider } from "react-router";
import { paths } from "../../shared/constants";
import { SignInPage } from "../../pages/sign-in";
import { SignUpPage } from "../../pages/sign-up";
import { ProductsPage } from "../../pages/products";
import { CheckoutPage } from "../../pages/checkout";
import { Header } from "../../shared/ui/header/header";
import { ProductDetailsPage } from "../../pages/product-details";
import { getProduct } from "../../pages/product-details/api/api";
import { getProducts } from "../../pages/products/api/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: paths.signIn,
        element: <SignInPage />,
      },
      {
        path: paths.signUp,
        element: <SignUpPage />,
      },
      {
        path: paths.products,
        loader: async () => {
          const { products, productsMetaData } = await getProducts();
          return { products, productsMetaData }
        },
        element: <ProductsPage />,
      },
      {
        path: paths.productDetails,
        loader: async ({ params }) => {
          return { product: await getProduct(params.id as string) }
        },
        element: <ProductDetailsPage />,
      },
      {
        path: paths.checkout,
        element: <CheckoutPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
