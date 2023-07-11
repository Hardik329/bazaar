import { setCart } from "../redux/cartSlice";
import {  userRequest,publicRequest } from "../useFetch";


export const updateCart = async({user,cart})=>{
    try {
        const res = await userRequest.put("/cart/" + user._id, {
            ...cart,
            userId: user._id,
        },{
          headers:{
            token: `Bearer ${user.accessToken}` 
          }
        });

        console.log(res);
        
      } catch (error) {
        console.log("Error in updating cart: ",error);
        
      }

}
