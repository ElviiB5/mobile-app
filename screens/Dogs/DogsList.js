import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { getDogs } from '../../database/actions/DogActions';
import ListTable from '../../commonComponents/ListTable';
import { getCustomers } from '../../database/actions/CustomerActions';
import CreateDogScreen from './CreateDogScreen';

const CustomerList = (props) => {
    const [ dogs, setDogs ] = useState([])
    const [ customers, setCustomers ] = useState([])

    useEffect(() => {
        async function fetchData() {
          await getDogs(setDogs);
          await getCustomers(setCustomers)
        }
        fetchData();
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                        marginTop: 2, 
                        color:'#9652B6', 
                        fontSize: 41, 
                        fontWeight: '600'}}>Perritos</Text>
            <CreateDogScreen />

            <View style={{
                marginTop: 20,
                borderBottomColor: '#F74780',
                borderBottomWidth: 2,}}></View>

            <ListTable customers={customers} content={dogs} navigation={props.navigation} type="dogs"/>
        </ScrollView>
    )
}

export default CustomerList;