import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ScrollViewComponent, LogBox, ToastAndroid } from 'react-native';
import { createSaleStyle } from './styles/CreateSaleStyle';
import { createSale, getSaleByData, getSoldProducts, updateSale, getSoldServices } from '../../database/actions/SaleActions';
import { useEffect } from 'react';
import { getCustomers } from '../../database/actions/CustomerActions';
import { getDogs } from '../../database/actions/DogActions';
import {Picker} from '@react-native-picker/picker';
import { getProducts, getProductsByName } from '../../database/actions/ProductActions';
import GenericFlatList from '../../commonComponents/GenericFlatList';
import { getServices, getServicesByName } from '../../database/actions/ServicesActions';
import { getSaleTotal } from '../../database/actions/SaleActions';
import Lottie from 'lottie-react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const CreateSaleScreen = (props) => {
    const user = props.username
    const [ customer, setCustomer ] = useState("")
    const [ dog, setDog ] = useState("")
    const [ total, setTotal ] = useState(0)

    const [ customers, setCustomers ] = useState([])
    const [ dogs, setDogs ] = useState([])
    const [ searchedProducts, setSearchedProducts ] = useState([])
    const [ searchedServices, setSearchedServices ] = useState([])
    const [ isSaleCreated, setIsSaleCreated ] = useState(false)

    const [ saleFinished, setSaleFinished ] = useState(false)

    const [ saleid, setSaleid ] = useState("")

    const date = new Date()

    useEffect( () => {
        async function fetchData() {
          await getDogs(setDogs);
          await getCustomers(setCustomers)
          await getProducts(setSearchedProducts)
          await getServices(setSearchedServices)
        }
        fetchData();
    }, [])

    const executeToast = () => {
        ToastAndroid.show('Venta publicada con éxito!', ToastAndroid.SHORT);
    }

    const handleCustomerChange = (value) => {
        setCustomer(value)
    }

    const handleDogChange = (value) => {
        setDog(value)
    }

    const handleProductsChange = async (value) => {
        await getProductsByName(setSearchedProducts, value)
    }

    const handleServicesChange = async (value) => {
        await getServicesByName(setSearchedServices, value)
    }

    const handleCreate = async () => {
        if(user === "" || customer === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
            await createSale(user, customer, date)
            await getSaleByData(setSaleid, user, customer, date)
            setIsSaleCreated(true)
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
                console.log(error)
            }
        }
        setSaleFinished(false)
    }

    const handlePost = async () => {
        try{
            await updateSale(saleid, user, customer, dog)
            await getSaleTotal(setTotal, saleid)
            setSaleFinished(true)
            executeToast()
        } catch (error) {
            alert('Ocurrió un error, por favor contacta a un administrador')
        }
    }

    const handleSubmit = async () => {
        const message = "El total a cobrar es $" + total
        console.log(message)
        alert(message)
        setIsSaleCreated(false)
    }

    return (
        <ScrollView>
                <Text style={{ fontSize: 20 }}>Usuario: {props.username}</Text>
                <Text style={{ fontSize: 20 }}>Cliente:</Text>
                <Picker
                    style={{ height: 50, width: '100%', fontSize: 20 }}
                    selectedValue={customer}
                    onValueChange={(itemValue, itemIndex) => handleCustomerChange(itemValue)}
                >
                    {customers?.map((customer) => {
                        return (
                            <Picker.Item  key={customer.id.toString()} label={customer.name} value={customer.id} />
                        )
                    })}
                </Picker>
                <Button title='Comenzar nueva venta' color='#F74780' onPress={handleCreate} />

                {
                    isSaleCreated ? 
                        <>                            
                            <View style={{
                            marginTop: 20,
                            borderBottomColor: '#F74780',
                            borderBottomWidth: 2}}></View>
                            <Text style={createSaleStyle.textTitle}>Productos</Text>
                            <TextInput placeholder='Busca producto' onChangeText={(value) => handleProductsChange(value)} />
                            
                            <GenericFlatList data={searchedProducts} type='products' id={saleid} />

                            <View style={{
                                marginTop: 20,
                                borderBottomColor: '#F74780',
                                borderBottomWidth: 2}}></View>

                            <Text style={createSaleStyle.textTitle}>Servicios</Text>
                            <TextInput placeholder='Buscar servicio' onChangeText={(value) => handleServicesChange(value)} />
                            
                            <GenericFlatList data={searchedServices} type='services' id={saleid} />
                            
                            <View style={{
                                marginTop: 20,
                                borderBottomColor: '#F74780',
                                borderBottomWidth: 2}}></View>

                            <Text style={{fontSize: 20, marginTop: 10}}>Perrito:</Text>
                            <Picker
                                style={{ height: 50, width: '100%', marginBottom: 6 }}
                                selectedValue={dog}
                                onValueChange={(itemValue, itemIndex) => handleDogChange(itemValue)}
                            >
                                {dogs?.map((dog) => {
                                    return (
                                        <Picker.Item  key={dog.id.toString()} label={dog.name} value={dog.id} />
                                    )
                                })}
                            </Picker>

                            <View style={{ marginBottom: 10 }}>
                                <Button title='Publicar venta' color='#9652B6' onPress={handlePost} />
                            </View>
                            <View style={{ marginBottom: 30 }}>
                                <Button title='Finalizar' color='#F74780' onPress={handleSubmit} />
                            </View>
                        </>
                    :
                        <>
                            <Text>Selecciona el cliente y pulsa el botón para comenzar con la venta</Text>
                        </>
                }
            
                { !setSaleFinished && 
                    <Lottie 
                    source={require('../../assets/67938-money-confetti.json')} 
                    style={{ width: 200}}
                    autoPlay 
                    />
                }
        </ScrollView>
    )
}

export default CreateSaleScreen;
