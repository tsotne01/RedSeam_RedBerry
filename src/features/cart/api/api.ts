import { client } from "../../../shared/api";
import type { ICartItem } from "../model/model";

export const deleteItemFromServer = async (id: string) => {
    return await client.delete(`/cart/products/${id}`);
}

export const updateItemOnServer = async (id: string, data: Partial<ICartItem>) => {
    return await client.put(`/cart/products/${id}`, data);
}

export const addItemToServer = async (data: ICartItem) => {
    return await client.post(`/cart/products`, data);
}