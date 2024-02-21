


const SERV = process.env.EXPO_PUBLIC_API_URL
const SERV_LOCAL = 'http://192.168.150.111:3507'

const BASE = SERV + '/api'
const BASE_LOCAL = SERV_LOCAL + '/api'

// const PATH_IMG100 = 'https://rsudmsaleh.probolinggokota.go.id/simpeg/foto'
// const PATH_IMG100 = 'http://36.89.103.114:4542/simpeg/foto'
const PATH_IMG100 = process.env.EXPO_PUBLIC_PATH_IMG100



export { SERV, SERV_LOCAL, BASE, BASE_LOCAL, PATH_IMG100 }