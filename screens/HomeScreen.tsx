import {  StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, Dimensions} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as RootNavigation from '../utils/RootNavigation'
import { MaterialIcons } from "@expo/vector-icons";
import AppBar from '../components/AppBar';
import UploadImage from '../components/UploadAvatar';
import UploadBanner from '../components/UploadBanner';
import { Icon, IconButton, NativeBaseProvider, Tooltip, Button, Center} from 'native-base';
import QrCard from '../components/QrCard';
import OtherQrs from '../components/OtherQrs';
import {QrObject, QrState} from '../reducers/qr'
import { useSelector } from 'react-redux';
import { AuthState } from '../reducers/auth';
import Carousel from "react-native-reanimated-carousel";



export default function HomeScreen() {
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
  const qrList = useSelector<{qr:QrState}>((state)=> state.qr.value)

  
      
  console.log(qrList)
      //@ts-ignore
      const copyList = [...qrList]
      const list = copyList.sort((a, b)=> {
          return a.isFav? -1 : 1;
        })
  // .map((data: any,i)=> {
    

  //   // if (i === 0){
  //   return <QrCard qrName={data.qrName} qrId={data._id} key={i} isFav={data.isFav}/>
  //   // } 
  //   // else {
  //   //   return <OtherQrs qrName={data.qrName} qrId={data._id} key={i} isFav={data.isFav}/>
  //   //   }
  // })
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
          { 
        //@ts-ignore
          qrList.length ? <Text ></Text> : <Text style={{top: 70, fontSize: 20, width: '70%', textAlign: 'center', fontFamily: 'Futura'}}>Go to profile page to generate your first QR code ..</Text>}
        <Carousel<QrObject> 
        //@ts-ignore
        data={list}
        width={Dimensions.get('window').width}
        height={(Dimensions.get('window').width * 1.33)}
          renderItem={({item}) => {
            return <QrCard qrName={item.qrName} qrId={item._id} isFav={item.isFav} numScans={item}/> 
          }} /> 
       
        </View > 
        {/* <Pressable 
        style={{marginTop: 0, alignItems: 'center', backgroundColor: 'red'}}
        onPress={()=> RootNavigation.navigate('Details', {qrId: '63a443e2af265989c64fcb42'})}>
          <Text>Test dynamic page</Text>
          </Pressable> */}
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