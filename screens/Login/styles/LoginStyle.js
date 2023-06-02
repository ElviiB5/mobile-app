import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    backgroundImageContainer: {
        flex: 1,
        resizeMode: 'cover',
    },
    button: {
        backgroundColor: '#9652B6',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
    },
    buttonContainer: {
        justifyContent: 'center',
        height: height / 3
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 20,
        fontSize: 20
    },
    formButton: {
        backgroundColor: '#9652B6',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }, 
    formInputContainer: {
        marginBottom: 50,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center'
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        top: -20
    },
    loginButton: {
        backgroundColor: '#9652B6'
    }, 
    titleText: {
        color: '#9652B6',
        fontSize: 40,
        fontWeight: '600'
    },
    normalText: {
        color: '#D0ACD0',
        fontSize: 25,
        fontWeight: '600'
    },
    textContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    }
});

export { loginStyle }