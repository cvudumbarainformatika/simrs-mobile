// INI STORE LAMA =================================================================================

// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
// import thunk from "redux-thunk";

// import pegawaiReducer from "./reducers/pegawaiReducer";
// import jadwalReducer from "./reducers/jadwalReducer";

// const rootReducer = combineReducers({
//     pegawaiReducer,
//     jadwalReducer
// })

// export const store = createStore(rootReducer, applyMiddleware(thunk))


// ==========================================================================================INI STORE BARU
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import absenReducer from './features/jadwal/absenReducer'
import jadwalsReducer from './features/jadwal/jadwalsReducer'
import kategoryJadwalReducer from './features/jadwal/kategoryJadwalReducer'
import rekapJadwalReducer from './features/jadwal/rekapJadwalReducer'
import rekapjadwalv2Reducer from './features/jadwal/rekapjadwalv2Reducer'

const rootReducer = combineReducers({
  jadwal: jadwalsReducer,
  kategory: kategoryJadwalReducer,
  rekap: rekapJadwalReducer,
  rekapv2: rekapjadwalv2Reducer,
  absen: absenReducer
})


const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }),
  reducer: rootReducer

})

export default store