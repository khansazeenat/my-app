import { View, Text } from 'react-native'
import React from 'react'
import {styles} from '../../assets/styles/settings.styles'
import SafeScreen from '@/assets/components/SafeScreen';


const privacyPolicy = () => {
  return (
    <SafeScreen>
    <View style={styles.container}>
      <Text style={styles.title}>privacyPolicy Settings Will go Here</Text>
    </View>
    </SafeScreen>
  )
}

export default privacyPolicy