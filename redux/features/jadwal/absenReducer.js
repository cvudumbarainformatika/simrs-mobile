import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"


const initialState = {
    id: 0,
    interv: 0,
    waiting: false,
    isDone:false,
    error: null,


    absenToday: null,
    isAbsen:false
    
}

export const absenReducer = createSlice({
    name: "absen",
    initialState,
    reducers: {
        setWaiting: (state, action) => {state.waiting = action.payload},
        setId: (state, action) => { state.id = action.payload },
        setIsDone: (state, action) => { state.isDone = action.payload },
        setIsAbsen: (state, action) => { state.isAbsen = action.payload },
        setInterv: (state, action) => {state.interv = action.payload}
    },


    extraReducers: (builder) => {
        builder.addCase(getAbsenTodayAsync.pending , (state, action) => {
            state.waiting = true;
            state.error = null;
            state.isDone = false;
            state.absenToday = null;
            state.isAbsen = false
        })

        builder.addCase(getAbsenTodayAsync.fulfilled, (state, action) => {
            state.id = action.payload? action.payload.id:0;
            state.absenToday = action.payload? action.payload:null;
            state.error = null;
            state.isDone = true;
            state.waiting = false;
            state.isAbsen = true
        })

        builder.addCase(getAbsenTodayAsync.rejected, (state, action) => {
            state.id = 0;
            state.error = 'belum ada absen hari ini';
            state.waiting = false;
            state.isDone = true;
            state.absenToday = null
            state.isAbsen = false
        })
    }
}) 


export const { setId, setIntrv, setWaiting, setIsDone, setIsAbsen } = absenReducer.actions;

export default absenReducer.reducer;


export const getAbsenTodayAsync = createAsyncThunk(
    "absen/getAbsenTodayAsync", 
  async () => {
    try {
        const response = await api.get('/v2/absensi/jadwal/absen-today');
        console.log('response absen today : ',response.data);
        return response.data;
    } catch (error) {
        console.log('reducer tangkap :',error);
        // return error.response.status
    }
});

// export const postAbsenAsync = createAsyncThunk(
//     "absen/postAbsenAsync", 
//   async (form) => {
//     try {
//         const response = await api.post('/v2/absensi/qr/scan', form);
//         console.log('response absen : ',response.data);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return error.response
//     }
// });