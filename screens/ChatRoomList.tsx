import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ChannelList } from 'stream-chat-expo';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AuthContext from '../context/Authentication';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { userId } = React.useContext(AuthContext);
  const filters = {
    members: {
      $in: [userId],
    },
  };
  

  const onChannelPressed = (channel) => {
    navigation.navigate("ChatRoom",{channel})
  }
  return (
    <ChannelList onSelect = {onChannelPressed} filters = {filters}/>
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
