import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { safeArea } from '../../utils/styleConst'
import { useIsFocused } from '@react-navigation/native'
import { allProducts } from '../../services/productService'
import { IProduct } from '../../models/IAllProducts'
import ProductItem from '../../components/ProductItem'

const Product = () => {

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [isLoad, setIsLoad] = useState(false)
  const [proArr, setProArr] = useState<IProduct[]>([])
  useEffect(() => {
    allProducts(page).then(res => {
      const dt = res.data
      setTotalPage(dt.meta.pagination.total_pages)
      const newArr = [...proArr, ...dt.data]
      setProArr(newArr)
      if (totalPage == page) {
        setIsLoad(true)
      }
    })
  }, [page])


  return (
    <View style={safeArea}>
      <FlatList 
        data={proArr}
        renderItem={ ({item, index}) =>
          <ProductItem item={item} key={item.id} />
        }
        onEndReached={() => totalPage > page ? setPage(page + 1) : true}
        ListFooterComponent={
          <View style={{marginTop: 10, marginBottom: 10,}}>
            {isLoad === true && 
              <Text style={{textAlign: 'center', color: '#818181ff' }}>Tamamlandı...</Text>
            }
          </View>
        }
      />
    </View>
  )
}

export default Product

const styles = StyleSheet.create({})