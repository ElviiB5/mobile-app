import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { getProducts } from '../../database/actions/ProductActions';
import StockTable from './StockTable';

const StockList = (props) => {
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
                        fontWeight: '600'}}>Stock</Text>

            <StockTable content={products} navigation={props.navigation} type="products"/>
        </ScrollView>
    )
}

export default StockList;