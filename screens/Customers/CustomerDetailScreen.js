import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { getCustomerById, updateCustomer } from '../../database/actions/CustomerActions';
import { customerDetailStyle } from './styles/CustomerDetailStyle';

const CustomerDetailScreen = (props) => {
    console.log(props.route.params.id)
    const id = props.route.params.id

    const [ name, setName ] = useState(props.route.params.name)
    const [ address, setAddress ] = useState(props.route.params.address)
    const [ phone, setPhone ] = useState(props.route.params.phone)

    const executeToast = () => {
        ToastAndroid.show('Cliente editado con éxito!', ToastAndroid.SHORT);
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
                await updateCustomer(id, name, address, phone)
                executeToast()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={customerDetailStyle.container}>
            <Text style={customerDetailStyle.titleCreate}>Editar Cliente</Text>
            <View style={customerDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Nombre:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Nombre del cliente' 
                    defaultValue={name} 
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={customerDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Dirección:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Domicilio del cliente' 
                    defaultValue={address} 
                    onChangeText={(value) => handleAddressChange(value)} />
            </View>
            <View style={customerDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Teléfono:</Text>
                <TextInput
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Teléfono del cliente' 
                    defaultValue={phone} 
                    onChangeText={(value) => handlePhoneChange(value)} />
            </View>
            <View style={{marginTop: 16}}>
                <Button title='Actualizar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export default CustomerDetailScreen;