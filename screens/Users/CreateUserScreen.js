import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { createUserStyle } from './styles/CreateUserScreen';
import { createUser } from '../../database/actions/UserActions';

const CreateUserScreen = (props) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState('');  
    const [ address, setAddress ] = useState("")
    const [ phone, setPhone ] = useState("")
    const [ rol, setRol ] = useState("Administrador")

    console.log(password)

    useEffect(() => {
        createPassword()
    }, [])

    const executeToast = () => {
        ToastAndroid.show('Usuario creado con éxito!', ToastAndroid.SHORT);
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

    const handleRolChange = (value) => {
        setRol(value)
    }

    const createPassword = () => {
        let result = '';
    
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
    
        setPassword(result);
    }

    const handleSubmit = async () => {
        if(name === "" || address === "" || phone === "" || rol === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
            await createUser(name, address, phone, rol, password)
            executeToast()
            setName("")
            setAddress("")
            setPhone("")
            createPassword()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
        }
    }

    return (
        <ScrollView style={createUserStyle.container}>
            <View style={createUserStyle.inputGroup}>
                <Text style={createUserStyle.titleCreate}>Nuevo Usuario</Text>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Nombre del usuario' 
                    onChangeText={(value) => handleNameChange(value)} 
                    value={name} />
            </View>
            <View style={createUserStyle.inputGroup}>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Domicilio del usuario' 
                    onChangeText={(value) => handleAddressChange(value)} 
                    value={address} />
            </View>
            <View style={createUserStyle.inputGroup}>
                <TextInput 
                    style={{ fontSize: 17 }}
                    placeholder='Teléfono del usuario' 
                    onChangeText={(value) => handlePhoneChange(value)} 
                    value={phone} />
            </View>
            <View style={createUserStyle.inputGroup}>
                <Picker
                    style={{ height: 50, width: '100%' }}
                    selectedValue={rol}
                    onValueChange={(itemValue, itemIndex) => handleRolChange(itemValue)}
                >
                    <Picker.Item label="Administrador" value="Administrador" />
                    <Picker.Item label="Recepcionista" value="Recepcionista" />
                    <Picker.Item label="Almacenista" value="Almacenista" />
                </Picker>
            </View>
            <View>
                <Text style={{ fontSize: 15, marginBottom: 12 }}>Cuando crees el usuario mándale la siguiente contraseña al usuario para que pueda acceder: {password}</Text>
            </View>
            <View>
                <Button title='Guardar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

StyleSheet.create({

})

export default CreateUserScreen;