
import { useRoute } from '@react-navigation/native'
import React,{useContext, useEffect, useState} from 'react'
import { View, TextInput,Pressable,StyleSheet,Text } from 'react-native'
import { Channel, MessageInput, MessageList, useChannelContext, useChatContext, useMessageContext, useMessagesContext } from 'stream-chat-react-native-core'

import { Feather } from '@expo/vector-icons';
import AuthContext from '../context/Authentication';
import CryptoJS from "crypto-js";
import Key from '../context/Key';
import customMessText from '../components/customMessText';
import { coolDownAsync } from 'expo-web-browser';



const ChatRoomScreen = () => {
    
    // const {Message} = useMessagesContext()
    const {client} = useChatContext()
    const {userId} = useContext(AuthContext)
    // const {messages} = useChannelContext()
    const [message,setMessage] = useState('')

    const [members,setMembers] = useState<object[]>([])
    const route = useRoute();
    // const {messages} = useMessageContext()
    // console.log(messages)
    // const key = members.members[0].user.keyPair
    // console.log(key)
    useEffect(()=>{
        const fetchUser = async() => {
            // const sort = {created_at: -1}
            const fetcherUsers = await channel.queryMembers({})
            setMembers(fetcherUsers)
            // const { messages } = useChannelContext()
            // console.log(messages)
            
        }
        fetchUser()
    },[])
    
    // console.log(members.members[1].user.keyPair)
    const channel = route.params?.channel
    console.log(channel)
            function makeId(length:number) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * 
                    charactersLength));
                }
       return result;
    }
    
    const encrypt = (message) => {
        const myKey = members.members[0].user.keyPair
        const yourKey = members.members[1].user.keyPair
        const key = myKey + yourKey
        
        const encryptedMess = CryptoJS.DES.encrypt(message,key).toString();
        // console.log(encryptedMess)
        // console.log(`decrypt: ${decrypted}`)
        return encryptedMess
    }
    
    const decrypt = (message) => {
        const myKey = members.members[0].user.keyPair
        const yourKey = members.members[1].user.keyPair
        const key = myKey + yourKey
        const {setKey} = useContext(Key)
        setKey(key)
        const bytes  = CryptoJS.DES.decrypt(message, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted
        
    }
    const onPress = async() => {
        
        await channel.sendMessage({
            id:`${userId}-${makeId(10)}-${makeId(4)}-${makeId(4)}-${makeId(4)}-${makeId(12)}`,
            text: encrypt(message),
        })
        setMessage('')
        // const test = await client.getMessage(`Hii1 ...`)
        // console.log(test)
    }


    if (!channel) {
        return <Text>Opps</Text>
    }

    return (
        <Channel channel = {channel} 
        >
            <MessageList />
            
            {/* <MessageInput /> */}
            <View style = {styles.root}>
                <View style = {styles.inputText}>
                    <TextInput
                        value = {message}
                        onChangeText = {setMessage} 
                        placeholder = "Message..."
                    />
                </View>
                <Pressable onPress = {onPress} style = {styles.sendButton}>
                    <Feather name="send" size={24} color="#0652DD" />
                </Pressable>
            </View>
            
        </Channel>
    )
}

const styles = StyleSheet.create({
    root:  {
        flexDirection:'row',
        width:'100%',
        padding:10,
    },
    inputText:  {
        backgroundColor:'#dcdde1',
        flex:1,
        borderRadius: 20,
        padding:5,
        paddingLeft:10,
        // marginRight: 10,
    },
    sendButton:  {
        backgroundColor: 'white',
        padding:5,
        justifyContent:'center',
        alignItems:'center',  
    },



})



export default ChatRoomScreen
