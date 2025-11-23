
type CartType = CartItemType[];

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

export type { CartType, CartItemType, PizzaType };
