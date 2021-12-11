import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState,useContext} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StreamChat} from 'stream-chat'
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,

} from "stream-chat-expo"


import AuthContext from './context/Authentication';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {Text} from 'react-native'

const API_KEY = "ey9ekcnhagx6"
const client = StreamChat.getInstance(API_KEY)

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  const [userId,setUserId] = useState('')
  const [pw,setPw] = useState('')

  const [selectedChannel,setSelectedChannel] = useState<any>(null)
  useEffect(() => {
    return () => client.disconnectUser()
  },[])

  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value ={{userId, setUserId,pw,setPw}}>
          <OverlayProvider>
            <Chat client = {client}>
              <Navigation />
            </Chat>
            {/*
              {selectedChannel ? (
                
              )
              : (

                <ChannelList onSelect = {onChannelPressed}/>
              )
              }
            </Chat>  */}
          </OverlayProvider>
              <StatusBar />
        </ AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
