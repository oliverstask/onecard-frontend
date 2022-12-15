import {  StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import * as RootNavigation from '../utils/RootNavigation'
import { MaterialIcons } from "@expo/vector-icons";
import AppBar from '../components/AppBar';
import UploadImage from '../components/UploadAvatar';
import UploadBanner from '../components/UploadBanner';
import { Icon, IconButton, NativeBaseProvider, Tooltip, Button, Center} from 'native-base';

export default function HomeScreen() {
  

 return (
  
  <NativeBaseProvider>

      <View>
        <UploadBanner/>
      </View>

      <View style={styles.avatar}>
        <UploadImage />
      </View>
      <View style={styles.icon}>
    <IconButton  icon={<Icon as={MaterialIcons} name="person" size="10" color="white" top='-5'/>} onPress={() => RootNavigation.navigate('Profile')} />
    
    </View>
  </NativeBaseProvider>
    
 );
}

const styles = StyleSheet.create({
    avatar: {
      flex: 1,
      position: 'absolute',
      top: 120,
      left: 40,
      right:40
    },
    icon: {
      flex: 1,
      position: 'absolute',
      top: 60,
      right:10,
      backgroundColor: '#0F2E3A',
      borderRadius: 50,
      width: 50,
      height:50
    }
})