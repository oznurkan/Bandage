/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getDataInfo = createAsyncThunk( "getDataInfo", async (_, { rejectWithValue }) => {
  try{
    const response = await axios.get("/data.json");
    const data = await response.data;
    return data;

  }catch(error){
    return rejectWithValue(error.message || "Bilinmeyen bir hata oluştu.")
  }
  
})


export const dataInfoSlice = createSlice({
  name: "dataInfo",
  initialState : {
    content: null,
    loading: false,  
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(getDataInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export default dataInfoSlice.reducer; */