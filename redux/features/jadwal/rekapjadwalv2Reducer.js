import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../helpers/axiosInterceptor"

import dayjs from 'dayjs'
import 'dayjs/locale/id'

const initialState = {
    rekaps: [],
    waiting: false,
    isError: false,
    error: null,

    hadir: [],
    libur: [],
    alphas: [],

    details: [],


    // FLAG
    IJIN: 0,
    SAKIT: 0,
    CUTI: 0,
    DL: 0,
    EXTRA: 0,
    DISPEN: 0,
    A: 0,
    CB: 0,
    TERLAMBAT: '0',
    HADIR: 0,

    // getMonth
    currentmonth: dayjs().month(),
    currentYear: dayjs().year(),
    date: dayjs().locale('id'),

    days: dayjs().daysInMonth(),

    tanggalSekarang: dayjs().locale('id').format('YYYY-MM-DD')
}

export const rekapjadwalv2Reducer = createSlice({
    name: "rekapv2",
    initialState,

    reducers: {
        setWaiting: (state, action) => { state.waiting = action.payload },
        getRekap: (state, action) => { state.rekaps = action.payload },
        setIsError: (state, action) => { state.isError = action.payload },
        setError: (state, action) => { state.error = action.payload },
        setNextMonth: (state) => {
            const m = dayjs().month()
            if (state.currentmonth !== m) {
                let month = state.currentmonth + 1
                state.currentmonth = month
                state.date = dayjs().month(month).locale('id')
            }
        },
        setPrevMonth: (state) => {
            if (state.currentmonth > 0) {
                let month = state.currentmonth - 1
                state.currentmonth = month
                state.date = dayjs().month(month).locale('id')
            }
        },

        setDate: (state) => { state.date = dayjs().locale('id') }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getRekapAsync.pending, (state, action) => {
                state.waiting = true
                state.error = null
                state.isError = false
            })
            .addCase(getRekapAsync.fulfilled, (state, action) => {
                let rekaps = action.payload
                let hadirs = rekaps.masuk ? rekaps.masuk : []
                let ijins = rekaps.libur ? rekaps.libur : []
                let alphas = rekaps.alpha ? rekaps.alpha : []
                let protas = rekaps.prota ? rekaps.prota : []
                let jadwal = rekaps.jadwal ? rekaps.jadwal : false
                state.rekaps = rekaps
                state.hadir = hadirs
                state.libur = ijins
                state.alphas = alphas



                let bukanShift = hadirs.length ? hadirs[0].kategory_id < 3 : false //INI UNTUK KATEGORY BUKAN SHIft

                // let colTerakhirHadir = hadirs.length ? hadirs[hadirs.length - 1].tanggal : false

                let details = []
                for (let i = 0; i < 31; i++) {
                    // let urut = i + 1
                    // let tgl = urut > 9 ? urut.toString() : `0${urut}`
                    // let bln = dayjs(state.date).month() + 1 > 9 ? dayjs(state.date).month() + 1 : `0${dayjs(state.date).month() + 1}`
                    // let thn = dayjs(state.date).year()
                    // let tanggal = `${thn}-${bln}-${tgl}`

                    // let data = hadirs.filter(x => x.tanggal === tanggal)[0]
                    // let hari = dayjs(`${tanggal} 07:00:00`).locale("id").format("dddd")
                    // let msk = data ? data.masuk : false
                    // let masuk = msk ? dayjs(data.created_at).locale("id").format("HH:mm") : false
                    // let plg = data ? data.pulang : false
                    // let pulang = plg ? dayjs(data.updated_at).locale("id").format("HH:mm") : false
                    // let kategory = data ? data.kategory : null

                    // let dataijin = ijins.filter(x => x.tanggal === tanggal)[0]
                    // let dataalpha = alphas.filter(x => x.tanggal === tanggal)[0]

                    // let dataprota = false



                    // if (bukanShift) {
                    //     dataprota = protas.filter(x => x.tgl_libur === tanggal)[0]
                    // }


                    const urut = i + 1;
                    const tgl = urut.toString().padStart(2, '0');
                    const bln = (dayjs(state.date).month() + 1).toString().padStart(2, '0');
                    const thn = dayjs(state.date).year();
                    const tanggal = `${thn}-${bln}-${tgl}`;

                    const data = hadirs.find(x => x.tanggal === tanggal) || {};
                    const msk = data?.masuk || false;
                    const masuk = msk ? dayjs(data.created_at).locale("id").format("HH:mm") : false;
                    const plg = data?.pulang || false;
                    const pulang = plg ? dayjs(data.updated_at).locale("id").format("HH:mm") : false;
                    const kategory = data?.kategory || null;
                    const hari = dayjs(`${tanggal} 07:00:00`).locale("id").format("dddd");
                    const dataijin = ijins.find(x => x.tanggal === tanggal);
                    const dataalpha = alphas.find(x => x.tanggal === tanggal);
                    const dataprota = bukanShift ? protas.find(x => x.tgl_libur === tanggal) : false;

                    // console.log('data', {
                    //     tanggal,
                    //     masuk,
                    //     pulang,
                    //     kategory,
                    // });
                    

                    let status = false
                    let terlambat = 0
                    if (state.tanggalSekarang >= tanggal) {
                        if (dataijin) {
                            status = 'IJIN'
                            terlambat = 0
                        } else {
                            if (masuk || pulang) {
                                status = 'MSK'
                                terlambat = hitungTelat(data)
                            } else {
                                if (dataprota) {
                                    status = 'CB'
                                    terlambat = 0
                                } else {
                                    status = dataalpha ? 'A' :
                                        state.tanggalSekarang === tanggal ? 'WAIT' : 'LIBUR'
                                    terlambat = 0
                                }
                            }
                        }
                    }

                    // if (state.tanggalSekarang <= tanggal) {
                    //     status = false
                    // }

                    let obj = {
                        tgl: tgl,
                        tanggal: tanggal,
                        tanggalMasuk: masuk ? data.tanggal : false,
                        masuk: masuk,
                        pulang: pulang,
                        hari: hari,
                        ijin: dataijin ? dataijin.flag : false,
                        alpha: dataalpha ? dataalpha : false,
                        prota: dataprota ? true : false,
                        kategory: kategory,
                        not_shift: bukanShift,
                        status: status,
                        terlambat: terlambat,
                        txt: terlambat !== 0 ? 'Terlambat' + toHoursAndMinutes(terlambat) : null,

                    }
                    details.push(obj)




                }


                // let details = [];

                // for (let i = 0; i < state.days; i++) {
                //     const urut = i + 1;
                //     const tgl = urut.toString().padStart(2, '0');
                //     const bln = (dayjs(state.date).month() + 1).toString().padStart(2, '0');
                //     const thn = dayjs(state.date).year();
                //     const tanggal = `${thn}-${bln}-${tgl}`;

                //     const data = hadirs.find(x => x.tanggal === tanggal) || {};
                //     const hari = dayjs(`${tanggal} 07:00:00`).locale("id").format("dddd");
                //     const dataijin = ijins.find(x => x.tanggal === tanggal);
                //     const dataalpha = alphas.find(x => x.tanggal === tanggal);
                //     const dataprota = bukanShift ? protas.find(x => x.tgl_libur === tanggal) : false;

                //     let status = 'LIBUR';
                //     let terlambat = 0;

                //     if (state.tanggalSekarang >= tanggal) {
                //         if (dataijin) {
                //             status = 'IJIN';
                //         } else if (data.masuk) {
                //             status = 'MSK';
                //             terlambat = hitungTelat(data);
                //         } else if (dataprota) {
                //             status = 'CB';
                //         } else if (dataalpha) {
                //             status = 'A';
                //         } else if (state.tanggalSekarang === tanggal) {
                //             status = 'WAIT';
                //         }
                //     }

                //     details.push({
                //         tgl,
                //         tanggal,
                //         tanggalMasuk: data.masuk ? data.tanggal : false,
                //         masuk: data.masuk ? dayjs(data.created_at).locale("id").format("HH:mm") : false,
                //         pulang: data.pulang ? dayjs(data.updated_at).locale("id").format("HH:mm") : false,
                //         hari,
                //         ijin: dataijin ? dataijin.flag : false,
                //         alpha: dataalpha || false,
                //         prota: !!dataprota,
                //         kategory: data.kategory || null,
                //         not_shift: bukanShift,
                //         status,
                //         terlambat
                //     });
                // }


                // this.items.sort((a, b) => a.TAKMASOK - b.TAKMASOK) : this.items = this.items.sort((a, b) => b.TAKMASOK - a.TAKMASOK)
                state.details = details.length > 0 ?
                    details.sort((a, b) => a.tanggal > b.tanggal ? -1 : 1) : []
                // FLAG
                state.CUTI = details.filter(x => x.ijin === 'CUTI').length
                state.IJIN = details.filter(x => x.ijin === 'IJIN').length
                state.SAKIT = details.filter(x => x.ijin === 'SAKIT').length
                state.DL = details.filter(x => x.ijin === 'DL').length
                state.EXTRA = details.filter(x => x.ijin === 'EXTRA').length
                state.DISPEN = details.filter(x => x.ijin === 'DISPEN').length
                state.HADIR = details.filter(x => x.status === 'MSK').length
                state.A = details.filter(x => x.status === 'A').length

                // terlambat
                state.TERLAMBAT = toHoursAndMinutes(details.reduce((a, v) => a = a + v.terlambat, 0))

                // the other
                state.waiting = false
                state.error = null
                state.isError = false
            })
            .addCase(getRekapAsync.rejected, (state, action) => {
                state.waiting = false
                state.error = action.payload
                state.isError = true
            })
    }
})

const hitungTelat = (x) => {
    const jamMasukKategory = x.kategory ? x.kategory.masuk : '00:00:00'
    const jamMasukServer = dayjs(x.created_at).format('HH:mm:ss')

    const tglKategory = dayjs(x.tanggal).format('YYYY-MM-DD')
    const tglMasukServer = dayjs(x.created_at).format('YYYY-MM-DD')


    const date1 = dayjs(tglMasukServer + ' ' + jamMasukServer) //masuk
    const date2 = dayjs(tglKategory + ' ' + jamMasukKategory) //kategory

    const terlambat = date1 > date2
    let hitung = 0

    if (terlambat) {
        hitung = date1.diff(date2, 'minute')
    }
    return hitung
}

function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours > 0 ? ` ${hours} jam` : ''}` +
        `${minutes > 0 ? ` ${minutes.toFixed(0)} mnt` : ''}`
}

function lihatjadwal(x) {
    if (x) {
        return x.status === '2' ? 'BLM' : 'LIBUR'
    }
}

export const { setWaiting, getRekap, setIsError, setError, setNextMonth, setPrevMonth, setDate } = rekapjadwalv2Reducer.actions;

export default rekapjadwalv2Reducer.reducer;

export const getRekapAsync = createAsyncThunk(
    "rekap/getRekapAsync",
    async (bulan) => {
        try {
            const response = await api.get(`/v2/absensi/history/data?bulan=${bulan}`);
            // console.log('getRekapv2Async :', response.data.jadwal)
            return response.data;
        } catch (error) {
            // console.error(error);
            return error.response
        }
    });