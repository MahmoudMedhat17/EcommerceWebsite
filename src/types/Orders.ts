import { type TProducts } from "@/types/Products";

export type TOrders = {
    userId: number;
    subTotal: number;
    items: TProducts[];
};