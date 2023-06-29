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
      const index = state.products.indexOf(newProduct);
      if (index != -1) state.products.splice(index, 1);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
