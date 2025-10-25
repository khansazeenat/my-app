import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import {styles} from '../../assets/styles/settings.styles'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import { spacing, COLORS } from "../../constants/colors";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import SafeScreen from '@/assets/components/SafeScreen';


const Settings = () => {
  const router = useRouter();
  
  return (
    <SafeScreen
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.backText}>Settings</Text>
      </View>

      {/*   Content  */}
      <View style={styles.menuTextbg}>

        <TouchableOpacity style={styles.menuItem} 
        onPress={() => router.push('/settings/subscripion')}>
          <MaterialIcons name="attach-money" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Subscription</Text>          
        </TouchableOpacity>
        
          <View style={styles.menuSeparator}/>

        <TouchableOpacity style={styles.menuItem} 
        onPress={() => router.push('/settings/language')}>
          <Ionicons name="language-outline" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Language</Text>          
        </TouchableOpacity>
        
          <View style={styles.menuSeparator}/>

        <TouchableOpacity style={styles.menuItem} 
        onPress={() => router.push('/settings/privacy-policy')}>
          <MaterialIcons name="lock-outline" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Privacy Policy</Text>          
        </TouchableOpacity>
        
          <View style={styles.menuSeparator}/>

        <TouchableOpacity style={styles.menuItem} 
        onPress={() => router.push('/settings/terms-of-use')}>
          <Ionicons name="folder-outline" size={20} color={COLORS.primary} />
          <Text style={styles.menuText}>Terms Of Use</Text>          
        </TouchableOpacity>



      </View>
      
    </View>
    </SafeScreen>
  )
}

export default Settings