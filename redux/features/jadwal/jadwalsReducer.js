import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"



const initialState = {
    jadwals: [],
    error: null,
    loading: false,


    libur: 0,
    masuk: 0
}


export const jadwalsReducer = createSlice({
    name: "jadwal",
    initialState,
    reducers: {
        setLoading: (state, action) => {state.loading = action.payload},
        getJadwals: (state, action) => {
            state.jadwals = action.payload
        },
        getError: (state, action) => {
            state.error = action.payload
        },
        setStatus:(state, action) => {state.status = action.payload}

    },
    extraReducers: (builder) => {
    
        builder
        .addCase(getJadwalsAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getJadwalsAsync.fulfilled, (state, action) => {
            state.jadwals = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getJadwalsAsync.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
        })
  },
})  

export const { getJadwals, setLoading, getError } = jadwalsReducer.actions;

// INI DIKIRIM KE SELECTOR
export const showJadwals = (state) => state.jadwal.jadwals;
export const showLoading = (state) => state.jadwal.loading;
export const showError = (state) => state.jadwal.error;


export default jadwalsReducer.reducer;

// export const liburJadwalCount = (state) => {
//     let arr = [...state.jadwal.jadwals];
//     let libur = arr.filter((x) => x.status === '2').length
//     state.jadwal.libur = libur
// };

export const getJadwalsAsync = createAsyncThunk(
    "jadwal/getJadwalsAsync", 
    // ini nanti kalo dikasih parameter
  async () => {
    try {
      const response = await api.get('/v2/absensi/jadwal/by-user');
      return response.data;
    } catch (error) {
        console.error(error);
        return error.response
    }
});



