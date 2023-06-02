import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, StatusBar, Button, ScrollView, ToastAndroid } from 'react-native';
import { deleteSale, getSales } from '../../database/actions/SaleActions';
import { getCustomers } from '../../database/actions/CustomerActions';

const Item = ({date, id, customer, customers, user, total}) => {
    const handleDelete = async (e) => {
        await deleteSale(id)
        executeToast()
    }

    const executeToast = () => {
        ToastAndroid.show('Venta eliminada con éxito!', ToastAndroid.SHORT);
    }

    const generateCustomer = (id) => {
        return (
            <>
                    {customers?.map((customer) => {
                        if(customer.id === id)
                            return <Text style={styles.title} key={customer.id}>Cliente: {customer.name}</Text>;
                    })}
            </>
        )
    }

    return (
        <View style={styles.item}>
            <Text style={styles.title}>Fecha: {date}</Text>
            {generateCustomer(customer)}
            <Text style={styles.title}>Recepcionista: {user}</Text>
            <Text style={styles.title}>Total de la venta: ${total}</Text>
            <Button color='#F74780' title='Eliminar' onPress={handleDelete} /> 
        </View>
    )
}

const SalesList = () => {
    const [ sales, setSales ] = useState([])
    const [ customers, setCustomers ] = useState([])

    useEffect(() => {
        getSales(setSales)
        getCustomers(setCustomers)
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                        marginTop: 2, 
                        color:'#9652B6', 
                        fontSize: 41, 
                        fontWeight: '600'}}>Ventas</Text>
            <FlatList
                data={sales}
                renderItem={({item}) => {
                    console.log(sales)
                    return <Item 
                                date={item.date} 
                                customer={item.customer} 
                                customers={customers}
                                user={item.user} 
                                id={item.id} 
                                total={item.total} />
                }}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      height: 60
    },
    item: {
        flex: 1,
        padding: 25,
        margin: 10,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#ECEAEA',
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
      fontSize: 20,
    }
});

export default SalesList;