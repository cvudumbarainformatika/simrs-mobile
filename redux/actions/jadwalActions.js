import { api } from "../../helpers/axiosInterceptor"


export const GET_JADWALS = 'GET_JADWALS'
export const REFRESH_JADWAL = 'REFRESH_JADWAL'
export const TUTUP_LOADING = 'TUTUP_LOADING'
export const POST_JADWAL_SUCCESS = 'POST_JADWAL_SUCCESS'
export const UPDATE_JADWAL_SUCCESS = 'UPDATE_JADWAL_SUCCESS'
export const UBAH_STATUS_KE_IDLE = 'UBAH_STATUS_KE_IDLE'
export const JADWAL_LOADING = 'JADWAL_LOADING'

export const GET_KATEGORY_JADWALS = 'GET_KATEGORY_JADWALS'
export const SLICE_KATEGORY_JADWALS = 'SLICE_KATEGORY_JADWALS'
export const LOADING_KATEGORY_JADWALS = 'LOADING_KATEGORY_JADWALS'
export const ERROR_KATEGORY_JADWALS = 'ERROR_KATEGORY_JADWALS'

export const fetchJadwals = () => {
    return async (dispatch, getState) => {
        dispatch({type:REFRESH_JADWAL, payload:true})
        try {
            const resp = await api.get('/v2/absensi/jadwal/by-user')
            dispatch({
                type: GET_JADWALS,
                payload:resp.data
            })
            
        } catch (error) {
            dispatch({type:ERROR_KATEGORY_JADWALS, payload:error.response})
        }
    }
}
export const fetchKategoryJadwals = () => {
    return async (dispatch, getState) => {
        dispatch({type:LOADING_KATEGORY_JADWALS, payload:true})
        try {
            const resp = await api.get('/v2/absensi/jadwal/kategori')
            dispatch({ type: GET_KATEGORY_JADWALS, payload: resp.data })
            
        } catch (error) {
            dispatch({type:ERROR_KATEGORY_JADWALS, payload:error.response})
        }
    }
}
export const postAwalJadwal = (form) => {
    return async (dispatch, getState) => {
        dispatch({type:LOADING_KATEGORY_JADWALS, payload:true})
        try {
            await api.post('/v2/absensi/jadwal/simpan', form).then(resp => {
                dispatch({type:POST_JADWAL_SUCCESS, payload:'DATA TERSIMPAN'})
            })
            
            
        } catch (error) {
            dispatch({type:ERROR_KATEGORY_JADWALS, payload:error.response})
        }
    }
}

export const changeStatusAlertToIdle = () => {
    return async (dispatch, getState) => { 
        dispatch({ type: UBAH_STATUS_KE_IDLE })
    }
}


export const updateJadwalToDb = (form) => {
    return async (dispatch) => {
        dispatch({ type: REFRESH_JADWAL })
        try {
            const resp = await api.post('/v2/absensi/jadwal/update', form)
            dispatch({ type: UPDATE_JADWAL_SUCCESS, payload: resp.data.data })
        } catch (error) {
            dispatch({type:ERROR_KATEGORY_JADWALS, payload:error.response})
        }
    }
}