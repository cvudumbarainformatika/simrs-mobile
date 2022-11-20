import {
    GET_JADWALS, REFRESH_JADWAL, JADWAL_LOADING, POST_JADWAL_SUCCESS, UPDATE_JADWAL_SUCCESS, UBAH_STATUS_KE_IDLE,
    GET_KATEGORY_JADWALS, SLICE_KATEGORY_JADWALS, LOADING_KATEGORY_JADWALS,ERROR_KATEGORY_JADWALS
} from "../actions/jadwalActions"; 



const initialState = {
    jadwals: [],
    kategories: [],
    sliceKategories:[],
    loading: false,
    error:null,
    

    status: 'Idle', // Idle || Success || Error  

}


function jadwalReducer(state = initialState, action) {
    switch (action.type) {
        // INI UNTUK JADWAL
        case REFRESH_JADWAL:
            return { ...state, loading: true }
        case GET_JADWALS:
            return { ...state, jadwals: action.payload, loading:false, error:null, status: 'Idle' }
        
        
        // INI UNTUK KATEGORY
        case LOADING_KATEGORY_JADWALS:
            return { ...state, loading: action.payload, error:null, status: 'Idle' }
        case GET_KATEGORY_JADWALS:
            return {
                ...state,
                kategories: action.payload,
                sliceKategories: state.kategories, 
                // sliceKategories: state.sliceKategories.push(state.newKategory),
                loading: false,
                error: null,
                status: 'Idle'
            }
        
        case POST_JADWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                status: 'Success'
            }
        case UPDATE_JADWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                jadwals: state.jadwals.map(x => {
                    if (x.id === action.payload.id) {
                        return x = action.payload
                    }

                    return x
                }),
            }
        case UBAH_STATUS_KE_IDLE:
            return {
               ...state,
                loading: false,
                error: null,
                status: 'Idle',
            }
        case ERROR_KATEGORY_JADWALS:
            return {...state, error: action.payload, loading:false, status: 'Error'}
        default:
            return state
    }
}


export const updateJadwals = (state, payload) =>{
    return state.map(jadwal => {
        if (jadwal.id === payload.id) {
            return {
                ...jadwal,
                jadwal: payload
            }
        };
        return jadwal;
      });
}



export default jadwalReducer;