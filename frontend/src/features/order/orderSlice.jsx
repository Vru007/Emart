import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './orderApi';
import {createOrder,updateStatus,fetchAllOrders,fetchOrder} from './orderApi';
const initialState = {
  orders:[],
  status: 'idle',
  currentOrder:null,
  allorders:[],
  userorders:[],
  totalOrders:null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (update) => {
    const response = await createOrder(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchOrderByIdAsync = createAsyncThunk(
  'order/fetchOrder',
  async (orderId) => {
    const response = await fetchOrder(orderId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateStatusAsync=createAsyncThunk(
  'order/updateStatus',
  async (update)=>{
    const response =await updateStatus(update);

    return response.data;
  }
)
export const fetchAllOrdersAsync=createAsyncThunk(
  'order/fetchAllOrders',
  async({pagination})=>{
    const response=await fetchAllOrders(pagination);
    const finalData=response.data;
    return finalData;
  }
)
export const counterSlice = createSlice({
  name: 'order',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   resetOrder:(state)=>{
    state.currentOrder=null;
   }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(updateStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index]=action.payload;
        
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allorders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders;
        // console.log(state.products);
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userorders=action.payload;
        // console.log(state.products);
      })
      
      ;
      
  },
});

export const { resetOrder} = counterSlice.actions;


export const selectCount = (state) => state.counter.value;
export const selectCurrentOrder=(state)=>state.order.currentOrder;
export const selectAllOrders=(state)=>state.order.allorders;
export const selectUserOrders=(state)=>state.order.userorders;
export const selectTotalOrders=(state)=>state.order.totalOrders;
export default counterSlice.reducer;
