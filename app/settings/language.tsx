import { View, Text } from 'react-native'
import React from 'react'
import SafeScreen from '@/assets/components/SafeScreen';
import { styles } from "../../assets/styles/settings.styles";

const language = () => {
    
  return (
    <SafeScreen>
    <View style={styles.container}>
      <Text style={styles.title}>The language Settings Will go Here</Text>
    </View>
    </SafeScreen>
  )
}

export default language