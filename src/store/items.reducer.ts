import {createReducer, on} from "@ngrx/store";
import {CartItems} from "../models/cart-items";
import {add, remove, total} from "./items.actions";

export interface ItemsState {
  items: CartItems[];
  total: number;
}

export const initialState: ItemsState = {
  items: JSON.parse(localStorage.getItem('cartItems')!) || [],
  total: 0
}


export const itemsReducer = createReducer(
  initialState,
  on(add, (state, { product }) => {
    const selectedItem = state.items.find((item: CartItems) => item.product.id === product.id);

    const updatedItems = selectedItem ? state.items.map((item: CartItems) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) :
      [...state.items, { product: product, quantity: 1 }];

    return {
      items: updatedItems,
      total: updatedItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0)
    };

  }),

  on(remove, (state, { id }) => {
    const itemIndex = state.items.findIndex(item => item.product.id === id);

    const updatedItems = itemIndex !== -1 ? state.items.map(item => {
      if (item.product.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null;
      }
      return item;
    }).filter(item => item !== null) : state.items;

    return {
      items: updatedItems as CartItems[],
      total: updatedItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0)
    };

  }),

  on(total, (state) => ({
    ...state,
    total: state.items.reduce((acc, item) => acc + (item.quantity * item.product.price), 0)
  }))

);
