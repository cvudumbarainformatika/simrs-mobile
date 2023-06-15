import { View, Text, ScrollView, Keyboard } from 'react-native'
import React from 'react'
import { ROUTES, tw } from '../../constants'
import { AppAlert, AppBtn, AppInput, AppLoader } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { api } from '../../helpers/axiosInterceptor'

const SettingsDetailScreen = ({ navigation }) => {

  const [waiting, setWaiting] = useState(false)
  const [inputs, setInputs] = useState({ password: '' })
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(null);
  const [scs, setScs] = useState(null);

  function handleOnChanged(text, input) {
    setInputs(states => ({ ...states, [input]: text }))
  }

  function handleError(msg, input) {
    setErrors(states => ({ ...states, [input]: msg }))
  }

  function validate() {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.password) {
      handleError('Harap diisi terlebih dahulu', 'password')
      valid = false
    }

    if (valid) {
      savePassword(inputs.password)
    }
  }

  const savePassword = async (pass) => {
    setWaiting(true)
    let form = {
      password: pass
    }
    await api.post(`/v2/user/new-password`, form)
      .then(resp => {
        setWaiting(false)
        setScs("Password telah berhasil diubah")
        handleOnChanged("", 'password')
      }).catch(err => {
        setWaiting(false)
        setErr('Maaf, Ada Kesalahan silahkan diulangi')
      })
  }

  return (
    <>
      <AppLoader visible={waiting} />
      <AppAlert visible={err !== null} msg={err} onOk={() => setErr(null)} />
      <AppAlert visible={scs !== null} status="Success" msg={scs} onOk={() => setScs(null)} />
      <ScrollView>
        <SafeAreaView className="flex-1">
          <View className="flex-row items-center m-4">
            <AppBtn icon="chevron-left" color="dark" round clicked={() => navigation.navigate(ROUTES.SETTINGS_TAB)} />
            <Text className="ml-2 font-poppins">Back to Profile</Text>
          </View>
          <View className="m-4">
            <Text className="font-poppinsBold">Form Ganti Password</Text>
            <AppInput label="password Baru" placeholder="Ketikkan Password Baru"
              changed={(val) => handleOnChanged(val, 'password')}
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password')
              }}
            />
            <View className="flex-row justify-end mt-4">
              <AppBtn label="Simpan Password" clicked={() => validate()} />
            </View>
          </View>
        </SafeAreaView>

      </ScrollView>
    </>
  )
}

export default SettingsDetailScreen