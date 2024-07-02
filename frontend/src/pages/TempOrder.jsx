import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync, fetchOrderByItsIdAsync, selectCurrentOrder, selectTempOrder } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
function TempOrder(){
  const dispatch=useDispatch();
    const params= useParams();
    const navigate=useNavigate();
   const id=params.id;
    const currentOrder=useSelector(selectCurrentOrder);
   useEffect(()=>{
    dispatch(fetchOrderByItsIdAsync(id));
    navigate('/ordersummary');
   },[])
    return(
        <div>
        <h3>Loading....
         id is {id}
        </h3>

        </div>
    )
}

export default TempOrder;