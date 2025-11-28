import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { safeArea } from '../../utils/styleConst'
import { useIsFocused } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite';
import { singleProduct } from '../../services/productService';
import { IProduct } from '../../models/IAllProducts';
import ProductItem from '../../components/ProductItem';

const Likes = () => {

  const [proArr, setProArr] = useState<IProduct[]>([])
  const isFocused = useIsFocused()
  useEffect(() => {
    allLikes()
  }, [isFocused])

  const allLikes = async () => {
    const db = await SQLite.openDatabaseAsync('proDB');
    const allRows = await db.getAllAsync('select * from likes');
    const newArr: IProduct[] = [] 
    for (const row of allRows) {
      const item = row as {lid: number, pid: number}
      const res = await singleProduct(item.pid)
      newArr.push(res.data.data)
    }
    setProArr(newArr)
  }
  
  return (
    <View style={safeArea}>
      <FlatList 
        data={proArr}
        renderItem={ ({item, index}) =>
          <ProductItem item={item} key={item.id} />
        }
      />
    </View>
  )
}

export default Likes

const styles = StyleSheet.create({})