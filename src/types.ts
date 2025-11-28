
interface CartItemType {
  pizza: PizzaType;
  size: string;
  // quantity: number;
  price: number;
}

interface PizzaType {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  sizes: {
    S: number;
    M: number;
    L: number;
  };
}

interface OrderType {
  order_id: string;
  date: string;
  time: string;
}

export type { CartItemType, PizzaType, OrderType };
