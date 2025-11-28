import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { IProduct } from '../models/IAllProducts'
import { StackActions, useNavigation } from '@react-navigation/native'

const ProductItem = (props: {item: IProduct}) => {
  
  const navigation = useNavigation()
    
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(StackActions.push('ProductDetail', {item: props.item} ))} key={props.item.id}>
    <View style={styles.container}>
      <Image source={{uri: props.item.images[0]}} style={styles.image}  />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{props.item.title}</Text>
        <Text style={styles.category}>{props.item.category}</Text>
        <Text style={styles.price}>{props.item.price}₺</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        borderColor: '#818181ff',
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        marginRight: 100,
    },
    category: {
        fontSize: 17,
        color: '#8c8c8cff'
    },
    price: {
        position: 'absolute',
        bottom: 0,
        fontSize: 17,
        color: '#db820eff'
    }
})