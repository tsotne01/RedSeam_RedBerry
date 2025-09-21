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
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const page = Number(url.searchParams.get("page")) || undefined;
          const sort = url.searchParams.get("sort") || undefined;
          const price_from = url.searchParams.get("price_from") ? Number(url.searchParams.get("price_from")) : undefined;
          const price_to = url.searchParams.get("price_to") ? Number(url.searchParams.get("price_to")) : undefined;
          
          const { products, productsMetaData } = await getProducts(page, sort, price_from, price_to);
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
