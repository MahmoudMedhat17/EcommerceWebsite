import { type TProducts } from "@/types/index";


export type TOrders = {
    id: number,
    userId: number,
    subTotal: number,
    items: TProducts[];
};