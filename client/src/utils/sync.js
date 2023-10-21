import { userRequest } from "../useFetch";

export const updateCart = async ({ user, cart }) => {
  try {
    const res = await userRequest.put(
      "/cart/" + user.id,
      {
        ...cart,
        userId: user.id,
      },
      {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      }
    );

    // console.log(res);
  } catch (error) {
    // console.log("Error in updating cart: ", error);
  }
};
