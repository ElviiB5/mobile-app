import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { serviceDetailStyle } from './styles/ServiceDetailStyle';
import { updateService } from '../../database/actions/ServicesActions';

const ServiceDetailScreen = (props) => {
    const id = props.route.params.id

    const [ name, setName ] = useState(props.route.params.name)
    const [ description, setDescription ] = useState(props.route.params.description)
    const [ price, setPrice ] = useState(props.route.params.price)

    const executeToast = () => {
        ToastAndroid.show('Servicio editado con éxito!', ToastAndroid.SHORT);
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

    const handleSubmit = async () => {
        if(name === "" || description === "" || price === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
                await updateService(id, name, description, price)
                executeToast()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={serviceDetailStyle.container}>
            <Text style={serviceDetailStyle.titleCreate}>Editar Servicio</Text>
            <View style={serviceDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Nombre:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Nombre del servicio' 
                    defaultValue={name} 
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={serviceDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Descripción:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Descripción del servicio' 
                    defaultValue={description} 
                    onChangeText={(value) => handleDescriptionChange(value)} />
            </View>
            <View style={serviceDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Precio:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Precio del servicio' 
                    defaultValue={price.toString()} 
                    onChangeText={(value) => handlePriceChange(value)} />
            </View>
            <View style={{marginBottom: 15, marginTop: 15}}>
                <Button title='Actualizar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export default ServiceDetailScreen;