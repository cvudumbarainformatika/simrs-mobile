import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"



const initialState = {
    kategories: [],
    error: null,
    loading: false,
    status:'Idle', // Idle || Pending || Error || Success (for post) || Done (for get)
}


export const kategoryJadwalsReducer = createSlice({
    name: "kategory",
    initialState,
    reducers: {
        setLoading: (state, action) => {state.loading = action.payload},
        getKategories: (state, action) => {
            state.kategories = action.payload
        },
        getError: (state, action) => {
            state.error = action.payload
        }

    },
    extraReducers: (builder) => {
    
        builder
        .addCase(getKategoriesAscync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.status = 'Pending'
        })
        .addCase(getKategoriesAscync.fulfilled, (state, action) => {
            state.kategories = action.payload;
            state.loading = false;
            state.error = null;
            state.status = 'Done'
        })
        .addCase(getKategoriesAscync.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
            state.status = 'Error'
        })
  },
})  

export const { getKategories, setLoading, getError } = kategoryJadwalsReducer.actions;

// INI DIKIRIM KE SELECTOR

export const showKategories = (state) => state.kategory.kategories;
export const sliceKategoriesAwal = (state) => {
    let newKategories = [...state.kategory.kategories]
    if (newKategories.length > 0) {
        return newKategories.slice(2)
    }
    return newKategories
}
// export const showError = (state) => state.jadwal.error;

export default kategoryJadwalsReducer.reducer;

export const getKategoriesAscync = createAsyncThunk(
    "kategory/getKategoriesAscync", 
    async () => {
      
        try {
            const resp = await api.get('/v2/absensi/jadwal/kategori')
            return resp.data
        } catch (error) {
            return error.response
        }
     
});



