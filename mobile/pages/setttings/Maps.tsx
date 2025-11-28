import { StyleSheet, Text, View, Linking } from 'react-native'
import React, { useState } from 'react'
import { safeArea } from '../../utils/styleConst'
import MapView, {MarkerAnimated} from 'react-native-maps';

const Maps = () => {

  const companies = [
    {id: 1, title: "Topkapı Sarayı Müzesi", detail: 'Topkapı Sarayı Müzesi Detay', lat: 41.0115195, long: 28.980804, phone: '02125120480'},
    {id: 2, title: "Sultan Ahmet Cami", detail: 'Sultan Ahmet Cami Detay', lat: 41.0058216, long: 28.9746808, phone: '02125120480'},
    {id: 3, title: "Galataport İstanbul", detail: 'Galataport İstanbul Detay', lat: 41.0276477, long: 28.9827057, phone: '4445266'}
  ]

  const avrlatitude = companies.reduce((sum, c) => sum + c.lat, 0) / companies.length;
  const avrlongitude = companies.reduce((sum, c) => sum + c.long, 0) / companies.length;
  const zoom = 0.025
  const [lat, setLat] = useState(avrlatitude)
  const [long, setLong] = useState(avrlongitude)


  return (
    <View style={safeArea}>
        <MapView 
        style={styles.maps}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsScale={true}
        showsTraffic={true}
        region={{
            latitude:lat,
            longitude:long,
            latitudeDelta: zoom,
            longitudeDelta: zoom
        }}
        //onRegionChange={(region) => console.log(region)}
        //onRegionChangeComplete={(region) => console.log(region)}
        >
        {companies.map(item => 
            <MarkerAnimated 
                key={item.id}
                coordinate={{latitude: item.lat, longitude: item.long}}
                title={item.title}
                description={item.detail}
                onPress={() => {
                        setLat(item.lat)
                        setLong(item.long)
                        Linking.openURL('maps://app?daddr='+item.lat+','+item.long+'&travelmode=driving')
                    }
                }
            />
        )}    
        </MapView>
      
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({
    maps: {
        flex: 1,
    }
})