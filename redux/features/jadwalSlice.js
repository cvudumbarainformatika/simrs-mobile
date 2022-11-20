import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "../../helpers/axiosInterceptor";

// createAsyncThunk untuk bermain asyn chronus function





// ini untuk actionnya
export const getJadwals = createAsyncThunk(
    "jadwals/getJadwals", async () => {
        try {
            const resp = await api.get('/v2/absensi/jadwal/by-user')
            // console.log(resp)
            return [...resp.data]
        } catch (error) {
            console.log(error)
            return error.message
        }
    }
)

const initialState = {
    jadwals: [],
    status: 'idle', //'idle' | 'pending' | 'succeeded' | 'failed',
    error: null
}


const jadwalSlice = createSlice({
    name: "jadwals",
    initialState,

    extraReducers(builder) {
        builder
            .addCase(getJadwals.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getJadwals.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.jadwals = action.payload
            })
            .addCase(getJadwals.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
        })
  },
});

// export const jadwalSelectors = jadwalEntity.getSelectors(state => state.jadwal); //state.jadwal harus sama dengan nama reducer di store

export const getJadwalAll = (state) => state.jadwals;
export const getStatusJadwal = (state) => state.status;
export const getErrorJadwal = (state) => state.error;

export default jadwalSlice.reducer;
