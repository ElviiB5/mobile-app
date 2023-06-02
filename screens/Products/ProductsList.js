import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import ListTable from '../../commonComponents/ListTable';
import { getProducts } from '../../database/actions/ProductActions';
import CreateProductScreen from './CreateProductScreen';

const ProductsList = (props) => {
    const [ products, setProducts ] = useState([])

    useEffect(() => {
        async function fetchProducts() {
          await getProducts(setProducts);
        }
        fetchProducts();
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                        marginTop: 2, 
                        color:'#9652B6', 
                        fontSize: 41, 
                        fontWeight: '600'}}>Productos</Text>
            <CreateProductScreen />

            <View style={{
                marginTop: 20,
                borderBottomColor: '#F74780',
                borderBottomWidth: 2}}></View>

            <Text style={{ fontSize: 22, marginTop: 15 }}>Productos existentes</Text>

            <ListTable content={products} navigation={props.navigation} type="products"/>
        </ScrollView>
    )
}

export default ProductsList;