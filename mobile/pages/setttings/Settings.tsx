import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { safeArea } from '../../utils/styleConst'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import { userLogout, userMe } from '../../services/userService'
import Toast from 'react-native-toast-message'
import { IUserMe } from '../../models/IUser'
import { Hoshi } from 'react-native-textinput-effects';

const Settings = () => {

  const navigation = useNavigation()
  const [user, setUser] = useState<IUserMe>()

  useEffect(() => {
    userMe().then(res => {
      const dt = res.data
      setUser(dt)
    })
  }, [])

  const fncUserLogout = () => {
    Alert.alert("Are you sure?", 'Exit app', [
      {
        text: 'Cancel',
        isPreferred: true,
      },
      {
        text: 'Yes',
        onPress: () => {
          logout()
        },
        style: 'destructive'
      }
    ])
  }

  const logout = () => {
    AsyncStorage.clear().then(() => {
      userLogout().then(() => {
        navigation.dispatch(StackActions.replace('UserLoginStack'))
      }).catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Fail, Try Again!'
        })
      })
    })
  }
  
  return (
    <View style={safeArea}>
      <ScrollView 
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps='handled'
      automaticallyAdjustKeyboardInsets
      >
        {user &&
          <>
            <Hoshi
              label={'Name'}
              borderColor={'#b1b1b1ff'}
              borderHeight={1}
              inputPadding={16}
              backgroundColor={'#ffffffff'}
              autoComplete='name'
              defaultValue={user.data.name}
            />
            <Hoshi
              label={'E-Mail'}
              borderColor={'#b1b1b1ff'}
              borderHeight={1}
              inputPadding={16}
              backgroundColor={'#ffffffff'}
              autoComplete='email'
              keyboardType='email-address'
              defaultValue={user.data.email}
            />
            <Hoshi
              label={'Role'}
              borderColor={'#b1b1b1ff'}
              borderHeight={1}
              inputPadding={16}
              backgroundColor={'#ffffffff'}
              value={user.data.role}
              editable={false}
            />
          <TouchableOpacity>
            <View style={[styles.btnView, {backgroundColor: '#005c3fff', marginTop: 10,}]}>
              <Text style={styles.btnTxt}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(StackActions.push('Maps')) }>
            <View style={[styles.btnView, {backgroundColor: '#cb4604ff'}]}>
              <Text style={styles.btnTxt}>Goto Map</Text>
            </View>
          </TouchableOpacity>
          </>
        }
      </ScrollView>
      <TouchableOpacity onPress={fncUserLogout}>
        <View style={styles.btnView}>
          <Text style={styles.btnTxt}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  btnView: {
    backgroundColor: '#787878ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 17,
    color: '#ffffff'
  }
})