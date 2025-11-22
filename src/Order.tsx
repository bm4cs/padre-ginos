import { useEffect, useState } from "react";
import Pizza from "./Pizza";

const intl = Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

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

export default function Order(): JSX.Element {
  const [pizzaList, setPizzaList] = useState<PizzaType[]>([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);

  let price, selectedPizza;

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
    fetchPizzaTypes();
  }, []); 

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select name="pizza-type" value={pizzaType} onChange={e => setPizzaType(e.target.value)}>
              {
                pizzaList.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))
              }
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
                  onChange={e => setPizzaSize(e.target.value)}
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
                  onChange={e => setPizzaSize(e.target.value)}
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
                  onChange={e => setPizzaSize(e.target.value)}
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
              ? intl.format(selectedPizza.sizes[pizzaSize as keyof typeof selectedPizza.sizes])
              : "$0.00"}
          </p>
        </div>
      </form>
    </div>
  );
}
