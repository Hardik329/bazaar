import axios from "axios";
import { useDispatch } from "react-redux"
import { publicRequest } from "../useFetch";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";


export const login = async(dispatch,user)=>{
    
    dispatch(loginStart());

    try{
        const res = await publicRequest.post('/auth/login',user);
        dispatch(loginSuccess(res.data))

    }

    catch{
        dispatch(loginFailure())
    }
}