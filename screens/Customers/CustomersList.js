import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { getCustomers } from '../../database/actions/CustomerActions';
import ListTable from '../../commonComponents/ListTable';
import CreateCustomerScreen from './CreateCustomerScreen';

const CustomerList = (props) => {
    const [ customers, setCustomers ] = useState([])

    useEffect(() => {
        async function fetchCustomers() {
          await getCustomers(setCustomers);
        }
        fetchCustomers();
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                        marginTop: 2, 
                        color:'#9652B6', 
                        fontSize: 41, 
                        fontWeight: '600'}}>Clientes</Text>
            <CreateCustomerScreen />
            
            <View style={{
                marginTop: 20,
                borderBottomColor: '#F74780',
                borderBottomWidth: 2,}}></View>

            <ListTable content={customers} navigation={props.navigation} type="customers"/>
        </ScrollView>
    )
}

export default CustomerList;