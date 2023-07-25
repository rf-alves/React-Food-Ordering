import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCardItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCardItem = state.items[existingCardItemIndex];
    let updatedItems;
    if (existingCardItem) {
      const updatedItem = {
        ...existingCardItem,
        amount: existingCardItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCardItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCardItem = state.items[existingCardItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCardItem.price;
    let updatedItems;
    if (existingCardItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = {
        ...existingCardItem,
        amount: existingCardItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCardItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
