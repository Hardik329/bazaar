import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;

      let exists = false;

      state.products.forEach((product) => {
        if (
          product.id === newProduct.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
        ) {
          product.quantity += newProduct.quantity;
          exists = true;
        }
      });
      if (!exists) {
        state.quantity++;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
      return;
    },

    removeFromCart: (state, action) => {
      const newProduct = action.payload;

      state.products.forEach((product) => {
        if (
          product.id === newProduct.id &&
          product.size === newProduct.size &&
          product.color === newProduct.color
        ) {
          if (product.quantity === 1) {
            const index = state.products.indexOf(product);
            state.quantity--;
            state.products.splice(index, 1);
          } else product.quantity--;

          state.total -= action.payload.price;
          return;
        }
      });
      return;
    },

    setCart: (state, action) => {
      var { products, quantity, total } = action.payload;

      // console.log(action.payload);

      state.products = products;
      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
