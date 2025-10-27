import { View, Text } from 'react-native'
import React from 'react'
import SafeScreen from '@/assets/components/SafeScreen';
import { styles } from "../../assets/styles/settings.styles";


const termsOfUse = () => {  
  return (

    <SafeScreen>
    <View style={styles.container}>
      <Text style={styles.title}>termsOfUse Settings Will go Here</Text>
    </View>
    </SafeScreen>
  )
}

export default termsOfUse