import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppAlert, AppLoader } from '../../../components'
import { ROUTES } from '../../../constants'
import { api } from '../../../helpers/axiosInterceptor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/routers'

const KirimQr = ({ navigation, route }) => {

    const { data } = route.params
    const [wait, setWait] = useState(false)
    const [err, setErr] = useState(null)

    const sendQr = async () => {
        setWait(true)
        let token = await AsyncStorage.getItem('userToken');
        let form = {
            qr: data,
            token: token
        }

        await api.post('/v2/user/send-qr', form)
            .then((resp) => {
                // console.log(resp)
                setWait(false)
                // setTimeout(() => {
                //     navigation.navigate(ROUTES.HOME)
                // }, 6000)
            }).catch((err) => {
                console.log(err)
                setErr('Ada Kesalahan Harap Ulangi!')
                setWait(false)
            })
    }

    useEffect(() => {
        (() => {
            sendQr()
        })()
    }, [])


    return (
        <View className="flex-1 justify-center items-center">
            <AppLoader visible={wait} />
            <AppAlert visible={!wait && err !== null} msg={err} onOk={() => {
                setErr(null)
                navigation.dispatch(StackActions.replace(ROUTES.HOME))
                // navigation.pop(3)
            }} />
            <AppAlert visible={!wait && err === null} msg="Kamu Berhasil Login" status='success' onOk={() => {
                setErr(null)
                // navigation.dispatch(StackActions(StackActions.pop(3)))
                navigation.dispatch(StackActions.replace(ROUTES.HOME))
                // navigation.pop(3)
            }} />
            {/* <Text>KirimQr</Text> */}
        </View>
    )
}

export default KirimQr