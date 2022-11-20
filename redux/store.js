// import { configureStore } from "@reduxjs/toolkit";

import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import pegawaiReducer from "./reducers/pegawaiReducer";
import jadwalReducer from "./reducers/jadwalReducer";

// import jadwalReducer from './features/jadwalSlice'
// import pegawaiReducer from "./features/pegawaiSlice";

// export const store = configureStore({
//     reducer: {
//         jadwals: jadwalReducer,
//         pegawai: pegawaiReducer
//     },
//     // devTools: true
// });

const rootReducer = combineReducers({ pegawaiReducer, jadwalReducer })

export const store = createStore(rootReducer, applyMiddleware(thunk))