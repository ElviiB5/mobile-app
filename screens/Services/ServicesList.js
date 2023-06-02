import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import ListTable from '../../commonComponents/ListTable';
import { getServices } from '../../database/actions/ServicesActions';
import CreateServiceScreen from './CreateServiceScreen';

const ServicesList = (props) => {
    const [ services, setServices ] = useState([])

    useEffect(() => {
        async function fetchProducts() {
          await getServices(setServices);
        }
        fetchProducts();
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                        marginTop: 2, 
                        color:'#9652B6', 
                        fontSize: 41, 
                        fontWeight: '600'}}>Servicios</Text>
            <CreateServiceScreen />

            <View style={{
                marginTop: 20,
                borderBottomColor: '#F74780',
                borderBottomWidth: 2}}></View>

            <Text style={{ fontSize: 22, marginTop: 15 }}>Servicios existentes</Text>

            <ListTable content={services} navigation={props.navigation} type="services"/>
        </ScrollView>
    )
}

export default ServicesList;