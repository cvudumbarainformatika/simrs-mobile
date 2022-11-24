import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { HeaderUser } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getRekapAsync } from '../../redux/features/jadwal/rekapJadwalReducer'
import {getMonth} from '../history/utils'
import CalendarHeader from '../history/components/CalendarHeader'
import Month from '../history/components/Month'
import { GlobalContext } from '../../context/GlobalContext'




const HistoryScreen = () => {

  const dispatch = useDispatch()
  const { rekaps } = useSelector(state => state.rekap)
  
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  // const [date, setDate] = useState(dayjs().locale('id'))

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    
  },[monthIndex])

  return (
    <View>
      <HeaderUser />
    </View>
  )
}

export default HistoryScreen