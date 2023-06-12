import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

import dayjs from 'dayjs'
import 'dayjs/locale/id'

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
    EXTRA: 0,

    // getMonth
    currentmonth: dayjs().month(),
    date: dayjs().locale('id')
}

export const rekapJadwalReducer = createSlice({
    name: "rekap",
    initialState,

    reducers: {
        setWaiting: (state, action) => { state.waiting = action.payload },
        getRekap: (state, action) => { state.rekaps = action.payload },
        setIsError: (state, action) => { state.isError = action.payload },
        setError: (state, action) => { state.error = action.payload },
        setNextMonth: (state) => {
            const m = dayjs().month()
            if (state.currentmonth !== m) {
                let month = state.currentmonth + 1
                state.currentmonth = month
                state.date = dayjs().month(month).locale('id')
            }
        },
        setPrevMonth: (state) => {
            if (state.currentmonth > 0) {
                let month = state.currentmonth - 1
                state.currentmonth = month
                state.date = dayjs().month(month).locale('id')
            }
        },

        setDate: (state) => { state.date = dayjs().locale('id') }
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
                state.hadir = action.payload.masuk ? action.payload.masuk : []
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

export const { setWaiting, getRekap, setIsError, setError, setNextMonth, setPrevMonth, setDate } = rekapJadwalReducer.actions;

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