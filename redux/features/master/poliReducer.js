import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

import dayjs from 'dayjs'
import 'dayjs/locale/id'

const initialState = {
  items: [],
  loading: false,
  isError: false,
  error: null,
}

export const poliReducer = createSlice({
  name: "masterPoli",
  initialState,

  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setIsError: (state, action) => { state.isError = action.payload },
    setError: (state, action) => { state.error = action.payload },
  },

  extraReducers:(builder)=> {
    builder
    .addCase(getPoliAsync.pending, (state, action) => {
      state.loading = true
      state.error = null
      state.isError = false
    })
    .addCase(getPoliAsync.fulfilled, (state, action) => {
      let resp = action.payload
      state.items = resp
      state.loading = false
      state.error = null
      state.isError = false

      
    })
    .addCase(getPoliAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isError = true
  })

  }
})

export const { setLoading, setIsError, setError } = poliReducer.actions;

export default poliReducer.reducer;

export const getPoliAsync = createAsyncThunk(
  "masterPoli/getPoliAsync",
  async () => {
      try {
          const response = await api.get(`/v2/simrs/master/poli/getPoli`);
          console.log('getPoliAsync :')
          return response.data;
      } catch (error) {
          // console.error(error);
          return error.response
      }
  });