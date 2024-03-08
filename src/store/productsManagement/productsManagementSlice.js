import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../../services/methods";

export const getProducts = createAsyncThunk(
  "productsManagement/getProducts",
  async (params) => {
    const getData = async () => {
      return GET("/products", { params }).then((res) => {
        return res;
      });
    };
    try {
      return await getData();
    } catch (error) {
      return [];
    }
  }
);

export const getProductById = createAsyncThunk(
  "productsManagement/getProductById",
  async (productId) => {
    const getData = async () => {
      return GET(`/products/${productId}`).then((res) => {
        return res;
      });
    };
    try {
      return await getData();
    } catch (error) {
      return [];
    }
  }
);

const initialState = {
  loading: false,
  productsInfo: {},
  error: "",
};

export const productsManagementSlice = createSlice({
  name: "products management",
  initialState,
  reducers: {
    getProductsByProductIds: (state, action) => {
      // const { payload } = action;
      // const products = state.allProducts.filter((prod) =>
      //   payload.includes(prod.productId)
      // );
      // action.payload = JSON.parse(JSON.stringify(products));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.productsInfo = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
      state.error = "Network Error !!!";
    });
  },
});

export const { getProductsByProductIds } = productsManagementSlice.actions;
export default productsManagementSlice.reducer;
