import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"


const initialState = {
    id: 0,
    interv: 0,
    waiting: false,
    isDone:false,
    error:null
}

export const absenReducer = createSlice({
    name: "absen",
    initialState,
    reducers: {
        setWaiting: (state, action) => {state.waiting = action.payload},
        setId: (state, action) => { state.id = action.payload },
        setIsDone: (state, action) => { state.id = action.payload },
        setInterv: (state, action) => {state.interv = action.payload}
    },


    // extraReducers: (builder) => {
    //     builder.addCase(postAbsenAsync.pending , (state, action) => {
    //         state.waiting = true,
    //             state.error = null
    //         state.isDone = false
    //     })

    //     builder.addCase(postAbsenAsync.fulfilled, (state, action) => {
    //         state.id = action.payload.jadwal? action.payload.jadwal.data.id : 0,
    //         // state.interv = action.payload.jadwal? action.payload.jadwal.data.kategori.jam: 0,
    //         state.error = null
    //         state.isDone = true
    //     })

    //     .addCase(postAbsenAsync.rejected, (state, action) => {
    //         state.error = action.payload
    //         state.waiting = false;
    //         state.isDone = true
    //     })
    // }
}) 


export const { setId, setIntrv, setWaiting, setIsDone } = absenReducer.actions;

export default absenReducer.reducer;


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