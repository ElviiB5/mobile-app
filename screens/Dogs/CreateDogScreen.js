import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import { createDogStyle } from './styles/CreateDogStyle';
import { getCustomers } from '../../database/actions/CustomerActions';
import { createDog } from '../../database/actions/DogActions';
import {Picker} from '@react-native-picker/picker';

const CreateDogScreen = (props) => {
    const [ name, setName ] = useState("")
    const [ sex, setSex ] = useState("Hembra")
    const [ age, setAge ] = useState("")
    const [ breed, setBreed ] = useState("")
    const [ size, setSize ] = useState("Pequeño")
    const [ owner, setOwner ] = useState("")
    const [ customers, setCustomers ] = useState([])

    useEffect(() => {
        getCustomers(setCustomers)
    }, [])

    const executeToast = () => {
        ToastAndroid.show('Perrito creado con éxito!', ToastAndroid.SHORT);
    }

    const handleNameChange = (value) => {
        setName(value)
    }

    const handleSexChange = (value) => {
        console.log("value",value)
        setSex(value)
    }

    const handleAgeChange = (value) => {
        setAge(value)
    }

    const handleBreedChange = (value) => {
        setBreed(value)
    }

    const handleSizeChange = (value) => {
        setSize(value)
    }

    const handleOwnerChange = async (value) => {
        setOwner(value)
    }

    const handleSubmit = async () => {
        if(name === "" || sex === "" || age === "" || breed === "" || size === "" || owner === "")
            alert('Por favor, igresa todos los datos')
        else {
            try{
                await createDog(name, sex, age, breed, size, owner)
                executeToast()
                setName("")
                setAge("")
                setBreed("")
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
        }
    }

    return (
        <ScrollView style={createDogStyle.container}>
            <View style={createDogStyle.inputGroup}>
                <Text style={createDogStyle.titleCreate}>Nuevo Perrito</Text>
                <TextInput 
                    placeholder='Nombre del perrito' 
                    onChangeText={(value) => handleNameChange(value)} 
                    value={name} />
            </View>
            <View style={createDogStyle.inputGroup}>
                <Picker
                    style={{ height: 50, width: '100%' }}
                    selectedValue={sex}
                    onValueChange={(itemValue, itemIndex) => handleSexChange(itemValue)}>
                    <Picker.Item label="Hembra" key={'Hembra'} value="Hembra" />
                    <Picker.Item label="Macho" key={'Macho'} value="Macho" />
                </Picker>
            </View>
            <View style={createDogStyle.inputGroup}>
                <TextInput 
                    placeholder='Edad del perrito' 
                    onChangeText={(value) => handleAgeChange(value)} 
                    value={age} />
            </View>
            <View style={createDogStyle.inputGroup}>
                <TextInput 
                    placeholder='Raza del perrito' 
                    onChangeText={(value) => handleBreedChange(value)} 
                    value={breed} />
            </View>
            <View style={createDogStyle.inputGroup}>
                <Picker
                    style={{ height: 50, width: '100%' }}
                    selectedValue={size}
                    onValueChange={(itemValue, itemIndex) => handleSizeChange(itemValue)}>
                    <Picker.Item label="Pequeño" key={'Pequeño'} value="Pequeño" />
                    <Picker.Item label="Mediano" key={'Mediano'} value="Mediano" />
                    <Picker.Item label="Grande" key={'Grande'} value="Grande" />
                </Picker>
            </View>
            <View style={createDogStyle.inputGroup}>
                <Picker
                    style={{ height: 50, width: '100%' }}
                    selectedValue={owner}
                    onValueChange={(itemValue, itemIndex) => handleOwnerChange(itemValue)}
                >
                    {customers?.map((customer) => {
                        return (
                            <Picker.Item key={customer.id.toString()} label={customer.name} value={customer.id} />
                        )
                    })}
                </Picker>
            </View>
            <View>
                <Button title='Guardar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

StyleSheet.create({

})

export default CreateDogScreen;