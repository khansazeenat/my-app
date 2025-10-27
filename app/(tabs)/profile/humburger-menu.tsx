import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'expo-router'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  PanResponder,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import { styles } from '../../../assets/styles/settings.styles'
import { COLORS} from '@/constants/colors'

type MenuModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function MenuModal({ visible, onClose }: MenuModalProps) {
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current; // For dragging

  // Animate open/close
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: visible ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  //routing functionality 
    const router = useRouter();
  

  // Interpolate translateY from slideAnim
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  // Combine slide animation and drag
  const combinedTranslateY = Animated.add(translateY, pan);

  // PanResponder for drag-to-close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
          pan.setValue(0);
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: combinedTranslateY }] }]}
        {...panResponder.panHandlers} // Attach drag gesture
      >
        {/* Drag line */}
        <View style={styles.dragLine} />

        {/* Menu content */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}
          onPress={() => {onClose();router.push('/profile/edit-business')}}>
            <MaterialCommunityIcons name="pencil-outline" size={20} color={COLORS.primary} />
            <Text style={styles.menuText}>Edit Business</Text>
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity style={styles.menuItem}
          onPress={() =>{onClose(); router.push('/settings')}}>          
            <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
            <Text style={styles.menuText}>More Settings</Text>
          </TouchableOpacity>

          <View style={styles.menuSeparator} />
          
          {/* Log out */}
          <TouchableOpacity style={styles.menuItem} onPress={() => router.replace('/auth/sign-in')}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
            <Text style={styles.menuText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}
