import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HAS_INIT = {
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
};

const initialState: HAS_INIT = {
  cart: [],
};

type HAS_CART_SELECTED_PREPARE = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type HAS_CART_SELECTED_REDUCER = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add item
    addItem: {
      prepare(value: HAS_CART_SELECTED_PREPARE) {
        return {
          payload: {
            pizzaId: value.pizzaId,
            name: value.name,
            quantity: value.quantity,
            unitPrice: value.unitPrice,
            totalPrice: value.totalPrice,
          },
        };
      },
      reducer(
        state: HAS_INIT,
        action: PayloadAction<HAS_CART_SELECTED_REDUCER>
      ) {
        state.cart.push(action.payload);
      },
    },
    // deleteItem
    deleteItem: {
      prepare(value: number) {
        return {
          payload: {
            pizzaId: value,
          },
        };
      },
      reducer(
        state: HAS_INIT,
        action: PayloadAction<{
          pizzaId: number;
        }>
      ) {
        state.cart = state.cart.filter((item) => {
          return item.pizzaId !== action.payload.pizzaId;
        });
      },
    },
    // increaseItem == payload = pizzaId
    increaseItemQuantity: {
      prepare(value: number) {
        return {
          payload: {
            pizzaId: value,
          },
        };
      },
      reducer(
        state: HAS_INIT,
        action: {
          payload: {
            pizzaId: number;
          };
        }
      ) {
        if (state.cart instanceof Array) {
          let item: {
            pizzaId: number;
            name: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
          }[] = [];
          //@ts-expect-error [update the data]
          item = state.cart.find(
            (item) => item.pizzaId === action.payload.pizzaId
          );

          //@ts-expect-error update quantity
          item.quantity++;
          //@ts-expect-error update the total price
          item.totalPrice = item.quantity * item.unitPrice;
        }
      },
    },
    // descreaseItem == payload = pizzaId
    descreaseItemQuantity: {
      prepare(value: number) {
        return {
          payload: {
            pizzaId: value,
          },
        };
      },
      reducer(
        state: HAS_INIT,
        action: {
          payload: {
            pizzaId: number;
          };
        }
      ) {
        if (state.cart instanceof Array) {
          let item: {
            pizzaId: number;
            name: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
          }[] = [];
          //@ts-expect-error [update the data]
          item = state.cart.find(
            (item) => item.pizzaId === action.payload.pizzaId
          );

          //@ts-expect-error update quantity
          item.quantity--;
          //@ts-expect-error update the total price
          item.totalPrice = item.quantity * item.unitPrice;
          //@ts-expect-error delete if zero quantity
          if (item.quantity === 0) {
            // if the quantity, reach zero value will be remove in the cart
            //@ts-expect-error delete if zero quantity
            cartSlice.caseReducers.deleteItem(state, action);
          }
        }
      },
    },
    // clear the cart
    clearCart: {
      prepare(value: []) {
        return {
          payload: value,
        };
      },
      reducer(state: HAS_INIT) {
        state.cart = [];
      },
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  descreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
