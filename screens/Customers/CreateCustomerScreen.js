import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { createCustomerStyle } from './styles/CreateCustomerStyle';
import { createCustomer } from '../../database/actions/CustomerActions';

const CreateCustomerScreen = () => {
    const [ name, setName ] = useState("")
    const [ address, setAddress ] = useState("")
    const [ phone, setPhone ] = useState("")

    const executeToast = () => {
        ToastAndroid.show('Cliente creado con éxito!', ToastAndroid.SHORT);
    }

    const handleNameChange = (value) => {
        setName(value)
    }

    const handleAddressChange = (value) => {
        setAddress(value)
    }

    const handlePhoneChange = (value) => {
        setPhone(value)
    }

    const handleSubmit = async () => {
        if(name === "" || address === "" || phone === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
                await createCustomer(name, address, phone)
                executeToast()
                setName('');
                setAddress('');
                setPhone('');
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={createCustomerStyle.container}>
            <View>
                <Text style={createCustomerStyle.titleCreate}>Crea nuevo cliente</Text>
            </View>
            <View style={createCustomerStyle.inputGroup}>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Nombre del cliente' 
                    onChangeText={(value) => handleNameChange(value)} 
                    value={name} />
            </View>
            <View style={createCustomerStyle.inputGroup}>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Domicilio del cliente' 
                    onChangeText={(value) => handleAddressChange(value)} 
                    value={address} />
            </View>
            <View style={createCustomerStyle.inputGroup}>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Teléfono del cliente' 
                    onChangeText={(value) => handlePhoneChange(value)} 
                    value={phone} />
            </View>
            <View>
                <Button title='Guardar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

StyleSheet.create({

})

export default CreateCustomerScreen;