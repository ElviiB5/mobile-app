import { StyleSheet } from 'react-native';

const productDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        margin: 10,
        paddingTop: 30,
        marginBottom: 20,
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
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    titleText: {
        color:'#D882D8', 
        fontSize: 25, 
        fontWeight: '500',
        marginBottom: 10
    },
    titleCreate: {
        fontSize: 25, 
        marginBottom: 10, 
        color:'#F74780', 
        fontWeight: '600' 
    }
});

export { productDetailStyle }