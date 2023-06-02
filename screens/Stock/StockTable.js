import React, { useEffect } from 'react';
import { ListItem } from '@rneui/themed';
import { Button, Pressable, View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { useState } from 'react';
import { updateAddingProductStock } from '../../database/actions/ProductActions';

const StockTable = (props) => {
    const content = props.content
    const [amounts, setAmounts] = useState({});
    const [ finalTotal, setFinalTotal ] = useState("")
    const [ id, setId ] = useState("")

    useEffect(() => {
      const updateProductStock = async () => {
        try {
          await updateAddingProductStock(id, finalTotal);
        } catch (error) {
        }
      };
    
      updateProductStock();
    }, [finalTotal]);

    const executeToast = () => {
      ToastAndroid.show('Producto actualizado!', ToastAndroid.SHORT);
    }

    const calculateTotalStock = () => {
      console.log("This is id",id)
      console.log("These are products", content)
      content?.forEach((product) => {
        console.log("prodid", product.id)
        if (product.id === id) {
          console.log("product",product)
          console.log("stock.............",product.stock)
          console.log("stock.............",parseInt(product.stock) )
          console.log("amount",amounts[id])
          console.log("amount",parseInt(amounts[id]))
          console.log("sum",parseInt(product.stock) + parseInt(amounts[id]))
          setFinalTotal(parseInt(product.stock) + parseInt(amounts[id]));
          console.log("final",finalTotal)
        }
      });
    };

    const handleStockChange = (id, value) => {
      setId(id)
      console.log("IDD:", id);
      console.log("Value:", value);
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [id]: value,
      }));
      console.log(amounts[id])
    };

    const handleSubmit = async () => {
      console.log("AMOUNT", amounts[id]);
      console.log("IDDDD", id);
      await calculateTotalStock();
      console.log("WORKS!", finalTotal)
      executeToast()
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [id]: "",
      }));
    };

    const chooseLabel = (key) => {
        let label = '';
        switch (key) {
          case 'name':
            label = 'Nombre:';
            break;
          case 'stock':
            label = 'Existencias:';
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
                    <View key={item.id} style={styles.listItem}>
                        <ListItem.Swipeable key={item.id} bottomDivider >
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
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300, alignItems: 'center'}}>
                                    <Text>Entradas de producto: </Text>
                                    <TextInput
                                        placeholder="#"
                                        style={{ width: 50 }}
                                        value={amounts[item.id] || ""}
                                        onChangeText={(value) => handleStockChange(item.id, value)}
                                      />
                                    <Button title='Actualizar' color='#F74780' onPress={handleSubmit} />
                                </View>
                            </ListItem.Content>
                        </ListItem.Swipeable>
                    </View>
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

export default StockTable;