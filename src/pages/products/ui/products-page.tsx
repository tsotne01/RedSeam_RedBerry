import { useEffect, useState } from "react";
import { client } from "../../../shared/api";
import { ProductCard } from "../../../shared/ui/product-card/product-card";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await client.get("/products");
      console.log(response);
      setProducts(response.data.data);
    })();
  }, []);
  return (
    <main className="px-[100px] py-10">
      <div>
        <h1 className="font-semibold font-poppins text-[#10151F] text-[42px]">
          Products Page
        </h1>
      </div>
      <div className="flex flex-wrap gap-10 mt-10">
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>
    </main>
  );
};
