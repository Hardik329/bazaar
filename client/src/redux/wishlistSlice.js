import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const newProduct = action.payload;

      const index = state.products.indexOf(newProduct);
      if (index == -1) state.products.push(action.payload);
    },

    removeFromWishlist: (state, action) => {
      const newProduct = action.payload;
      console.log(newProduct._id)
      console.log(state.products)
      // state.products.forEach(product=>console.log(product))
      state.products =state.products.filter(product=> product._id !== newProduct._id)
      // state.products.forEach(product=>console.log(product))
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
