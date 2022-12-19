import {  StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as RootNavigation from '../utils/RootNavigation'
import { MaterialIcons } from "@expo/vector-icons";
import AppBar from '../components/AppBar';
import UploadImage from '../components/UploadAvatar';
import UploadBanner from '../components/UploadBanner';
import { Icon, IconButton, NativeBaseProvider, Tooltip, Button, Center} from 'native-base';
import QrCard from '../components/QrCard';
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';

export default function HomeScreen() {
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)

  const [qrList, setQrList] = useState([])
  
  useEffect(()=> {
    (async()=> {
    const fetchData = await fetch(`https://onecard-backend.vercel.app/qrs/user/${userId}`)
    const response = await fetchData.json()
    // console.log(userId)
    setQrList(response.qrList)
  })()
  },[])
  
  const list = qrList.map((data: any,i)=> {
    return <QrCard qrName={data.qrName} qrId={data._id} key={i} />
  })
 return (
  <ScrollView>
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

          {list}
        </View>
        <Pressable 
        style={{marginTop: 300, alignItems: 'center'}}
        onPress={()=> RootNavigation.navigate('Details', {qrId: '63a042da2b185ed67060d0ea'})}>
          <Text>Test dynamic page</Text>
          </Pressable>
    </NativeBaseProvider>
  </ScrollView>
    
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
      // justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50
    }
})