import { StyleSheet } from 'react-native';

const createUserStyle = StyleSheet.create({
    container: {
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
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    titleCreate: {
        fontSize: 25, 
        marginBottom: 10, 
        color:'#F74780', 
        fontWeight: '600' 
    }
});

export { createUserStyle }