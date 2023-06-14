import { View, Text, Image, ScrollView, BackHandler, ImageBackground, Pressable, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

import { tw } from '../../../constants'

const AllMenu = (props) => {

    const menus = [
        {
            id: 1,
            name: 'e-Simrs',
            image: '',
            icon: ''
        },
        {
            id: 2,
            name: 'Siteman',
            image: '',
            icon: ''
        },
        {
            id: 3,
            name: 'Nadi',
            image: '',
            icon: ''
        },
        {
            id: 4,
            name: 'e-Resep',
            image: '',
            icon: ''
        },
        {
            id: 5,
            name: 'e-Pasien',
            image: '',
            icon: ''
        },
    ]


    const Item = ({ name }) => (
        <View className="w-24 bg-white p-2">
            <Text >{name}</Text>
        </View>
    );

    return (
        <>
            <View>
                <FlatList
                    data={menus}
                    horizontal
                    renderItem={({ item }) => <Item name={item.name} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </>

    )
}

export default AllMenu