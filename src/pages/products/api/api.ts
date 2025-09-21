import { client } from "../../../shared/api"

export const getProducts = async () => {
    const data = (await client.get("/products")).data;
    const meta = data.meta;
    return { products: data.data, productsMetaData: meta }
}
