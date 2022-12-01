
import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import tw from '../../constants/tw'

const AppInput = ({
    label,
    icon,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hidePassword, setHidePassword] = React.useState(password)
  return (
    <View className="my-1">
      <View className="flex flex-row items-center space-x-2 bg-gray-light p-2 rounded-md border"
        style={tw`${error ? `border-negative` : isFocused ? `border-secondary` : `border-gray`}`}
      >
        <Icon
          name={icon}
          size={21}
          color={tw.color('gray')}
        />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true)
          }}

          onBlur={() => {
            setIsFocused(false)
          }}
          onChangeText ={props.changed}
          className="flex-1"
          style={{fontFamily:"Poppins-Regular"}}
          {...props}
        />
        {password && (
          <Icon
            onPress={()=> setHidePassword(!hidePassword)}
            name={ hidePassword? "eye-outline": "eye-off-outline"}
            size={18} color={tw.color('gray')}
          />
        )}
      </View>
      {error && (
        <Text style={tw`text-xs text-negative`}>{ error }</Text>
      )}
    </View>
  )
}

export default AppInput