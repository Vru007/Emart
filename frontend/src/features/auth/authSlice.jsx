import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser } from './authApi';
import { signOut } from './authApi';
const initialState = {
  loggedUser: null,
  status: 'idle',
  error:null,
  
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    console.log("userData",userData);
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    console.log("returen response: ",response.data);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo,{rejectWithValue}) => {
    try{
    // console.log("userData",userData);
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    // console.log("returen response: ",response.data);
    return response.data;
  }
  catch(err){
        return rejectWithValue(err.message||'User not found');
  }
}
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userId) => {
    // console.log("userData",userData);
    console.log("inside signout async");
    const response = await signOut(userId);
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
      state.user += 1;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
        console.log("in pending");
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedUser = action.payload;
        console.log("loggedUser: ",state.loggedUser);
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload||'unkown error';
        console.log("error: ",state.error);
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedUser = null;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      
  },
});

export const { increment} = counterSlice.actions;


export const selectUserInfo = (state) => state.auth.loggedUser;
export const selectError=(state)=>state.auth.error;
export default counterSlice.reducer;
