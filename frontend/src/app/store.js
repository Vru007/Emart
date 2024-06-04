// import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "../features/todo//todoSlice";

// export const store= configureStore({
//     reducer: todoReducer
// })

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from'../features/product-list/productListsSlice';
import authReducer from'../features/auth/authSlice';
import cartReducer from'../features/cart/cartListSlice';
import orderReducer from'../features/order/orderSlice';
export const store = configureStore({
  reducer: {
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
  },
});
