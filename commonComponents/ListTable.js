import React from 'react';
import { ListItem } from '@rneui/themed';
import { Button, Pressable, View, Text, StyleSheet } from 'react-native';
import { deleteCustomer } from '../database/actions/CustomerActions';
import { deleteDog } from '../database/actions/DogActions';
import { deleteProduct } from '../database/actions/ProductActions';
import { deleteServices } from '../database/actions/ServicesActions';
import { deleteUser } from '../database/actions/UserActions';

const ListTable = (props) => {
    const content = props.content
    const customers = props.customers

    const generateCustomer = (dogOwner, label) => {
        return (
            <View>
                    {customers?.map((customer) => {
                        if(customer.id === dogOwner)
                            return <ListItem.Subtitle key={customer.id}>{label} {customer.name}</ListItem.Subtitle>;
                    })}
            </View>
        )
    }

    const chooseLabel = (key) => {
        let label = '';
        switch (key) {
          case 'name':
            label = 'Nombre:';
            break;
          case 'address':
            label = 'Dirección:';
            break;
          case 'phone':
            label = 'Teléfono:';
            break;
          case 'sex':
            label = 'Sexo:';
            break;
          case 'age':
            label = 'Edad:';
            break;
          case 'breed':
            label = 'Raza:';
            break;
          case 'size':
            label = 'Tamaño:';
            break;
          case 'owner':
            label = 'Dueño:';
            break;
          case 'date':
            label = 'Fecha:';
            break;
          case 'customer':
            label = 'Cliente:';
            break;
          case 'user':
            label = 'Recepcionista:';
            break;
          case 'total':
            label = 'Total:';
            break;
          case 'breed':
            label = 'Raza:';
            break;
          case 'stock':
            label = 'Existencias:';
            break;
          case 'rol':
            label = 'Rol:';
            break;
          case 'description':
            label = 'Descripción:';
            break;
          case 'price':
            label = 'Precio: $';
            break;
          default:
            break;
        }
        return label
    }

    return (
        <>
            {content.map((item) => {
                return(
                <ListItem.Swipeable key={item.id} bottomDivider
                    style={styles.listItem}
                    leftContent={() => (
                        <Pressable
                        style={[styles.button, styles.leftButton]}
                        onPress={() => {
                            if (props.type === 'customers') {
                              props.navigation.navigate('CustomerDetailScreen', {
                                id: item.id,
                                name: item.name,
                                address: item.address,
                                phone: item.phone
                              });
                            } else if (props.type === 'dogs') {
                                props.navigation.navigate('DogDetailScreen', {
                                  id: item.id,
                                  name: item.name,
                                  sex: item.sex,
                                  age: item.age,
                                  breed: item.breed,
                                  size: item.size,
                                  owner: item.owner,
                                });
                            } else if (props.type === 'products') {
                                props.navigation.navigate('ProductDetailScreen', {
                                  id: item.id,
                                  name: item.name,
                                  description: item.description,
                                  price: item.price,
                                  stock: item.stock
                                });
                            } else if (props.type === 'services') {
                                props.navigation.navigate('ServiceDetailScreen', {
                                  id: item.id,
                                  name: item.name,
                                  description: item.description,
                                  price: item.price
                                });
                            } else if (props.type === 'users') {
                                props.navigation.navigate('UserDetailScreen', {
                                  id: item.id,
                                  name: item.name,
                                  address: item.address,
                                  phone: item.phone,
                                  rol: item.rol
                                });
                            }
                        }}
                        icon={{ name: 'info', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'yellow' }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600',
                                paddingBottom: 10
                            }}>Editar</Text>
                        </Pressable>
                    )}
        
                    rightContent={() => (
                        <Pressable
                        style={[styles.button, styles.rightButton]}
                        onPress={() => {
                            if(props.type === "customers")
                                deleteCustomer(item.id)
                            else if (props.type === "dogs")
                                deleteDog(item.id)
                            else if (props.type === "products")
                                deleteProduct(item.id)
                            else if (props.type === "services")
                                deleteServices(item.id)
                            else if (props.type === "users")
                                deleteUser(item.id)
                        }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        >
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600',
                                paddingBottom: 10
                            }}>Eliminar</Text>
                        </Pressable>
                    )}
                >
                    <ListItem.Content key={item.id}>
                        <ListItem.Title style={{
                                                fontSize: 25,
                                                fontWeight: '600',
                                                color:'#F74780'}}>{item.name}</ListItem.Title>
                        <View style={{ display: 'flex' }}>
                            {Object.keys(item).map((key) => {
                                const label = chooseLabel(key)
                                if(key === 'owner')
                                    return generateCustomer(item.owner, label)
                                else if (key !== 'id' && key !== 'name' && key !== 'owner') {
                                    return <ListItem.Subtitle key={key}>{label} {item[key]}</ListItem.Subtitle>;
                                }
                                return null;
                            })}
                        </View>
                    </ListItem.Content>
                </ListItem.Swipeable>
            )})}
        </>
    )
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 4,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -25 }],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    width: 105,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftButton: {
    left: 16,
    backgroundColor: '#FFD643',
  },
  rightButton: {
    right: 16,
    backgroundColor: '#FD0C2C',
  },
  buttonText: {
    color: 'white',
  },
});

export default ListTable;