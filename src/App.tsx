import { createRoot } from "react-dom/client";
import Order from "./Order";

const App = (): JSX.Element => {
  //   var margheritaProps = {
  //     name: "Pizza Margherita",
  //     description:
  //       "Delicious classic pizza with tomatoes, mozzarella, and basil.",
  //   };

  return (
    <div>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const root = createRoot(container);
root.render(<App />);
