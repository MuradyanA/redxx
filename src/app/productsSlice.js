import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import axios from "axios";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: "idle",
});

export const { selectAll, selectById } = productsAdapter.getSelectors((state) => {
  return state.products;
});

export const getProductsIds = createSelector(
  // (state) => state.products.entities, 2 nel miasin uncomment aneluc normal ashxatuma
  // selectAll,

  // selectAll, Menak es meky chi asxatum

  // (state) => state.products.entities, Es meky menak normal ashxatuma


  (products) => Object.keys(products)
);

export const fetchProducts = createAsyncThunk("https://fakestoreapi.com/products", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: productsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newEntities = {};
        action.payload.forEach((product) => {
          newEntities[product.id] = product;
        });
        state.entities = newEntities;
        state.status = "idle";
      });
  },
});

export const { productsAdded, productsToggled, productsLoading } = productsSlice.actions;

export default productsSlice.reducer;
