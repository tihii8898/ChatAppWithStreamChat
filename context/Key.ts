import {createContext} from 'react'
import { View, Text } from 'react-native'


const Key = createContext({
    key:'',
    setKey: (newKey:string) => {}
})


export default Key
