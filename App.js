import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomersList from './screens/Customers/CustomersList';
import CreateCustomerScreen from './screens/Customers/CreateCustomerScreen';
import CustomerDetailScreen from './screens/Customers/CustomerDetailScreen';
import CreateDogScreen from './screens/Dogs/CreateDogScreen';
import DogsList from './screens/Dogs/DogsList'
import DogDetailScreen from './screens/Dogs/DogDetailScreen'
import ProductsList from './screens/Products/ProductsList';
import ProductDetailScreen from './screens/Products/ProductDetailScreen';
import CreateProductScreen from './screens/Products/CreateProductScreen'
import ServicesList from './screens/Services/ServicesList';
import ServiceDetailScreen from './screens/Services/ServiceDetailScreen';
import CreateServiceScreen from './screens/Services/CreateServiceScreen';
import UserList from './screens/Users/UsersList';
import UserDetailScreen from './screens/Users/UserDetailScreen';
import CreateUserScreen from './screens/Users/CreateUserScreen';
import Menu from './screens/Menu/Menu';
import Login from './screens/Login/Login';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9652B6',
        },
        headerTintColor: 'white', 
      }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='PetDog' component={Menu} />

      <Stack.Screen name='CustomersList' component={CustomersList} />
      <Stack.Screen name='CreateCustomerScreen' component={CreateCustomerScreen} />
      <Stack.Screen name='CustomerDetailScreen' component={CustomerDetailScreen} />
      
      <Stack.Screen name='ProductsList' component={ProductsList} />
      <Stack.Screen name='CreateProductScreen' component={CreateProductScreen} />
      <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} />
      
      <Stack.Screen name='ServicesList' component={ServicesList} />
      <Stack.Screen name='CreateServiceScreen' component={CreateServiceScreen} />
      <Stack.Screen name='ServiceDetailScreen' component={ServiceDetailScreen} />

      {/* ---------------------- NOT WORKING YET!!! --------------------------- */}
      <Stack.Screen name='UserList' component={UserList} />
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen} />
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen} />

      <Stack.Screen name='DogsList' component={DogsList} />
      <Stack.Screen name='CreateDogScreen' component={CreateDogScreen} />
      <Stack.Screen name='DogDetailScreen' component={DogDetailScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
