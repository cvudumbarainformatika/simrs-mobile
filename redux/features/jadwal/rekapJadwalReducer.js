import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

const initialState = {
    rekaps: [],
    waiting: false,
    isError: false,
    error: null,
    
    hadir: [],
    libur:[]
}

export const rekapJadwalReducer = createSlice({
    name: "rekap",
    initialState,

    reducers: {
        setWaiting: (state, action) => { state.waiting = action.payload },
        getRekap: (state, action) => { state.rekaps = action.payload },
        setIsError: (state, action) => { state.isError = action.payload },
        setError: (state,action) => {state.error = action.payload}
    },

    extraReducers: (builder) => {
        builder
            .addCase(getRekapAsync.pending, (state, action) => {
                state.waiting = true
                state.error = null
                state.isError = false
            })
            .addCase(getRekapAsync.fulfilled, (state, action) => {
                state.rekaps = action.payload
                state.hadir = action.payload.masuk? action.payload.masuk:[]
                state.libur = action.payload.libur? action.payload.libur:[]
                state.waiting = false
                state.error = null
                state.isError = false
            })
            .addCase(getRekapAsync.rejected, (state, action) => {
                state.waiting = false
                state.error = action.payload
                state.isError = true
        })
    }
})

export const { setWaiting, getRekap, setIsError, setError } = rekapJadwalReducer.actions;

export default rekapJadwalReducer.reducer;

export const getRekapAsync = createAsyncThunk(
    "rekap/getRekapAsync", 
  async (bulan) => {
    try {
        const response = await api.get(`/v2/absensi/jadwal/rekap-by-user-libur?bulan=${bulan}`);
        console.log('getRekapAsync :', response.data)
      return response.data;
    } catch (error) {
        // console.error(error);
        return error.response
    }
});