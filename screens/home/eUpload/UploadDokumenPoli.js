import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { ROUTES, tw } from '../../../constants';
import { AppBtn } from '../../../components';

const UploadDokumenPoli = ({ navigation }) => {
  return (
    <View style={tw`flex-1`}>
      <Text>My Component</Text>

      <View className="flex-row items-center m-4">
            <AppBtn icon="chevron-left" color="dark" round clicked={() => navigation.navigate(ROUTES.HOME)} />
            <Text className="ml-2 font-poppins">Back to Profile</Text>
          </View>
    </View>
  );
};

export default UploadDokumenPoli;