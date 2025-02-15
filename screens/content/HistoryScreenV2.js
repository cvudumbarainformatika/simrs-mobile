import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { AppBtn, AppBtnIcon, AppLoader, HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync, setDate, setNextMonth, setPrevMonth } from '../../redux/features/jadwal/rekapjadwalv2Reducer'
import { tw } from '../../constants'

import dayjs from 'dayjs'
import 'dayjs/locale/id'


function HistoryScreenV2({ navigation }) {



    const [isModal, setIsModal] = useState(false)
    const [data, setData] = useState(null)

    const dispatch = useDispatch()
    const { rekaps, hadir, waiting, currentmonth, date, days, details,
        CUTI, IJIN, SAKIT, DL, DISPEN, A, TERLAMBAT, HADIR
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
                    if (item.status !== false) {
                        return (
                            <TouchableOpacity 
                                key={i} className="bg-white px-4 py-2 mb-1"
                                onPress={() => {
                                        console.log('item', item);
                                        
                                        setIsModal(true)
                                        setData(item)
                                    }
                                }
                            >
                                <View className="flex-row items-center">
                                    <View className="flex-1 flex-row">
                                        <Text className="font-poppinsThin text-primary text-2xl w-8">{item.tgl}</Text>
                                        <Text className="font-poppins text-primary ml-1">{item.hari}</Text>
                                    </View>
                                    <View className="">
                                        {/* <Text>{item.terlambat}</Text> */}
                                        {item.status === 'MSK' && (
                                            <>
                                                {/* <Text>{item.terlambat}</Text> */}
                                                <Text 
                                                    style={tw`font-poppins text-xs text-right ${item.masuk ? '' : 'text-negative'}`}>AM : {item.masuk || 'TAM'}</Text>
                                                <Text
                                                    style={tw`font-poppins text-xs text-right ${item.pulang ? '' : 'text-negative'}`}>AP : {item.pulang ? item.pulang : 'TAP'}
                                                </Text>
                                            </>

                                        )}
                                        {item.status === 'CB' && (
                                            <>
                                                <Text className="font-poppinsBold text-lg text-right text-primary">CB</Text>
                                            </>
                                        )}
                                        {item.status === 'A' && (
                                            <>
                                                {/* <View style={tw`bg-negative items-center justify-center rounded-2 ml-2 w-14 p-2`}>
                                                <Text style={{ fontSize: 9, color: 'white' }}>A</Text>
                                            </View> */}
                                                <Text className="font-poppinsBold text-lg text-right text-negative">A</Text>
                                            </>

                                        )}
                                        {item.status === 'LIBUR' && (
                                            <>
                                                <Text className="font-poppins text-xs text-right text-negative">LIBUR</Text>
                                            </>

                                        )}
                                        {item.status === 'IJIN' && (
                                            <>
                                                <Text className="font-poppinsBold text-lg text-right text-secondary">{item.ijin}</Text>
                                            </>

                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                })}
                {cardRekap()}
                <View style={{ paddingBottom: 300 }} />
            </ScrollView>
        )
    }

    const cardRekap = () => {
        return (
            <View className="p-3">
                <Text className="font-poppins text-xs py-2 text-gray">Rekap Absensi Bulan {date.format("MMMM")}</Text>
                <View className="bg-secondary text-white rounded-t-xl rounded-b-xl">
                    <View className=" border-gray-light border-b-2">
                        <View className="flex-row items-center p-3 ">
                            <Text className="font-poppins flex-1 ">HADIR</Text>
                            <Text className="font-poppinsBold text-lg">{HADIR}</Text>
                        </View>
                    </View>
                    <View className=" border-gray-light border-b-2">
                        <View className="flex-row items-center p-3 ">
                            <Text className="font-poppins flex-1 ">SAKIT</Text>
                            <Text className="font-poppinsBold text-lg">{SAKIT}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light border-b-2">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1">IJIN</Text>
                            <Text className="font-poppinsBold text-lg">{IJIN}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light border-b-2">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1">CUTI</Text>
                            <Text className="font-poppinsBold text-lg">{CUTI}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light border-b-2">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1">DL (Dinas Luar)</Text>
                            <Text className="font-poppinsBold text-lg">{DL}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light border-b-2">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1">DISPEN</Text>
                            <Text className="font-poppinsBold text-lg">{DISPEN}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light border-b-2">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1">A (Alpha)</Text>
                            <Text className="font-poppinsBold text-lg">{A}</Text>
                        </View>
                    </View>
                    <View className="border-gray-light">
                        <View className="flex-row items-center p-3">
                            <Text className="font-poppins flex-1 text-negative">Rekap Terlambat</Text>
                            <Text className="font-poppinsBold text-negative">{TERLAMBAT}</Text>
                        </View>
                    </View>
                </View>
            </View>
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



    const ModalDetailAbsensi=({isModal, data})=> {
        return (
          <Modal animationType="slide" transparent={true} visible={isModal}>
            <View className="h-3/4 w-full bg-gray-100 absolute bottom-0 rounded-t-lg overflow-hidden">
              <View className="flex-1">
                  <View className="border-gray-light border-b-2">
                      <View className="flex-row items-center p-3">
                        <Text className="flex-1 font-poppinsBold text-lg p-2">Detail Absensi</Text>
                        <TouchableOpacity className="" onPress={()=>setIsModal(false)}>
                            <Icon name="close" size={30} color={'black'} />
                        </TouchableOpacity>
                      </View>
                  </View>
                  <View className="flex-1">
                    <ScrollView>
                      <View className="items-center p-3">
                        <Text className=" font-poppinsBold text-lg">Jadwal</Text>
                        <Text className=" font-poppins text-lg">{data?.hari}, Tanggal {data?.tanggal} </Text>
                      </View>
                      <View className="border-gray-light border-y-2 px-3 py-4">
                        <View className="flex-row gap-2">
                          <View className="">
                            <Text className=" font-poppins text-lg">Kategori</Text>
                            <Text className=" font-poppins text-lg">Jadwal Msk</Text>
                            <Text className=" font-poppins text-lg">Jadwal Plg</Text>
                          </View>
                          <View className="flex-1">
                            <Text className=" font-poppinsBold text-lg">: {data?.kategory?.nama}</Text>
                            <Text className=" font-poppinsBold text-lg">: {data?.kategory?.masuk}</Text>
                            <Text className=" font-poppinsBold text-lg">: {data?.kategory?.pulang}</Text>
                          </View>
                        </View>
                      </View>
                      <View className="border-gray-light  px-3 py-4">
                        {data?.status === 'MSK' && (
                            <View className="flex-row gap-2">
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppins text-lg">ABSEN MSK</Text>
                                    <Text className=" font-poppinsBold text-xl"
                                        style={tw`${data?.masuk ? '' : 'text-negative'}`}
                                    >{data?.masuk || 'TAM'}</Text>
                                </View>
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppins text-lg">ABSEN PLG</Text>
                                    <Text className=" font-poppinsBold text-xl"
                                    
                                        style={tw`${data?.pulang ? '' : 'text-negative'}`}
                                    >{data?.pulang || 'TAP'}</Text>
                                </View>
                            </View>
                        )}
                        {data?.status === 'LIBUR' && (
                            <View className="flex-row gap-2">
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppins text-lg">HARI</Text>
                                    <Text className=" font-poppinsBold text-lg">LIBUR</Text>
                                </View>
                                
                            </View>
                        )}
                        {data?.status === 'A' && (
                            <View className="flex-row gap-2">
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppinsBold text-xl text-negative">ALPHA</Text>
                                </View>
                                
                            </View>
                        )}
                        {data?.status === 'CB' && (
                            <View className="flex-row gap-2">
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppinsBold text-xl text-primary">CB</Text>
                                </View>
                                
                            </View>
                        )}
                        {data?.status === 'IJIN' && (
                            <View className="flex-row gap-2">
                                <View className="flex-1 items-center">
                                    <Text className=" font-poppinsBold text-xl text-primary">{data?.ijin}</Text>
                                </View>
                                
                            </View>
                        )}
                        
                      </View>
                      
                    </ScrollView>
                  </View>
                  {data?.status === 'MSK' && (
                      <View className="border-gray-dark border-b-2"
                            style={tw`${data?.txt ? 'bg-negative' : 'bg-primary'}`}
                        >
                            <View className="items-center p-3">
                                <Text className=" font-poppinsBold text-md p-2 text-white">{data?.txt || 'On Time'}</Text>
                            </View>
                        </View>
                  )}
                  {data?.status === 'LIBUR' && (
                      <View className="border-gray-dark border-b-2 bg-red-400"
                        >
                            <View className="items-center p-3">
                                <Text className=" font-poppinsBold text-md p-2 text-white">LIBUR</Text>
                            </View>
                        </View>
                  )}
                  {data?.status === 'IJIN' && (
                      <View className="border-gray-dark border-b-2 bg-primary"
                        >
                            <View className="items-center p-3">
                                <Text className=" font-poppinsBold text-md p-2 text-white">{data?.ijin}</Text>
                            </View>
                        </View>
                  )}
                  {data?.status === 'A' && (
                      <View className="border-gray-dark border-b-2 bg-primary"
                        >
                            <View className="items-center p-3">
                                <Text className=" font-poppinsBold text-md p-2 text-white">ALPHA</Text>
                            </View>
                        </View>
                  )}
                  {data?.status === 'CB' && (
                      <View className="border-gray-dark border-b-2 bg-primary"
                        >
                            <View className="items-center p-3">
                                <Text className=" font-poppinsBold text-md p-2 text-white">CB</Text>
                            </View>
                        </View>
                  )}
                  
              </View>
            </View>
          </Modal>
        )
      }

    return (
        <View className="flex-1 bg-gray-light">
            <ModalDetailAbsensi isModal={isModal} data={data} />
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