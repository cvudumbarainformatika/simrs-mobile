import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { IMGS, ROUTES, tw } from '../../../../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import AvatarPasien from './AvatarPasien'


const ListingComp = (props) => {

  const itemRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelectItem = (item)=> {
    // const selected = itemRef.current[index]
    // setActiveIndex(index)
    // console.log('selected',selected)

    // selected?.measure((x)=> {
    //   scrollViewRef.current?.scrollTo({x:x, y:0, animated:true})
    //   // console.log('measure',scrollViewRef)
    // })

    props.onClickedItem(item)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-200 flex-1">
      {props.pasien?.map((item, i) => {
        return (
          <TouchableOpacity 
            key={i} 
            ref={(el) => itemRef.current[i] = el}
            onPress={()=> handleSelectItem(item)}
            className="px-2 py-3 bg-gray-100" 
            style={{marginBottom:1}}
          >
            <View className="flex-row">
              <View className="mr-2">
                <AvatarPasien pasien={item} />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <View className="flex-1">
                    <Text className="font-poppinsBold" style={{fontSize:11}}>{item?.nama}</Text>
                    <View className="flex-row">
                      <Text className="font-poppins text-xs text-gray-dark">Noreg : 
                        <Text> {item?.noreg}</Text>
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="font-poppins text-xs text-gray-dark">
                        {dayjs(item?.rs3).locale('id').format('dddd , DD MMMM YYYY') }
                      </Text>
                    </View>
                  </View>

                    <View>
                        <Icon name="checkmark-done-circle" 
                          color={tw.color(`${item.status==='1'? 'green-600': 'gray-500'}`)} 
                          size={28} 
                        />
                    </View>
                </View>
                {/* <View>
                  <TouchableOpacity>
                    
                  </TouchableOpacity>
                </View> */}
                  
                </View>
              </View>
          </TouchableOpacity>
          
        )
      })}
      
      <View style={{ paddingBottom: 100 }} />
    </ScrollView>
  )
}

export default ListingComp