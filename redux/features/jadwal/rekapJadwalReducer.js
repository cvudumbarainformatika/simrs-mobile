import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

const initialState = {
    rekaps: [],
    waiting: false,
    isError: false,
    error: null,
    
    hadir: [],
    libur: [],


    // FLAG
    IJIN: 0,
    SAKIT: 0,
    CUTI: 0,
    DL: 0,
    EXTRA:0,
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
                state.libur = action.payload.libur ? action.payload.libur : []
                // FLAG
                state.CUTI = action.payload.libur ?
                    action.payload.libur.filter(x => x.flag === 'CUTI').length : 0
                state.IJIN = action.payload.libur ?
                    action.payload.libur.filter(x => x.flag === 'IJIN').length : 0
                state.SAKIT = action.payload.libur ?
                    action.payload.libur.filter(x => x.flag === 'SAKIT').length : 0
                state.DL = action.payload.libur ?
                    action.payload.libur.filter(x => x.flag === 'DL').length : 0
                state.EXTRA = action.payload.libur ?
                    action.payload.libur.filter(x => x.flag === 'EXTRA').length : 0
                
                
                // the other
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
        console.log('getRekapAsync :', response.data.libur)
      return response.data;
    } catch (error) {
        // console.error(error);
        return error.response
    }
});