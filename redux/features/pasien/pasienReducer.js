import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

import dayjs from 'dayjs'
import 'dayjs/locale/id'

const initialState = {
  pasiens: [],
  meta:null,
  waiting: false,
  isError: false,
  error: null,

  // getMonth
  currentmonth: dayjs().month(),
  date: dayjs().locale('id'),
  tglAwal: dayjs().locale('id').format('YYYY-MM-DD'),
  tglAkhir: dayjs().locale('id').format('YYYY-MM-DD'),
  // tglAwal: '2024-04-22',
  // tglAkhir: '2024-04-22',
  category:null,
  kodepoli:[],
  page:1,
  q:'',
}

export const pasienReducer = createSlice({
  name: "pasien",
  initialState,

  reducers: {
    setWaiting: (state, action) => { state.waiting = action.payload },
    setIsError: (state, action) => { state.isError = action.payload },
    setError: (state, action) => { state.error = action.payload },
    setDate: (state) => { state.date = dayjs().locale('id') },
    setTglAwal: (state, action) => { state.tglAwal = action.payload },
    setTglakhir: (state, action) => { state.tglAkhir = action.payload },
    setCategory: (state, action) => { state.category = action.payload },
    setKodepoli: (state, action) => { state.kodepoli = action.payload },
    setQ: (state, action) => { state.q = action.payload },
    setPasiens: (state, action) => { state.pasiens = action.payload },
  },

  extraReducers:(builder)=> {
    builder
    .addCase(getPasienAsync.pending, (state, action) => {
      state.waiting = true
      state.error = null
      state.isError = false
    })
    .addCase(getPasienAsync.fulfilled, (state, action) => {
      state.pasiens = []
      const resp = action.payload
      state.pasiens = resp.data
      state.meta = resp
      state.waiting = false
      state.isError = false
      state.error = null
    })
    .addCase(getPasienAsync.rejected, (state, action) => {
      state.waiting = false
      state.error = action.payload
      state.isError = true
  })

  }
})

export const { setWaiting, getRekap, setIsError, setError, setTglAwal, setTglakhir, setCategory, setKodepoli, setQ, setPasiens } = pasienReducer.actions;

export default pasienReducer.reducer;

export const getPasienAsync = createAsyncThunk(
  "pasien/getPasienAsync",
  async (params) => {
      try {
          // const response = await api.get(`/v2/simrs/kunjungan/pasien/poli?tgl_awal=${params.tglAwal}&tgl_akhir=${params.tglAkhir}&category=${params.category}&page=${params.page}&kodepoli=${params.kodepoli}&q=${params.q}`);
          const response = await api.get(`/v2/simrs/kunjungan/pasien/poli`, params);
          console.log('getPasienAsync :')
          return response.data;
      } catch (error) {
          // console.error(error);
          return error.response
      }
  });