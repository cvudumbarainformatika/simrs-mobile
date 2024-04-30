import { Text, TouchableOpacity, View } from "react-native"
import { tw } from "../../../../constants";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRef } from "react";
import { useState } from "react";


const CategoryButton = (props)=> {
  const itemRef = useRef([])
  const scrollViewRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)

  // J00223

  const handleSelectCategory = (index)=> {
    const selected = itemRef.current[index]
    setActiveIndex(index)
    // console.log('selected',selected)

    // selected?.measure((x)=> {
    //   scrollViewRef.current?.scrollTo({x:x, y:0, animated:true})
    //   // console.log('measure',scrollViewRef)
    // })

    props.onCategoryChanged(props.poli[index].kodepoli)
  }





  return (
    <View className="px-4 w-full">
      {/* <Text className="font-poppinsBold my-1" style={tw`text-gray-dark`}>Kategori Pelayanan 📇</Text> */}
      <ScrollView horizontal ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap:15,
          paddingVertical:10,
          marginTop:5
        }}>
        {props.poli.map((item, index)=> (
          <TouchableOpacity 
            key={index}
            ref={(el) => itemRef.current[index] = el}
            onPress={()=> handleSelectCategory(index)} 
            className="flex-row items-center rounded-md px-4 py-2"
            style={tw`${activeIndex=== index? 'bg-dark': 'bg-white'}`}
          >
            {/* <Icon name={item.icon} size={20} color={activeIndex=== index? 'white': 'black'} /> */}
            <Text className="ml-2 " style={tw`${activeIndex=== index? 'text-white': 'text-dark'}`}>{item.nama}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoryButton;