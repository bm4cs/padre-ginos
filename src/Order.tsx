import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import Pizza from "./Pizza";
import { CartContext } from "./contexts";
import { CartType, PizzaType } from "./types";

const intl = Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

export default function Order(): JSX.Element {
  const [pizzaList, setPizzaList] = useState<PizzaType[]>([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  // const [cart, setCart] = useState<CartType>([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  let selectedPizza: PizzaType | undefined = undefined;

  if (!loading) {
    selectedPizza = pizzaList.find((pizza) => pizza.id === pizzaType);
  }

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // fake loading delay
    const pizzasResponse = await fetch("/api/pizzas");
    const pizzasJson = await pizzasResponse.json();
    setPizzaList(pizzasJson);
    setLoading(false);
  }

  useEffect(() => {
    // ESLint Error
    // Calling setState synchronously within an effect can trigger cascading renders
    // This pattern avoids directly calling an async function in the effect body
    // which satisfies the linter and is the recommended approach
    (async () => {
      await fetchPizzaTypes();
    })();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedPizza) return;
          const price =
            selectedPizza.sizes[
              pizzaSize as keyof typeof selectedPizza.sizes
            ] ?? 0;
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaList.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-pizza">
          {selectedPizza ? (
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
          ) : (
            <div>Loading pizza...</div>
          )}
          <p>
            {selectedPizza
              ? intl.format(
                  selectedPizza.sizes[
                    pizzaSize as keyof typeof selectedPizza.sizes
                  ],
                )
              : "$0.00"}
          </p>
        </div>
      </form>
      {loading ? (
        <h2>LOADING …</h2>
      ) : (
        <Cart
          cart={cart}
          checkout={checkout}
        />
      )}
    </div>
  );
}
