import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { getRunningOutProducts } from '../../database/actions/ProductActions'
import Lottie from 'lottie-react-native';

const Item = ({name, stock}) => (
    <View style={stock <= 5 ? styles.worry : styles.normal}>
      <Text style={styles.title}>Producto: {name}</Text>
      <Text style={styles.title}>Stock: {stock}</Text>
    </View>
);

const Alerts = () => {
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        getRunningOutProducts(setProducts)
        console.log(products.length)
    }, [])

    return (
        <View>
            <Text style={{
              color: '#9652B6',
              fontSize: 40,
              fontWeight: '600',
              marginBottom: 10}}>¡Alertas!</Text>
            {products.length > 0 ? 
              <FlatList
                  data={products}
                  renderItem={({item}) => <Item name={item.name} stock={item.stock} />}
                  keyExtractor={item => item.id}
              /> 
              : 
              <View style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center'}}>
                <Text style={{
                    fontSize: 40,
                    fontWeight: '600'}}>No hay alertas para mostrar :)</Text>
                <Lottie 
                  source={require('../../assets/111463-cat-ye-purple.json')} 
                  style={{ width: 200}}
                  autoPlay 
                  loop />
              </View> 
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    normal: {
      flex: 1,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: "#F9F5C2",
      margin: 10,
      borderWidth: 1,
      borderColor: '#F9F5C2',
      shadowColor: "#000",
      shadowOffset:{
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    worry: {
      flex: 1,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: "#F9C2C2",
      margin: 10,
      borderWidth: 1,
      borderColor: '#F9C2C2',
      shadowColor: "#000",
      shadowOffset:{
      width: 0,
      height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      color: 'white'
    },
    title: {
      fontSize: 20,
    },
});

export default Alerts