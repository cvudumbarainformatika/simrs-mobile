import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "../../helpers/axiosInterceptor";


const initialState = {
    pegawai: {
        nama:'HARIYADI'
    }
}

export const fetchPegawai = createAsyncThunk('pegawai/fetchPegawai', async () => {
    try {
        const response = await api.get('/v2/user/me')
        return response.data.result
    } catch (error) {
        console.log(error)
    }
})

const pegawaiSlice = createSlice({
    name: 'pegawai',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPegawai.fulfilled, (state, action) => {
            state.pegawai.nama = action.payload.nama
        })
    }
})


export const selectPegawai = (state) => state.pegawai;
 
export default pegawaiSlice.reducer