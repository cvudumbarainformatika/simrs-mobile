
import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppAlert, AppLoader } from '../../components'
import { ROUTES, tw } from '../../constants'
import { AbsenContext } from '../../context/AbsenContext'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'

import dayjs from 'dayjs'
import 'dayjs/locale/id'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

const ScreenAbsenV4 = ({ navigation }) => {
    
    const [date, setDate] = useState(dayjs().locale("id"))
    const [info, setInfo] = useState(false)

    const {
        cond, schedule, isWait, currentJadwal,
        searchJadwalAndSet, saveStore
    } = useContext(AbsenContext)
    
    const { mulaiWaktuMasuk, mulaiWaktuPulang, statusStorrage, kategoryStorrage, stopWaktuAbsen } = schedule

    


    function handleScheduleAndBackToHome() {
        if (cond === 'idle') {
            searchJadwalAndSet()
        }

        navigation.navigate(ROUTES.HOME_TAB)
    }


    function toQrScan(sts) {
        let tglAbsen;
        let form;
        
        tglAbsen = dayjs(mulaiWaktuMasuk).format("YYYY-MM-DD")

        if (sts === "Absen Masuk") {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "masuk",
                kategory_id:kategoryStorrage
            }
        } else {
            form = {
                tanggal: tglAbsen,
                jam: date.format("HH:mm:ss"),
                status: "pulang",
                kategory_id:kategoryStorrage
            }
        }

        navigation.navigate(ROUTES.QR_SCAN, form)
        // console.log(form)
    }


    
    function renderHeader() {

        
        console.log('renderHeader...', mulaiWaktuMasuk)

        return (
            <View className="px-3 pt-8 pb-2 bg-white">
                <View className="flex-row items-center">
                    <View className="flex-row items-center flex-1">
                        <TouchableOpacity className="" onPress={()=> handleScheduleAndBackToHome()}>
                            <Icon name="close" color="black" size={28} />
                        </TouchableOpacity>
                        <Text className="font-poppinsBold ml-2">Status Absen</Text>
                    </View>
                    <View className="flex-row items-center">
                        <TouchableOpacity className="" onPress={()=>setInfo(true) }>
                            <Icon name="information-variant" color="black" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mt-2 mx-2">
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="font-poppins text-xs text-gray">Mulai Absen Masuk</Text>
                            <Text className="font-poppins">{ dayjs(mulaiWaktuMasuk).format("DD MMM YYYY , HH:mm") }</Text>
                        </View>
                        <View>
                            <Text className="font-poppins text-xs text-gray text-right">Mulai Absen Pulang</Text>
                            <Text className="font-poppins">{ dayjs(mulaiWaktuPulang).format("DD MMM YYYY , HH:mm") }</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderContent() {
        console.log('render content...',schedule)
        let rangeMasuk = false;
        let rangePulang = false;
        let stopped = false;
        let libur = false;

        // console.log('schedule update :', schedule)
        // console.log('updateJadwal', schedule.mulaiWaktuMasuk)
        libur = statusStorrage === "1" || statusStorrage === 1
        rangeMasuk = dayjs().isBetween(dayjs(mulaiWaktuMasuk), dayjs(mulaiWaktuPulang))
        rangePulang = dayjs().isBetween(dayjs(mulaiWaktuPulang), dayjs(stopWaktuAbsen))
        stopped = dayjs().isSameOrAfter(dayjs(stopWaktuAbsen))

        console.log('range masuk', rangeMasuk)
        console.log('range pulang', rangePulang)
        console.log('stop', stopped)
        console.log('libur', libur)

        let sts = ""
        let icn = "bell-ring"
        let clr = "primary"

        if (libur) {
            sts = "Tidak Ada Jadwal"
            icn = "calendar"
            clr = "secondary"
            saveStore('idle')
        } else {
            if (rangeMasuk) {
                if (cond === 'checkIn') {
                    sts = "Sudah Absen Masuk"
                    icn = "check-decagram"
                    clr = "primary"
                        
                } else {
                    sts = "Absen Masuk"
                    icn = "bell-ring"
                    clr = "primary"
                }
            } else if (rangePulang) {
                if (cond === 'checkOut') {
                    sts = "Sudah Absen Pulang"
                    icn = "check-decagram"
                    clr = "negative"
                        
                } else {
                    sts = "Absen Pulang"
                    icn = "bell-ring"
                    clr = "negative"
                }
            } else if (stopped) {
                sts = "Absen Complete"
                icn = "check-decagram"
                clr = "secondary"
                saveStore('idle')
            } else { 
                sts = "Belum Saatnya Absen"
                icn = "calendar-clock"
                clr = "gray-dark"
                saveStore('idle')
            }
        }

        

        return (
            <>
            <View className="flex-1 items-center justify-center">
                <Icon name={icn} color={tw.color(clr)} size={80} />
                <Text className={`pt-1 text-${clr} font-poppinsBold`}>{sts}</Text>
            </View>
            
            {renderFooter(sts)}
            </>
         )
    }


    function renderFooter(sts) {
        const active = sts === "Absen Masuk" || sts === "Absen Pulang"
        console.log('render footer ... ', active)
        if (active) {
           return (
                <View>
                    <View className="flex-row">
                        <TouchableOpacity className="flex-1 bg-dark p-4 items-center justify-center flex-row" onPress={()=>toQrScan(sts)}>
                            <Icon name="qrcode-scan" color={'white'} size={22} />
                            <Text className="font-poppins text-white ml-2">Scan Qr</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-primary p-4 items-center justify-center flex-row" onPress={()=>console.log('ok')}>
                            <Icon name="camera" color={'white'} size={22} />
                            <Text className="font-poppins text-white ml-2">Scan Wajah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) 
        } else {
            return (
                <View className="p-4 bg-white">
                    <Text className="font-poppinsBold text-xs mb-2">🏷️  Informasi</Text>
                    <Text className="font-poppins text-xs">
                        Tombol Scan Akan Aktif jika sudah masuk interval antara waktu masuk dan pulang ... serta tambahan toleransi waktu pulang selama 
                        <Text className="font-poppinsBold"> 2 Jam </Text>
                    </Text>
                    <Text className="font-poppinsItalic text-xs">
                        Jika Halaman ini Tidak cocok
                    </Text>
                </View>
            )
        }
        
    }
    
    
    
    React.useEffect(() => {
        setDate(dayjs().locale("id"))
        console.log('useEffect', currentJadwal)
    },[navigation])

  return (
      <View className="flex-1 bg-gray-light">
          <AppAlert visible={info} status="Success" msg="Harap Anda Menutup Halaman ini untuk memperbaharui data Absen dan Jadwal Anda" onOk={()=> setInfo(false)} />
        <AppLoader visible={isWait} />
          {/* Header */}
          {renderHeader()}

          {/* content */}
          {renderContent()}

          {/* footer */}
          {/* {renderFooter()} */}
    </View>
  )
}

export default ScreenAbsenV4


