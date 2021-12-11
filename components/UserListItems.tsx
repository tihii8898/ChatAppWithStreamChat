import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, Text,Image,StyleSheet,Pressable} from 'react-native'
import { useChatContext } from 'stream-chat-react-native-core'
import AuthContext from '../context/Authentication'

const UserListItems = ({user}) => {
    const {client} = useChatContext()
    const {userId} = useContext(AuthContext)
    const navigation = useNavigation()


    const onPress = async () => {
        if (!user.id || !userId) {
            return
        }
        const channel = client.channel("messaging" , {
            members:[user.id,userId],
        })
        await channel.watch()

        navigation.navigate("ChatRoom",{channel})
    }

    return (
        <Pressable onPress = {onPress} style = {styles.userContainer}>
            <Image 
                source = {{uri: user.image}} 
                style = {styles.image}    
            />
            <Text style = {styles.name}>{user.name}</Text>

        </Pressable>
    ) 
}

const styles = StyleSheet.create({
    userContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        margin:5
    },
    image: {
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'black',
        marginLeft:5,
    },
    name: {
        marginLeft:10,
    },

})

export default UserListItems
