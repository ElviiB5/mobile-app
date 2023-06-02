import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import ProductsList from '../Products/ProductsList';
import ServicesList from '../Services/ServicesList';
import UserList from '../Users/UsersList';
import CustomerList from '../Customers/CustomersList';
import DogsList from  '../Dogs/DogsList'
import Alerts from '../Alerts/Alerts';
import SalesList from '../Sales/SalesList';
import CreateSaleScreen from '../Sales/CreateSaleScreen';
import Lottie from 'lottie-react-native';
import StockList from '../Stock/StockList';

const Menu = (props) => {
        const [currentTab, setCurrentTab] = useState("Home");
        const [showMenu, setShowMenu] = useState(false);
        const [ userName, setUserName ] = useState(props.route.params.user.name)
        const [ userRol, setUserRol ] = useState(props.route.params.user.rol)
        const [ user, setUser ] = useState(props.route.params.user)

        const [ showHome, setShowHome ] = useState(true)
        console.log("User!!",userName)
        console.log("Rol!!",userRol)
        console.log("User!!",user)
      
        const offsetValue = useRef(new Animated.Value(0)).current;
        const scaleValue = useRef(new Animated.Value(1)).current;
        const closeButtonOffset = useRef(new Animated.Value(0)).current;

        console.log("current",currentTab)

        const renderContent = () => {
          if (currentTab === 'Productos') {
            return <ProductsList navigation={props.navigation} />;
          } else if (currentTab === 'Servicios') {
            return <ServicesList navigation={props.navigation} />;
          }else if (currentTab === 'Usuarios') {
            return <UserList navigation={props.navigation} />;
          }else if (currentTab === 'Clientes') {
            return <CustomerList navigation={props.navigation} />;
          }else if (currentTab === 'Perritos') {
            return <DogsList navigation={props.navigation} />;
          }else if (currentTab === 'Ventas') {
            return <SalesList navigation={props.navigation} />;
          }else if (currentTab === 'Alertas') {
            return <Alerts navigation={props.navigation} />;
          }else if (currentTab === 'Stock') {
            return <StockList navigation={props.navigation} />;
          }else if (currentTab === 'Nueva venta') {
            return <CreateSaleScreen navigation={props.navigation} username={userName} />;
          }
      
          return null; 
        };
      
        return (
          <SafeAreaView style={styles.container}>
      
          <View style={{ justifyContent: 'flex-start', padding: 15 }}>        
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                marginTop: 20
            }}>Hola, {userName}</Text>
            <Text style={{color: 'white'}}>Rol: {userRol}</Text>

            <View style={{ flexGrow: 1, marginTop: 50 }}>
              {
                userRol === "Recepcionista" && (
                  <>
                    {TabButton(currentTab, setCurrentTab, setShowHome, "Clientes", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Perritos", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Ventas", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Nueva venta", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Alertas", props.navigation)}
                  </>
                )
              }
              {
                userRol === "Administrador" && (
                  <>
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Usuarios", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Ventas", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Alertas", props.navigation)}
                  </>
                )
              }
              {
                userRol === "Almacenista" && (
                  <>
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Productos", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Servicios", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Alertas", props.navigation)}
                    {TabButton(currentTab, setCurrentTab, setShowHome,  "Stock", props.navigation)}
                  </>
                )
              }
            </View> 

              <View>
                <Text></Text>
                <Lottie 
                  source={require('../../assets/43901-cute-dog.json')} 
                  style={{ width: 200}}
                  autoPlay 
                  loop />
              </View>
        
            <View>
                {TabButton(currentTab, setCurrentTab, setShowHome, "LogOut", props.navigation, setUserName, setUserRol, setUser)}
            </View>

        
        </View>
    
        {
        }
    
        <Animated.View style={{
          flexGrow: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          paddingVertical: 20,
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [
            { scale: scaleValue },
            { translateX: offsetValue }
          ]
        }}>
    
          {
            // Menu Button...
          }
    
          <Animated.View style={{
            transform: [{
              translateY: closeButtonOffset
            }]
          }}>
            <TouchableOpacity onPress={() => {
              // Do Actions Here....
              // Scaling the view...
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true
              })
                .start()
    
              Animated.timing(offsetValue, {
                // YOur Random Value...
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true
              })
                .start()
    
              Animated.timing(closeButtonOffset, {
                // YOur Random Value...
                toValue: !showMenu ? -30 : 0,
                duration: 300,
                useNativeDriver: true
              })
                .start()
    
              setShowMenu(!showMenu);
            }}>
                {showMenu ? 
                    <AntDesign name="closecircle" size={24} color="black" /> : 
                    <AntDesign name="bars" size={24} color="black" />}
            </TouchableOpacity>

            {
              showHome &&  
              <View style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                            margin: 10,
                            padding: 3,
                            paddingTop: 15,
                            borderRadius: 25,
                            backgroundColor: '#F74780',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 2,
                              height: 7,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 6, }}>
                <Text style={{color:'white', 
                              fontSize: 41, 
                              fontWeight: '600'}}>¡Bienvenido, {userRol}!</Text>
                <Text style={{color: '#FA8FB1', 
                              fontSize: 35, 
                              fontStyle: 'italic', 
                              fontWeight: '600'}}>Que gusto tenerte de vuelta...</Text>
                <Text style={{color: 'white', 
                              fontSize: 30, 
                              fontWeight: '600'}}>Despliega el menú para acceder a los diferentes módulos.</Text>
                <Lottie 
                  source={require('../../assets/73716-purple-dog-walking.json')} 
                  style={{ width: 300}}
                  autoPlay 
                  loop />
              </View>             
            }
        
            {renderContent()}

          </Animated.View>
    
        </Animated.View>
    
      </SafeAreaView>
    );
}

const TabButton = (currentTab, setCurrentTab, setShowHome, title, navigation, setUserName, setUserRol, setUser) => {
  const chooseIcon = (key) => {
    let icon = '';
    switch (key) {
      case 'Clientes':
        icon = 'user';
        break;
      default:
        break;
    }
    return label
}
    return (
      <TouchableOpacity onPress={() => {
        if (title == "LogOut") {
          setUserName("")
          setUserRol("")
          setUser(null)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
          navigation.navigate('Login')
        } else {
          setCurrentTab(title)
          setShowHome(false)
        }
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15
        }}>
  
          <AntDesign name={title === "LogOut" ? "logout" : "rightcircleo"} size={24} color="white" />
  
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: currentTab == title ? "#9652B6" : "white"
          }}>{title}</Text>
  
        </View>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9652B6',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  });

export default Menu