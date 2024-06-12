import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllCategories,fetchAllBrands} from './productListsAPI';
import { fetchProductsByFilters,fetchProductById,fetchProductByIdNull,addProduct} from './productListsAPI';
import AllOrders from '../user/components/UserOrders';
// import { fetchFromSorting } from './productListsAPI';
const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  selectedProduct:null,
  totalItems:0
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    // console.log("finalData",finalData);
    return finalData;
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    
    return finalData;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    // console.log("finalData",finalData);
    return finalData;
  }
);
export const fetchProductsByfilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    return finalData;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    // console.log("finalData",finalData);
    return finalData;
  }
);

export const fetchProductByIdNullAsync = createAsyncThunk(
  'product/fetchProductByIdNull',
  async (id) => {
    const response = await fetchProductByIdNull();
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    // console.log("finalData",finalData);
    return finalData;
  }
);
export const addProductAsync = createAsyncThunk(
  'product/addProductAsync',
  async (newProduct) => {
    const response = await addProduct(newProduct);
    // The value we return becomes the `fulfilled` action payload
    // console.log("inside fetchAsync",response.data.products);
    const finalData=response.data
    // console.log("finalData",finalData);
    return finalData;
  }
);





export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("action.payload: ", action.payload);
        state.products = action.payload;
        // console.log(state.products);
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("action.payload: ", action.payload);
        state.categories = action.payload;
        // console.log(state.products);
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("action.payload: ", action.payload);
        state.brands = action.payload;
        // console.log(state.products);
      })
      .addCase(fetchProductsByfilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByfilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("action.payload: ", action.payload);
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
        // console.log(state.products);
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload;
        // console.log(state.products);
      })
      .addCase(fetchProductByIdNullAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdNullAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload;
        // console.log(state.products);
      }).addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.product);
        // console.log(state.products);
      });
      
      

      
      
     
  },
});

export const { increment} = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllCategories=(state)=>state.product.categories;
export const selectAllBrands=(state)=>state.product.brands;
export const selectedProducts=(state)=>state.product.selectedProduct;
export const selectProductByIdNullAsync=(state)=>state.product.selectedProduct;

export default productSlice.reducer;
