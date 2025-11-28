import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';


// Splash
import Splash from './splash/Splash';

// Users
import Login from './users/Login'
import Register from './users/Register'

// Products
import Product from './products/Product';
import ProductDetail from './products/ProductDetail';

// Likes
import Likes from './likes/Likes';

// Settings
import Settings from './setttings/Settings';
import Maps from './setttings/Maps';


const MainStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// User Stack Navigator
const UserLoginStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <MainStack.Screen name="Register" component={Register} options={{ headerShown: true }} />
  </MainStack.Navigator>
)

// Product Stack Navigator
const ProductStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Product" component={Product} options={{ headerShown: true }} />
    <MainStack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: true, title: 'Product Detail' }} />
  </MainStack.Navigator>
)

// Likes Stack Navigator
const LikesStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Likes" component={Likes} options={{ headerShown: true }} />
    <MainStack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: true, title: 'Product Detail' }} />
  </MainStack.Navigator>
)

// Settings Stack Navigator
const SettingsStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
    <MainStack.Screen name="Maps" component={Maps} options={{ headerShown: true }} />
  </MainStack.Navigator>
)


const MainTab = () => (
  <Tab.Navigator screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: {height: 90, paddingBottom: 0,},
    tabBarLabelStyle: {fontSize: 15},
    }}>
    <Tab.Screen
      options={{
        title: 'Products',
        headerShown: false,
        tabBarLabel: 'Products',
        tabBarIcon: ({color, size}) => (
          <SimpleLineIcons name="basket" size={30} color={color} />
        )
      }}
      name='ProductStack'
      component={ProductStack}
    />
    <Tab.Screen
      options={{
        title: 'Likes',
        headerShown: false,
        tabBarLabel: 'Likes',
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="heart-o" size={30} color={color} />
        )
      }}
      name='LikesStack'
      component={LikesStack}
    />
    <Tab.Screen
      options={{
        title: 'Settings',
        headerShown: false,
        tabBarLabel: 'Settings',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="settings-outline" size={30} color={color} />
        )
      }}
      name='SettingsStack'
      component={SettingsStack}
    />
  </Tab.Navigator>
)

const Routes = () => {

  const initializeDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('proDB');
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS likes (lid INTEGER PRIMARY KEY NOT NULL, pid INTEGER);
    `);
  }

  useEffect(() => {
    initializeDatabase()
  }, [])

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <MainStack.Screen name="UserLoginStack" component={UserLoginStack} options={{ headerShown: false }}/>
        <MainStack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>
      </MainStack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})
