import React,{useContext, useState} from 'react'
import { View, TextInput,StyleSheet,Pressable,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useChatContext} from 'stream-chat-expo'
import AuthContext from '../context/Authentication'

const CrytoJs = require('crypto-js')

const AES = CrytoJs.AES;

const SignUpScreen = () => {
    const [username,setUsername] = useState('')
    // const [password,setPassword] = useState('')

    const {setUserId} = useContext(AuthContext)

    const {client} = useChatContext()


    function makeKey(length:number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
       }
       return result;
    }

    const connectUser = async (username:string) => {
        const keyPair = makeKey(Math.floor(Math.random() * 
        20))

        await client.connectUser({
          id: username,
          name:username,
            keyPair: keyPair,
        //   password: password,
        },
        client.devToken(username)
        )
        // console.log("Connected !")
        // create channel
  
        // const channel = client.channel('messaging','Chatroom4',
        // { name:"TiHii",})
        // await channel.watch()

        setUserId(username)
        // setPw(password)
      }

    const signUp = () => {
       connectUser(username)
    }
    return (
        <SafeAreaView style = {styles.root}>
            <Text style = {styles.title}>E2EE Chat</Text>
            <View style = {styles.inputContainer}>
                <TextInput 
                    value={username}
                    onChangeText= {setUsername}
                    placeholder = "Username" 
                    style = {styles.username}
                />
            </View>
            {/* <View style = {styles.inputContainer}>
                <TextInput
                    value = {password}
                    secureTextEntry = {true}
                    onChangeText= {setPassword} 
                    placeholder = "Password" 
                    style = {styles.password}
                />
            </View> */}
            <Pressable style = {styles.button} onPress = {signUp}>
                <Text>Sign Up</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        fontSize:30,
        fontWeight:"bold"
    },
    inputContainer:{
        width:'80%',
        padding:10,
        margin:10,
        backgroundColor:'white'
    },
    username:{
        
    },
    password:{},
    button: {
        backgroundColor:'#7C83FD',
        padding:10,
        width:'80%',
        alignItems:'center'
    },
})

export default SignUpScreen
