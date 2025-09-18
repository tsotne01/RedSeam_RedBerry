import { createBrowserRouter, RouterProvider } from "react-router";
import { paths } from "../../shared/constants";
import { SignInPage } from "../../pages/sign-in";
import { SignUpPage } from "../../pages/sign-up";
import { ProductsPage } from "../../pages/products";
import { CheckoutPage } from "../../pages/checkout";
import { Header } from "../../shared/ui/header/header";

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
        element: <ProductsPage />,
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
