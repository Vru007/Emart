import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../authSlice";
import { signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function LogoutPage(){
    const dispatch=useDispatch();
    const user=useSelector(selectUserInfo);
    
    useEffect(()=>{
        dispatch(signOutAsync())
    });
    return(
        <>
        {!user && <Navigate to="/login" replace={true}></Navigate>}
        </>
    )
}