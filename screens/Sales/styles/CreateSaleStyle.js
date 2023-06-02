import { StyleSheet } from 'react-native';

const createSaleStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    productsBox: {
        backgroundColor: 'yellow',
        height: 300,
        margin: 10
    },
    textTitle: {
        color: '#9652B6',
        fontSize: 40,
        fontWeight: '600'
    }
});

export { createSaleStyle }