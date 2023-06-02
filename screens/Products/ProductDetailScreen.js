import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { productDetailStyle } from './styles/ProductDetailStyle';
import { updateProduct } from '../../database/actions/ProductActions';

const ProductDetailScreen = (props) => {
    const id = props.route.params.id

    const [ name, setName ] = useState(props.route.params.name)
    const [ description, setDescription ] = useState(props.route.params.description)
    const [ price, setPrice ] = useState(props.route.params.price)
    const [ stock, setStock ] = useState(props.route.params.stock)

    const executeToast = () => {
        ToastAndroid.show('Producto editado con éxito!', ToastAndroid.SHORT);
    }

    const handleNameChange = (value) => {
        setName(value)
    }

    const handleDescriptionChange = (value) => {
        setDescription(value)
    }

    const handlePriceChange = (value) => {
        setPrice(value)
    }

    const handleStockChange = (value) => {
        setStock(value)
    }

    const handleSubmit = async () => {
        if(name === "" || description === "" || price === "" || stock === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
                await updateProduct(id, name, description, price, stock)
                executeToast()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={productDetailStyle.container}>
            <Text style={productDetailStyle.titleCreate}>Editar Producto</Text>
            <View style={productDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Nombre:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Nombre del producto' 
                    defaultValue={name} 
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={productDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Descripción:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Descripción del producto' 
                    defaultValue={description} 
                    onChangeText={(value) => handleDescriptionChange(value)} />
            </View>
            <View style={productDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Precio:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Precio del producto' 
                    defaultValue={price} 
                    onChangeText={(value) => handlePriceChange(value)} />
            </View>
            <View style={productDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Existencias:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Existencias actuales' 
                    defaultValue={stock.toString()} 
                    onChangeText={(value) => handleStockChange(value)} />
            </View>
            <View style={{marginBottom: 15, marginTop: 15}}>
                <Button title='Actualizar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export default ProductDetailScreen;