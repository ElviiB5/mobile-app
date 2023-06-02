import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { createProductStyle } from './styles/CreateProductStyle';
import { createProduct } from '../../database/actions/ProductActions';

const CreateProductScreen = (props) => {
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ stock, setStock ] = useState("")

    const executeToast = () => {
        ToastAndroid.show('Producto creado con éxito!', ToastAndroid.SHORT);
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
            await createProduct(name, description, price, stock)
            executeToast()
            setName("")
            setDescription("")
            setPrice("")
            setStock("")
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={createProductStyle.container}>
            <Text style={createProductStyle.titleCreate}>Nuevo Producto</Text>
            <View style={createProductStyle.inputGroup}>
                <TextInput 
                    placeholder='Nombre del producto' 
                    value={name}
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={createProductStyle.inputGroup}>
                <TextInput 
                    placeholder='Descripción del producto' 
                    value={description}
                    onChangeText={(value) => handleDescriptionChange(value)} />
            </View>
            <View style={createProductStyle.inputGroup}>
                <TextInput 
                    placeholder='Precio del producto' 
                    value={price}
                    onChangeText={(value) => handlePriceChange(value)} />
            </View>
            <View style={createProductStyle.inputGroup}>
                <TextInput 
                    placeholder='Existencias actuales' 
                    value={stock}
                    onChangeText={(value) => handleStockChange(value)} />
            </View>
            <View>
                <Button title='Guardar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

StyleSheet.create({

})

export default CreateProductScreen;