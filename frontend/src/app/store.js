// import { configureStore } from "@reduxjs/toolkit";
// import todoReducer from "../features/todo//todoSlice";

// export const store= configureStore({
//     reducer: todoReducer
// })

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from'../features/product-list/productListsSlice';
export const store = configureStore({
  reducer: {
    product:productReducer,
  },
});
