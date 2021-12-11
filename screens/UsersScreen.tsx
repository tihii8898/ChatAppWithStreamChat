import { isLoading } from 'expo-font';
import React,{useState,useEffect} from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {useChatContext} from 'stream-chat-expo'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import UserListItems from '../components/UserListItems';

export default function TabTwoScreen() {
  const [users,setUsers] = useState<any[]>([])
  const {client} = useChatContext()
  const [isLoading,setIsLoading] = useState(false)


  const fetchUsers = async () => {
    setIsLoading(true)
    const response = await client.queryUsers({})
    setUsers(response.users)
    console.log(response)
    setIsLoading(false)
  }
  useEffect (()=>{
    fetchUsers()
  },[])
  return (


    <FlatList 
      data = {users} 
      renderItem = {({item}) => <UserListItems user = {item} />} 
      refreshing = {isLoading}
      onRefresh = {fetchUsers}  
    />


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
