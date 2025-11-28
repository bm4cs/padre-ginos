import { OrderType } from "../types";

export default async function getPastOrders(page: number): Promise<OrderType[]> {
  const response = await fetch(`/api/past-orders?page=${page}`);
  const data = await response.json();
  return data;
}
