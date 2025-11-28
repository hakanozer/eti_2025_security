import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StackActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiClient from '../../services/apiConfig'
import { userMe } from '../../services/userService'

const Splash = () => {

  const navigation = useNavigation()  

  useEffect(() => {
    control()
  }, [])

  const control = async () => {
    const token = await AsyncStorage.getItem('token')
    const timer = setTimeout(() => {
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        userMe().then(res => {
          navigation.dispatch(StackActions.replace('MainTab'))
        }).catch(err => {
          AsyncStorage.clear().then(() => {
            navigation.dispatch(StackActions.replace('UserLoginStack'))
          })
        })
      }else {
          navigation.dispatch(StackActions.replace('UserLoginStack'))
      }
    }, 2000);
    return () => clearTimeout(timer)
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image style={styles.logoImg} source={require('../../assets/splash_logo.png')} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#ffffff' 
    },
    logoImg: {
        width: 125,
        height: 125,
        resizeMode: 'contain',
    }
})