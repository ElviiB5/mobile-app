import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import ListTable from '../../commonComponents/ListTable';
import { getUsers } from '../../database/actions/UserActions';
import CreateUserScreen from './CreateUserScreen';

const UserList = (props) => {
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        async function fetchUsers() {
          await getUsers(setUsers);
        }
        fetchUsers();
    }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 32, 
                            marginTop: 2, 
                            color:'#9652B6', 
                            fontSize: 41, 
                            fontWeight: '600'}}>Usuarios</Text>
            <CreateUserScreen />

            <View style={{
                marginTop: 20,
                borderBottomColor: '#F74780',
                borderBottomWidth: 2}}></View>

            <Text style={{ fontSize: 22, marginTop: 15 }}>Usuarios existentes</Text>
            <ListTable content={users} navigation={props.navigation} type="users"/>
        </ScrollView>
    )
}

export default UserList;