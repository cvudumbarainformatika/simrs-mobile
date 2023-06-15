import { View, Text, Image, ScrollView, BackHandler, ImageBackground, Pressable, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import { tw } from '../../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AllMenu = (props) => {

    const menus = [
        {
            id: 1,
            name: 'e-Xenter',
            image: '',
            icon: 'flashlight',
            color: 'primary'
        },
        {
            id: 2,
            name: 'Siteman',
            image: '',
            icon: 'add-user',
            color: 'negative'
        },
        {
            id: 3,
            name: 'e-Nadi',
            image: '',
            icon: 'flattr',
            color: 'secondary'
        },
        {
            id: 4,
            name: 'e-Resep',
            image: '',
            icon: 'creative-cloud',
            color: 'positive'
        },
        {
            id: 5,
            name: 'e-Telem',
            image: '',
            icon: 'lab-flask',
            color: 'warning'
        },
    ]

    return (
        // <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {menus.map((item, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={props.clicked}>
                        <View className="bg-white m-2 py-2 w-20 rounded-lg justify-center items-center" >
                            <Icon name={item.icon} size={38} color={tw.color(item.color)} />
                            <Text className="font-poppins text-xs mt-1">{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
        // </View>

    )
}

export default AllMenu