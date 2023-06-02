import React from 'react';
import { ListItem } from '@rneui/themed';
import { Button, StyleSheet, View } from 'react-native';
import { deleteSoldProduct, deleteSoldService } from '../database/actions/SaleActions';

const SaledProductsList = (props) => {
    const content = props.content
    const saleid = props.saleid
    const products = props.allProducts

    console.log("productos...",products)
    console.log("content...",content)

    const generateProduct = (id, amount) => {
        return (
            <>
                    {products?.map((product) => {
                        if(product.id === id)
                            return <ListItem.Subtitle style={{fontSize: 16}}
                                        key={product.id}>{amount} - {product.name} - ${product.price}</ListItem.Subtitle>;
                    })}
            </>
        )
    }

    const generateService = (id) => {
        //Here products are services haha
        return (
            <>
                    {products?.map((service) => {
                        if(service.id === id)
                            return <ListItem.Subtitle style={{fontSize: 16}}
                                        key={service.id}>{service.name}</ListItem.Subtitle>;
                    })}
            </>
        )
    }

    return (
        <>
            {content?.map((item) => {
                return(
                <ListItem.Swipeable key={item.id} bottomDivider        
                    rightContent={() => (
                        <Button
                        title="Eliminar"
                        onPress={() => {
                            if (props.type === "products")
                                deleteSoldProduct(saleid,item.id)
                            else if (props.type === "services")
                                deleteSoldService(saleid,item.id)
                        }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    )}
                >
                    <ListItem.Content key={item.id} style={styles.listItem}>
                        {
                            props.type === "products" ? generateProduct(item.id, item.amount) : generateService(item.id)
                        }
                    </ListItem.Content>
                </ListItem.Swipeable>
            )})}
        </>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ECEAEA',
        shadowColor: "#F74780",
        shadowOffset:{
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
});


export default SaledProductsList;