import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar, Button, TextInput, ToastAndroid } from 'react-native';
import { addSoldProduct, addSoldService, getSaleTotal, getSoldProducts, getSoldServices, updateTotalSale } from '../database/actions/SaleActions';
import { getProducts, updateProductStock } from '../database/actions/ProductActions';
import SaledProductsList from './SaledProductsList';
import { getServices } from '../database/actions/ServicesActions';

const GenericFlatList = (props) => {
    const [ amount, setAmount ] = useState("")
    const [ products, setProducts ] = useState([])
    const [ services, setServices ] = useState([])
    const [ total, setTotal ] = useState(0)

    let addButton
    if(props.type === "products")
        addButton = "Comenzar a agregar productos"
    else addButton = "Comenzar a agregar servicios"

    const [ soldProducts, setSoldProducts ] = useState([])
    const [ soldServices, setSoldServices ] = useState([])
    
    useEffect( () => {
        async function fetchData() {
          await getProducts(setProducts)
          await getServices(setServices)
          await getSaleTotal(setTotal, props.id)
        }
        fetchData();
    }, [])

    const productToast = () => {
        ToastAndroid.show('Producto agregado!', ToastAndroid.SHORT);
    }

    const serviceToast = () => {
        ToastAndroid.show('Servicio agregado!', ToastAndroid.SHORT);
    }

    const executeProductsToast = () => {
        ToastAndroid.show('Comienza a agregar!', ToastAndroid.SHORT);
    }

    const handleAdd = async (itemid, name) => {
        await getSaleTotal(setTotal, props.id)
        if(props.type === 'products') {
            await addSoldProduct(props.id, itemid, amount)
            await updateProductStock(itemid, amount)
            const updatedSoldProducts = [...soldProducts, { id: itemid, amount: amount }];
            await setSoldProducts(updatedSoldProducts);
            await getSaleTotal(setTotal, props.id)

            let updatedTotal = parseInt(total)

            products.map((product) => {
                if(itemid === product.id){
                    updatedTotal += (parseInt(amount) * parseInt(product.price))
                    setTotal(updatedTotal) //why??
                }
            })

            await updateTotalSale(props.id, updatedTotal)
            await getSaleTotal(setTotal, props.id)

            productToast()
        }
        else {
            await addSoldService(props.id, itemid)
            const updatedSoldServices = [...soldServices, { id: itemid }];
            await setSoldServices(updatedSoldServices);
            await getSaleTotal(setTotal, props.id)

            let updatedTotal = parseInt(total)

            services.map((service) => {
                if(itemid === service.id){
                    updatedTotal += parseInt(service.price)
                    setTotal(updatedTotal) //why??
                }
            })

            await updateTotalSale(props.id, updatedTotal)
            await getSaleTotal(setTotal, props.id)
            serviceToast()
        }
    }

    const handleUpdateTotal = async () => {
        await getSaleTotal(setTotal, props.id)
        executeProductsToast()
    }

    return (
        <>
            <>
                <Button color='green' title={addButton} onPress={handleUpdateTotal} />
                <FlatList
                    data={props.data}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemsContainer}>
                                { props.type === 'products' ? 
                                    <View>
                                        <Text style={styles.title}>Producto: {item.name}</Text>
                                        <Text style={styles.title}>Precio: {item.price}</Text>
                                        <Text style={styles.title}>Existencias: {item.stock}</Text>
                                        <TextInput placeholder='#Cantidad' onChangeText={(value) => setAmount(value)} />
                                    </View>
                                : 
                                    <View>
                                        <Text style={styles.title}>Servicio: {item.name}</Text>
                                        <Text style={styles.title}>Precio: {item.price}</Text>
                                    </View>
                                }
                                <Button style={styles.container} title='Agregar' color='#F74780' onPress={() => handleAdd(item.id, item.name)} />
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </>

            <>
                <Text style={{marginTop: 15, fontSize: 20}}>{props.type === 'products' ? 'Productos' : 'Servicios'} seleccionados</Text>
                <SaledProductsList 
                    saleid={props.id} 
                    content={props.type === 'products' ? soldProducts : soldServices} 
                    type={props.type === 'products' ? 'products' : 'services'} 
                    allProducts={props.type === 'products' ? products : services} />
            </>

            <>
                <Text style={{fontSize: 25, color: 'red', fontWeight: '600'}}>Total: ${total}</Text>
            </>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '80%'
    },
    scrollView: {
        flex: 1,
        maxHeight: '60%',
    },
    item: {
        backgroundColor: '#F37086',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
    saledProductsContainer: {
        flex: 1,
        margin: 10
    },
    itemsContainer: {
          flex: 1,
          padding: 25,
          margin: 10,
          marginVertical: 4,
          marginBottom: 9,
          borderWidth: 1,
          borderColor: '#ECEAEA',
          shadowColor: "#000",
          shadowOffset:{
          width: 0,
          height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
    }
});

export default GenericFlatList