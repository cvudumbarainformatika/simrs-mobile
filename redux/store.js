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
import { configureStore } from '@reduxjs/toolkit'
import jadwalsReducer from './features/jadwal/jadwalsReducer'
import kategoryJadwalReducer from './features/jadwal/kategoryJadwalReducer'
import rekapJadwalReducer from './features/jadwal/rekapJadwalReducer'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    jadwal    : jadwalsReducer,
    kategory  : kategoryJadwalReducer,
    rekap     :rekapJadwalReducer,
  },

})

export default store