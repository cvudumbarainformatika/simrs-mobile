import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"



const initialState = {
    jadwals: [],
    error: null,
    loading: false,
    waiting: false,
    currentJadwal: null,


    libur: 0,
    masuk: 0,
    totalJam: 0,
    totalMenit: 0,
    totalJamMenit: 0
}


export const jadwalsReducer = createSlice({
    name: "jadwal",
    initialState,
    reducers: {
        setLoading: (state, action) => { state.loading = action.payload },
        getJadwals: (state, action) => {
            state.jadwals = action.payload
        },
        getError: (state, action) => {
            state.error = action.payload
        },
        setStatus: (state, action) => { state.status = action.payload },

        setLibur: (state) => { state.libur = state.jadwals.length > 0 ? state.jadwals.filter(x => x.status === '1').length : 0 },
        setMasuk: (state) => { state.masuk = state.jadwals.length > 0 ? state.jadwals.filter(x => x.status === '2').length : 0 },

        setTotalJam: (state) => state.jadwals.map(x => x.status === '2' || x.status === 2 ? x.jam : 0).reduce((r, x) => r + x, 0),
        setTotalMenit: (state) => state.jadwals.map(x => x.status === '2' || x.status === 2 ? x.menit : 0).reduce((r, x) => r + x, 0)



    },
    extraReducers: (builder) => {

        builder
            .addCase(getJadwalsAsync.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJadwalsAsync.fulfilled, (state, action) => {
                let jadwalss = action.payload
                state.jadwals = jadwalss.length > 0 ? jadwalss : [];
                state.loading = false;
                state.waiting = false;
                state.error = null;
                state.libur = state.jadwals.length > 0 ? state.jadwals.filter(x => x.status === '1').length : 0
                state.masuk = state.jadwals.length > 0 ? state.jadwals.filter(x => x.status === '2').length : 0
                state.totalJam = state.jadwals.length > 0 ? state.jadwals.map(x => x.status === '2' || x.status === 2 ? x.jam : 0).reduce((r, x) => r + x, 0) : 0,
                    state.totalMenit = state.jadwals.length > 0 ? state.jadwals.map(x => x.status === '2' || x.status === 2 ? x.menit : 0).reduce((r, x) => r + x, 0) : 0

            })
            .addCase(getJadwalsAsync.rejected, (state, action) => {
                state.error = "error response"
                state.loading = false;
                state.waiting = false;
            })



            .addCase(updateJadwalsAsync.pending, (state, action) => {
                // state.loading = true;
                state.waiting = true;
                state.error = null;
            })
            .addCase(updateJadwalsAsync.fulfilled, (state, action) => {
                let newJadwals = [...state.jadwals]
                state.jadwals = newJadwals.map(x => x.id === action.payload.id ? x = action.payload : x)
                // state.jadwals = [...state.jadwals]
                // state.jadwals = state.jadwals.map(x => x.id === action.payload.id ? x = action.payload : x)

                state.libur = action.payload.status === '1' || action.payload.status === 1 ? state.libur + 1 : state.libur - 1
                state.masuk = action.payload.status === '1' || action.payload.status === 1 ? state.masuk - 1 : state.masuk + 1
                state.totalJam = state.jadwals.map(x => x.status === '2' || x.status === 2 ? x.jam : 0).reduce((r, x) => r + x, 0)
                // state.loading = false;
                state.waiting = false;
            })

            .addCase(updateJadwalsAsync.rejected, (state, action) => {
                state.error = "error response"
                // state.loading = false;
                state.waiting = false;
            })
    },
})

export const { getJadwals, setLoading, getError, setLibur, setMasuk, setTotalJam } = jadwalsReducer.actions;

export default jadwalsReducer.reducer;

// INI DIKIRIM KE SELECTOR
export const showJadwals = (state) => state.jadwal.jadwals;
export const showLoading = (state) => state.jadwal.loading;
export const showError = (state) => state.jadwal.error;

// export const getCurrentJadwal = (state, hari) => {
//     const index = state.jadwal.jadwals.findIndex((item) => item.hari === hari || item.day === hari)
//     state.jadwal.jadwals[index]
// };
export const getCurrentJadwal = (state, hari) => {
    let newJadwals = [...state.jadwal.jadwals]
    if (newJadwals.length > 0) {
        newJadwals = newJadwals.filter((item) => item.hari === hari || item.day === hari).reduce((curr, item) => curr = item, {})
        return newJadwals
    }

    return newJadwals
}

export const getJadwalsAsync = createAsyncThunk(
    "jadwal/getJadwalsAsync",
    async () => {
        try {
            const response = await api.get('/v2/absensi/jadwal/by-user');
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response
        }
    });
export const updateJadwalsAsync = createAsyncThunk(
    "jadwal/updateJadwalsAsync",
    async (form) => {
        try {
            const response = await api.post('/v2/absensi/jadwal/update', form);
            console.log('response update jadwals', response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return error.response
        }
    });





