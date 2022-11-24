import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

const initialState = {
    rekaps: [],
    loading: false,
    isError: false,
    error:null
}

export const rekapJadwalReducer = createSlice({
    name: "rekap",
    initialState,

    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        getRekap: (state, action) => { state.rekaps = action.payload },
        setIsError: (state, action) => { state.isError = action.payload },
        setError: (state,action) => {state.error = action.payload}
    }
})

export const { setLoading, getRekap, setIsError, setError } = rekapJadwalReducer.actions;

export default rekapJadwalReducer.reducer;

export const getRekapAsync = createAsyncThunk(
    "rekap/getRekapAsync", 
  async (bulan) => {
    try {
        const response = await api.get(`/v2/absensi/jadwal/rekap-by-user?bulan=${bulan}`);
        console.log('getRekapAsync :', response.data.weeks)
      return response.data;
    } catch (error) {
        // console.error(error);
        return error.response
    }
});