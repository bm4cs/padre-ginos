import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./Header";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import { CartContext } from "./contexts";

const App = (): JSX.Element => {
  //   var margheritaProps = {
  //     name: "Pizza Margherita",
  //     description:
  //       "Delicious classic pizza with tomatoes, mozzarella, and basil.",
  //   };

  const cartHook = useState([]);

  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <div>
          <Header />
          <Order />
          <PizzaOfTheDay />
        </div>
      </CartContext.Provider>
    </StrictMode>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const root = createRoot(container);
root.render(<App />);
