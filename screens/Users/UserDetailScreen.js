import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { userDetailStyle } from './styles/UserDetailStyle';
import { updatePassword, updateUser } from '../../database/actions/UserActions';

const UserDetailScreen = (props) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    console.log(props.route.params.id)
    const id = props.route.params.id

    const [ name, setName ] = useState(props.route.params.name)
    const [ address, setAddress ] = useState(props.route.params.address)
    const [ phone, setPhone ] = useState(props.route.params.phone)
    const [ rol, setRol ] = useState(props.route.params.rol)
    const [ password, setPassword ] = useState('');  

    useEffect(() => {
        createPassword()
    }, [])

    const executeToast = () => {
        ToastAndroid.show('Usuario editado con éxito!', ToastAndroid.SHORT);
    }
    
    const executePasswordToast = () => {
        ToastAndroid.show('Contaseña actualizada!', ToastAndroid.SHORT);
    }

    const createPassword = () => {
        let result = '';
    
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
    
        setPassword(result);
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

    const handleChangePassword = async () => {
        await updatePassword(id, password)
        executePasswordToast()
    }

    const handleSubmit = async () => {
        if(name === "" || address === "" || phone === "" || rol === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
                await updateUser(id, name, address, phone, rol)
                executeToast()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
            
        }
    }

    return (
        <ScrollView style={userDetailStyle.container}>
            <Text style={userDetailStyle.titleCreate}>Editar Usuario</Text>
            <View style={userDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Nombre:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Nombre del usuario' 
                    defaultValue={name} 
                    onChangeText={(value) => handleNameChange(value)} />
            </View>
            <View style={userDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Domicilio:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Domicilio del usuario' 
                    defaultValue={address} 
                    onChangeText={(value) => handleAddressChange(value)} />
            </View>
            <View style={userDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Teléfono:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Teléfono del usuario' 
                    defaultValue={phone} 
                    onChangeText={(value) => handlePhoneChange(value)} />
            </View>
            <View style={userDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Rol:</Text>
                <Picker
                    style={{ height: 50, width: '100%', color: '#898888' }}
                    selectedValue={rol}
                    onValueChange={(itemValue, itemIndex) => handleRolChange(itemValue)}
                >
                    <Picker.Item label="Administrador" value="Administrador" />
                    <Picker.Item label="Recepcionista" value="Recepcionista" />
                    <Picker.Item label="Almacenista" value="Almacenista" />
                </Picker>
            </View>
            <View style={{marginBottom: 16}}>
                <Text style={{color: '#9652B6', fontWeight: '500', fontSize: 17, marginBottom: 8}}>¿Deseas cambiar la contraseña a {password}?</Text>
                <Button title='Cambiar contraseña' color='#F74780' onPress={handleChangePassword} />
            </View>
            <View>
                <Button title='Actualizar' color='#9652B6' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export default UserDetailScreen;