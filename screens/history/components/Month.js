import { View, Text } from 'react-native'
import React, { Fragment } from 'react'
import Day from './Day'

const Month = ({ month }) => {

    
  return (
    <View className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </View>
  )
}

export default Month