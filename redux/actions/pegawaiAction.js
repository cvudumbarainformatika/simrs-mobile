import { api } from "../../helpers/axiosInterceptor"


export const GET_PEGAWAI = 'GET_PEGAWAI'

export const getPegawai = () => {
    try {
        return async dispatch => {
            const resp = await api.get('/v2/user/me')
            dispatch({
                type: GET_PEGAWAI,
                payload:resp.data.result
            })
        }
    } catch (error) {
        console.log(error)
    }
}