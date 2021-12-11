import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import Key from '../context/Key'

const customMessText = ({message}) => {
    const decrypt = (message) => {
        const {key} = useContext(Key)
        const bytes  = CryptoJS.DES.decrypt(message, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted
        
    }

    return (
        <View>
            <Text>{decrypt(message)} </Text>
        </View>
    )
}

export default customMessText
