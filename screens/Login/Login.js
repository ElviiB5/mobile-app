import React, { useEffect, useState } from 'react';
import { Button, Dimensions, ScrollView, TextInput, View, ImageBackground, Text, StyleSheet, Pressable } from 'react-native';
import { loginStyle } from './styles/LoginStyle';
import { getUsers, getUsersWithPassword, userLogin } from '../../database/actions/UserActions';
import bgimage from '../../assets/bg.jpg'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    interpolate, 
    withTiming,
    withDelay,
    withSequence,
    withSpring
} from 'react-native-reanimated'

const Login = (props) => {
    const { height, width } = Dimensions.get('window')
    const imagePosition = useSharedValue(1)
    const formButtonScale = useSharedValue(1)
    const [ isLogin, setIsLogin ] = useState(false)

    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ users, setUsers ] = useState([])

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [-height / 1.6, 0])
        return {
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        }
    }) 

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
        return {
            opacity: withTiming(imagePosition.value, {duration: 500}),
            transform: [{translateY: withTiming(interpolation, {duration: 1000})}]
        }
    })

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0,1], [180,360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
            transform: [{rotate: withTiming(interpolation + "deg", {duration: 1000})}]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, {duration: 800})) : withTiming(0, {duration: 300})
        }
    })

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: formButtonScale.value}]
        }
    })

    const loginHandler = () => {
        imagePosition.value = 0
        if(!isLogin){
            setIsLogin(true)
        }
    }

    const creditsHandler = () => {
        imagePosition.value = 0
        if(isLogin){
            setIsLogin(false)
        }
    }
    
    useEffect(() => {
        async function fetchUsers() {
          await getUsersWithPassword(setUsers);
        }
        fetchUsers();
    }, [])

    const handleNameChange = (value) => {
        setName(value)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleLogin = () => {
        if(name === "" || password === "")
            alert('Por favor, igresa todos los datos')
        else {
            const result = users.filter((user) => {
                return user.name === name && user.password === password
            })
            console.log("RESULT",result)
            if(result.length > 0){
                setName("")
                setPassword("")
                props.navigation.navigate('PetDog', {
                    user: result[0]
                });
            } else alert("Datos incorrectos, intenta nuevamente")
        }
    }

    return (
        <Animated.View style={loginStyle.container}>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg height={height + 100} width={width} >
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                    </ClipPath>
                    <Image 
                        href={require('../../assets/login.jpg')} 
                        width={width + 100} 
                        height={height + 100} 
                        preserveAspectRatio="xMidYMid slice" 
                        clipPath="url(#clipPathId)"/>
                </Svg>
                <Animated.View style={[loginStyle.closeButtonContainer, closeButtonContainerStyle]}>
                    <Text onPress={() => imagePosition.value = 1}>X</Text>
                </Animated.View>
            </Animated.View>
            <View style={loginStyle.buttonContainer}>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={loginStyle.button} onPress={loginHandler}>
                        <Text style={loginStyle.buttonText}>LOGIN</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={loginStyle.button} onPress={creditsHandler}>
                        <Text style={loginStyle.buttonText}>CRÉDITOS</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={[loginStyle.formInputContainer, formAnimatedStyle]}>
                    { isLogin ? 
                    <View>
                        <TextInput 
                            placeholder='Nombre usuario' 
                            placeholderTextColor="gray"
                            style={loginStyle.textInput}
                            onChangeText={(value) => handleNameChange(value)} 
                            value={name} />
                        <TextInput 
                            placeholder='Contraseña' 
                            placeholderTextColor="gray"
                            style={loginStyle.textInput}
                            onChangeText={(value) => handlePasswordChange(value)} 
                            secureTextEntry={true}
                            value={password} />
                        <View style={loginStyle.formButton}>
                            <Pressable onPress={handleLogin}>
                                <Text style={loginStyle.buttonText}>LOG IN</Text>
                            </Pressable>
                        </View>
                    </View> :
                    <View style={loginStyle.textContainer}>
                        <Text style={loginStyle.titleText}>Creadores:</Text>
                        <Text style={loginStyle.normalText}>Elvira - Ángela</Text>
                        <Text style={loginStyle.normalText}>Axel - Juan</Text>
                        <Text style={loginStyle.normalText}>Ángel</Text>
                    </View>
                    }
                    
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default Login