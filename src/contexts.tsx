import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { CartType } from "./types";

type CartContextType = [CartType[], Dispatch<SetStateAction<CartType[]>>];

const noop = (() => {}) as Dispatch<SetStateAction<CartType[]>>;

export const CartContext = createContext<CartContextType>([[], noop]);
