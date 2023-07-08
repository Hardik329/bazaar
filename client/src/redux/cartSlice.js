import { createSlice } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../useFetch";

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
      return;
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
      return;
    },

    fetchCart: async (state, action) => {
      console.log("called fetchCart");
      try {
        const res = await userRequest.get("/cart/find/" + action.payload);
        if (!res.data) {
          console.log(res.data);
          state.products.length = 0;
          state.quantity = 0;
          state.total = 0;
          return;
        } else {
          const cart = res.data;
          console.log("cart: ", cart);
          var products;
          cart.map((product) => {
            publicRequest
              .get("/products/find/" + product._id)
              .then((res) => res.data)
              .then((data) =>
                products.push({
                  ...data,
                  size: product.size,
                  color: product.color,
                  quantity: product.quantity,
                })
              );
          });
          state = {
            products: products,
            quantity: cart.quantity,
            total: cart.total,
          };
        }
      } catch (error) {
        console.log(error);
        return;
      }

      return;
    },

    updateCart: async (state, action) => {
      console.log("called updateCart");

      try {
        console.log({
          ...action.payload.cart,
          userId: action.payload.userId,
        });
        const res = await userRequest.put("/cart/" + action.payload.userId, {
          ...action.payload.cart,
          userId: action.payload.userId,
        });
        console.log(res);
        console.log("later cart: ", action.payload.cart);
        state = action.payload.cart;
        return;
      } catch (error) {
        console.log(error);
        console.log("later cart: ", action.payload.cart);
        state = action.payload.cart;
        return;
      }
    },
  },
});

export const { addToCart, removeFromCart, fetchCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
