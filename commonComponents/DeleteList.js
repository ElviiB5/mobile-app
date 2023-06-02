import React from 'react';
import { ListItem } from '@rneui/themed';
import { Button, View } from 'react-native';
import { deleteSoldProduct, deleteSoldService } from '../database/actions/SaleActions';

const DeleteList = (props) => {
    const content = props.content
    const products = props.products
    const services = props.services

    const generateProduct = (productid) => {
        return (
            <View>
                    {products?.map((product) => {
                        if(product.id === productid)
                            return <ListItem.Subtitle key={product.id}>{product.name}</ListItem.Subtitle>;
                    })}
            </View>
        )
    }

    const generateService = (serviceid) => {
        return (
            <View>
                    {services?.map((service) => {
                        if(service.id === serviceid)
                            return <ListItem.Subtitle key={service.id}>{service.name}</ListItem.Subtitle>;
                    })}
            </View>
        )
    }

    return (
        <>
            {content.map((item) => {
                return(
                <ListItem.Swipeable key={item.id} bottomDivider
                    rightContent={() => (
                        <Button
                        title="Eliminar"
                        onPress={() => {
                            if(props.type === "products")
                                deleteSoldProduct(item.id)
                            else if (props.type === "services")
                                deleteSoldService(item.id)
                        }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        />
                    )}
                >
                    <ListItem.Content key={item.id}>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        {Object.keys(item).map((key) => {
                            if(key === 'product')
                                return generateProduct(item.product)
                            else if (key !== 'id') {
                                return generateService(item.service)
                            }
                            return null;
                        })}
                    </ListItem.Content>
                </ListItem.Swipeable>
            )})}
        </>
    )
}

export default DeleteList;