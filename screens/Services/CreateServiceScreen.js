import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { createServiceStyle } from './styles/CreateServiceStyle';
import { createService } from '../../database/actions/ServicesActions';

const CreateServiceScreen = (props) => {
    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ price, setPrice ] = useState("")

    const executeToast = () => {
        ToastAndroid.show('Servicio creado con éxito!', ToastAndroid.SHORT);
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
                await createService(name, description, price)
                executeToast()
                setName("")
                setDescription("")
                setPrice("")
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={createServiceStyle.container}>
            <Text style={createServiceStyle.titleCreate}>Nuevo servicio</Text>
            <View style={createServiceStyle.inputGroup}>
                <TextInput 
                    placeholder='Nombre del servicio' 
                    value={name}
                    style={{borderColor: 'white'}}
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={createServiceStyle.inputGroup}>
                <TextInput 
                    placeholder='Descripción del servicio' 
                    value={description}
                    onChangeText={(value) => handleDescriptionChange(value)} />
            </View>
            <View style={createServiceStyle.inputGroup}>
                <TextInput 
                    placeholder='Precio del servicio' 
                    value={price}
                    onChangeText={(value) => handlePriceChange(value)} />
            </View>
            <View>
                <Button title='Crear' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

StyleSheet.create({

})

export default CreateServiceScreen;