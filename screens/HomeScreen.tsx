import {  StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import * as RootNavigation from '../utils/RootNavigation'
import { MaterialIcons } from "@expo/vector-icons";
import AppBar from '../components/AppBar';
import UploadImage from '../components/UploadAvatar';
import UploadBanner from '../components/UploadBanner';
import { Icon, IconButton, NativeBaseProvider, Tooltip, Button, Center} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
export default function HomeScreen() {
  
  const logoFromFile = require('../assets/LogoPNG.png')
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
    <View style={styles.qrContainer}>
      <QRCode
      size={300}
      value='https://onecard-backend.vercel.app/qrs/qr/639f06124413b3b4d66325ee'
      
      />
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
    },
    qrContainer: {
      width: '100%',
      height: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      top: 50
    }
})