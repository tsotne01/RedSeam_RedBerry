import { client } from "../../../shared/api"

export const getProduct = async (id: string) => {
    return (await client.get(`/products/${id}`)).data
}