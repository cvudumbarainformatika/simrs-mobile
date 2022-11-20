import { GET_PEGAWAI } from "../actions/pegawaiAction";



const initialState = {
    pegawai: null
}


function pegawaiReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PEGAWAI:
            return {...state, pegawai: action.payload}
    
        default:
            return state
    }
}

export default pegawaiReducer;