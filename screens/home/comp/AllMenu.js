import { View, Text, Image, ScrollView, BackHandler, ImageBackground, Pressable, FlatList } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Entypo'

import { tw } from '../../../constants'

const AllMenu = (props) => {

    const menus = [
        {
            id: 1,
            name: 'e-Simrs',
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


    const Item = ({ name, icon, clr }) => (
        <View className="bg-white m-2 rounded-lg">
            <View className="p-1 flex-1 justify-center items-center w-24">
                <Icon name={icon} size={32} className="px-1 py-3" color={tw.color(clr)} />
                <Text >{name}</Text>
            </View>
        </View>
    );

    return (
        <>
            <View>
                <FlatList
                    data={menus}
                    horizontal
                    renderItem={({ item }) => <Item name={item.name} icon={item.icon} clr={item.color} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </>

    )
}

export default AllMenu