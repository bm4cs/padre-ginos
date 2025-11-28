import { CartItemType } from "./types";

const intl = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export default function Cart({
  cart,
  checkout,
}: {
  cart: CartItemType[];
  checkout: () => void;
}): JSX.Element {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    if (current) {
      total += current.pizza.sizes[current.size as keyof typeof current.pizza.sizes];
    }
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> –
            <span className="type">{item.pizza.name}</span> –
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
