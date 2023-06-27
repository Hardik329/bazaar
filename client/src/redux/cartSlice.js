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
          product._id === newProduct._id &&
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
    },

    removeFromCart: (state, action) => {
      const newProduct = action.payload;

      state.products.forEach((product) => {
        if (
          product._id === newProduct._id &&
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
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
