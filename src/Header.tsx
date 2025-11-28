import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import { CartContext } from "./contexts";
import { Route as homeRoute } from "./routes/index.lazy";

export default function Header() {
  const [cart] = useContext(CartContext);

  return (
    <nav>
      <Link to={homeRoute.options.id}>
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
