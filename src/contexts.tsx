import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CartItemType } from "./types";

type CartContextType = [CartItemType[], Dispatch<SetStateAction<CartItemType[]>>];

const noop = (() => {}) as Dispatch<SetStateAction<CartItemType[]>>;

export const CartContext = createContext<CartContextType>([[], noop]);
