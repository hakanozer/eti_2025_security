import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { btnTxt, btnView, safeArea, txtInput } from '../../utils/styleConst';
import { StackActions, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { userLogin } from '../../services/userService';
import apiClient from '../../services/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

  const navigation = useNavigation()
  
  const [email, setEmail] = useState('hakanozer02@gmail.com')
  const [password, setPassword] = useState('123456')

  const fncLogin = () => {
  

    if (email == '') {
      Toast.show({
        type:'error',
        text1: 'Email Empty!'
      })
    }else if (password == '') {
      Toast.show({
        type:'error',
        text1: 'Password Empty!'
      })
    }else {
      userLogin(email, password).then(res => {
        // işlem başarılı oldu
        const dt = res.data
        // global add header jwt
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${dt.data.access_token}`;
        AsyncStorage.setItem("token", dt.data.access_token)
        AsyncStorage.setItem("name", dt.data.user.name)
        // bu stack yapısını bellekten kaldır
        navigation.dispatch(StackActions.replace('MainTab'))
      }).catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Incorrect email or password'
        })
      })
    }
  }

  const userRegister = () => {
    navigation.dispatch(StackActions.push('Register'))
  }

  return (
    <SafeAreaView style={safeArea}>
        <Text style={styles.txtTitle}>User Login</Text>
        <TextInput defaultValue={email} onChangeText={(txt) => setEmail(txt)} autoComplete='email' autoCapitalize='none' keyboardType='email-address' placeholder='E-Mail' style={txtInput} />
        <TextInput defaultValue={password} onChangeText={(txt) => setPassword(txt)} autoComplete='password' secureTextEntry autoCapitalize='none' placeholder='Password' style={txtInput} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={fncLogin}>
                <View style={btnView}>
                    <Text style={btnTxt}>Login</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={userRegister}>
                <View style={btnView}>
                    <Text style={btnTxt}>Register</Text>
                </View>
            </TouchableOpacity>         
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    txtTitle: {
        fontSize: 22,
        textAlign: 'center',
    }
})