import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { dogDetailStyle } from './styles/DogDetailStyle';
import { getCustomers } from '../../database/actions/CustomerActions';
import { updateDog } from '../../database/actions/DogActions';

const DogDetailScreen = (props) => {
    console.log(props.route.params.id)
    const id = props.route.params.id
    
    const [ name, setName ] = useState(props.route.params.name)
    const [ sex, setSex ] = useState(props.route.params.sex)
    const [ age, setAge ] = useState(props.route.params.age)
    const [ breed, setBreed ] = useState(props.route.params.breed)
    const [ size, setSize ] = useState(props.route.params.size)
    const [ owner, setOwner ] = useState(props.route.params.owner)
    const [ customers, setCustomers ] = useState([])

    console.log("owner",owner)

    useEffect(() => {
        getCustomers(setCustomers)
    }, [])

    const executeToast = () => {
        ToastAndroid.show('Perrito editado con éxito!', ToastAndroid.SHORT);
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
                await updateDog(id, name, sex, age, breed, size, owner)
                executeToast()
            } catch (error) {
                alert('Ocurrió un error, por favor contacta a un administrador')
            }
        }
    }

    return (
        <ScrollView style={dogDetailStyle.container}>
            <Text style={dogDetailStyle.titleCreate}>Editar Perrito</Text>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Nombre:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Nombre del perrito' 
                    onChangeText={(value) => handleNameChange(value)} 
                    defaultValue={name} />
            </View>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Sexo:</Text>
                <Picker
                    style={{ height: 50, width: '100%', color: '#898888' }}
                    selectedValue={sex}
                    onValueChange={(itemValue, itemIndex) => handleSexChange(itemValue)}>
                    <Picker.Item label="Hembra" key={'Hembra'} value="Hembra" />
                    <Picker.Item label="Macho" key={'Macho'} value="Macho" />
                </Picker>
            </View>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Edad:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Edad del perrito' 
                    onChangeText={(value) => handleAgeChange(value)} 
                    defaultValue={age} />
            </View>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Raza:</Text>
                <TextInput 
                    style={{color: '#898888', fontSize: 16}}
                    placeholder='Raza del perrito' 
                    onChangeText={(value) => handleBreedChange(value)} 
                    defaultValue={breed} />
            </View>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Tamaño:</Text>
                <Picker
                    style={{ height: 50, width: '100%', color: '#898888' }}
                    selectedValue={size}
                    onValueChange={(itemValue, itemIndex) => handleSizeChange(itemValue)}>
                    <Picker.Item label="Pequeño" key={'Pequeño'} value="Pequeño" />
                    <Picker.Item label="Mediano" key={'Mediano'} value="Mediano" />
                    <Picker.Item label="Grande" key={'Grande'} value="Grande" />
                </Picker>
            </View>
            <View style={dogDetailStyle.inputGroup}>
                <Text style={{fontSize: 17}}>Dueño:</Text>
                <Picker
                    style={{ height: 50, width: '100%', color: '#898888' }}
                    selectedValue={owner}
                    onValueChange={(itemValue, itemIndex) => handleOwnerChange(itemValue)}
                >
                    {customers?.map((customer) => {
                        console.log("owww", owner)
                        return (
                            <Picker.Item  key={customer.id.toString()} label={customer.name} value={customer.id} />
                        )
                    })}
                </Picker>
            </View>
            <View style={{marginBottom: 15, marginTop: 15}}>
                <Button title='Actualizar' color='#F74780' onPress={handleSubmit} />
            </View>
        </ScrollView>
    )
}

export default DogDetailScreen;