import { client } from "../../../shared/api"

export const getProducts = async (page?: number, sort?: string, price_from?: number, price_to?: number) => {
    const params: Record<string, string | number | undefined> = {};

    if (page) params.page = page;
    if (sort) params.sort = sort;
    if (price_from !== undefined) params["filter[price_from]"] = price_from;
    if (price_to !== undefined) params["filter[price_to]"] = price_to;

    const data = (await client.get("/products", { params })).data;
    const meta = data.meta;
    return { products: data.data, productsMetaData: meta }
}
