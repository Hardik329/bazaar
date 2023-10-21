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
      state.products = state.products.filter(
        (product) => product.id !== newProduct.id
      );
    },

    setWishlist: (state, action) => {
      // console.log(action.payload);
      if (action.payload) state.products = action.payload;
      else state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
