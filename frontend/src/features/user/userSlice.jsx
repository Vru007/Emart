import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrders,updateUser,fetchUserForUpdate } from './userAPI';
const initialState = {
  value: 0,
  status: 'idle',
  orders:[],
  edit:null,
  loggedInUser:null
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchOrderAsync = createAsyncThunk(
  'user/fetchOrders',
  async (userId) => {
    const response = await fetchOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchUserForUpdateAsync=createAsyncThunk(
   'user/fetchUserForUpdate',
   async()=>{
    const response = await fetchUserForUpdate();
    return response.data;
   }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // console.log("userData",userData);
    console.log("update: ",update);
    const response = await updateUser(update);
    // console.log("updateData: ",update);
    // The value we return becomes the `fulfilled` action payload
    // console.log("returen response: ",response.data);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    resetEdit:(state)=>{
      state.edit=null;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserForUpdateAsync.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchUserForUpdateAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload;
      })
      
      
  },
});

// export const { resetOrder}= counterSlice.actions;
export const selectUpdateUser=(state)=>state.user.loggedInUser
export const selectAllOrders =(state)=>state.user.orders;
export const selectEditAddress = (state) => state.user.edit;

export default counterSlice.reducer;
