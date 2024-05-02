import { Text, TouchableOpacity, View } from "react-native"
import { tw } from "../../../../constants";
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useRef } from "react";
import { useState } from "react";


const CategoryButton = (props)=> {
  const itemRef = useRef([])
  const scrollViewRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  // const { category } = useSelector(state => state.pasien)

  // J00223

  const handleSelectCategory = (index)=> {
    // const selected = itemRef.current[index]
    setActiveIndex(index)
    // console.log('selected',selected)

    // selected?.measure((x)=> {
    //   scrollViewRef.current?.scrollTo({x:x, y:0, animated:true})
    //   // console.log('measure',scrollViewRef)
    // })

    props.onCategoryChanged(props.poli[index].kodepoli)
  }


  // console.log('coba di category button',props.ctg);





  function renderItem(item, index){
    return (
      <TouchableOpacity 
            key={index}
            onPress={()=> handleSelectCategory(index)} 
            className="flex-row items-center rounded-md px-4 py-2"
            style={tw`${activeIndex=== index? 'bg-dark': 'bg-white'}`}
          >
            {/* <Icon name={item.icon} size={20} color={activeIndex=== index? 'white': 'black'} /> */}
            <Text className="ml-2 font-poppins" style={tw`${activeIndex=== index? 'text-white': 'text-dark'}`}>{item.nama}</Text>
          </TouchableOpacity>
    )
  }


  return (
      <ScrollView horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap:10,
          paddingVertical:5,
          marginVertical:10
        }}>
        {/* {props.poli.map((item, index)=> (
          <TouchableOpacity 
            key={index}
            onPress={()=> handleSelectCategory(index)} 
            className="flex-row items-center rounded-md px-4 py-2"
            style={tw`${activeIndex=== index? 'bg-dark': 'bg-white'}`}
          >
            <Text className="ml-2 font-poppins" style={tw`${activeIndex=== index? 'text-white': 'text-dark'}`}>{item.nama}</Text>
          </TouchableOpacity>
        ))} */}
        {props.poli.map((item, index)=> {
          return renderItem(item, index)
        })}
      </ScrollView>
  )
}

export default CategoryButton;