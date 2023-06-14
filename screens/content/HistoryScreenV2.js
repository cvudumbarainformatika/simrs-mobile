import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { AppBtn, AppBtnIcon, AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync, setDate, setNextMonth, setPrevMonth } from '../../redux/features/jadwal/rekapjadwalv2Reducer'
import { tw } from '../../constants'

import dayjs from 'dayjs'
import 'dayjs/locale/id'


function HistoryScreenV2({ navigation }) {

    const dispatch = useDispatch()
    const { rekaps, hadir, waiting, currentmonth, date, days, details,
        CUTI, IJIN, SAKIT, DL, DISPEN, A
    } = useSelector(state => state.rekapv2)
    console.log('rekap', details)
    // const [date, setDate] = useState(dayjs().month(currentmonth).locale('id'))

    useEffect(() => {
        // console.log('curr', currentmonth)
        const subscribe = navigation.addListener("focus", () => {
            dispatch(setDate())
        })

        return () => {
            subscribe
        }

    }, [navigation])

    useEffect(() => {
        dispatch(getRekapAsync(date.format("MM")))
    }, [date]); // Only re-run the effect if date changes

    function formatter(tgl) {
        return dayjs(tgl).locale("id").format("HH:mm")
    }

    function nextKlik() {
        dispatch(setNextMonth())
    }

    function prevClick() {
        dispatch(setPrevMonth())
    }

    const viewHistory = () => {
        return (
            <ScrollView className="">
                {details.map((item, i) => {
                    // console.log('r', )
                    return (
                        <View key={i} className="bg-white px-4 py-2 mb-1">
                            <View className="flex-row items-center">
                                <View className="flex-1 flex-row">
                                    <Text className="font-poppinsThin text-primary text-2xl w-8">{item.tgl}</Text>
                                    <Text className="font-poppins text-primary ml-1">{item.hari}</Text>
                                </View>
                                <View className="">
                                    {item.status === 'MSK' && (
                                        <>
                                            <Text className="font-poppins text-xs text-right">AM : {item.masuk}</Text>
                                            <Text className="font-poppins text-xs text-right">AP : {item.pulang ? item.pulang : 'TAP'}</Text>
                                        </>

                                    )}
                                    {item.status === 'CB' && (
                                        <>
                                            <Text className="font-poppins text-xs text-right text-primary">CB</Text>
                                        </>
                                    )}
                                    {item.status === 'A' && (
                                        <>
                                            {/* <View style={tw`bg-negative items-center justify-center rounded-2 ml-2 w-14 p-2`}>
                                                <Text style={{ fontSize: 9, color: 'white' }}>A</Text>
                                            </View> */}
                                            <Text className="font-poppins text-xs text-right text-negative">A</Text>
                                        </>

                                    )}
                                    {item.status === 'LB/BLM' && (
                                        <>
                                            <Text className="font-poppins text-xs text-right text-primary">LB/BL</Text>
                                        </>

                                    )}
                                    {item.status === 'IJIN' && (
                                        <>
                                            <Text className="font-poppins text-xs text-right text-secondary">{item.ijin}</Text>
                                        </>

                                    )}
                                </View>
                            </View>
                        </View>
                    )
                })}
                <View>
                    <Text>{SAKIT}</Text>
                </View>
                <View style={{ paddingBottom: 300 }} />
            </ScrollView>
        )
    }

    const emptyHistory = () => {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Icon name="filetext1" color={tw.color('gray')} size={60} />
                <Text className="font-poppins text-gray  text-xs mt-5">History Absensi Bulan {date.format("MMMM")} Belum Ada</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-gray-light">
            <HeaderUser />
            <AppLoader visible={waiting} />
            <View className="flex-row items-center px-4 py-3 bg-white mb-2">
                <View className="flex-1">
                    <Text className="font-poppins ">History Absensi Bulan {date.format("MMMM")}</Text>
                    <Text className="font-poppins text-xs text-gray">Waktu Absensi Menggunakan Waktu Server</Text>
                </View>
                <View className="">
                    <View className="flex-row items-center">
                        <AppBtnIcon icon="chevron-left" color="primary" colorIcon="white" rounded clicked={() => prevClick()} />
                        <View className="ml-1">
                            <AppBtnIcon icon="chevron-right" color="dark" colorIcon="white" rounded clicked={() => nextKlik()} />
                        </View>
                    </View>
                </View>
            </View>

            {details.length > 0 ? viewHistory() : emptyHistory()}
        </View>
    )
}

export default HistoryScreenV2