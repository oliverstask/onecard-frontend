import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { View, Text } from 'react-native'
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const QrCard = (props: any) => {
  return (
    <View style={{marginTop: 50, marginBottom: 50, alignItems: 'center', width: '100%'}}>
        <Text style={{fontSize: 30, marginBottom: 20}}>{props.qrName}</Text>
        <QRCode size={300} value={`https://onecard-backend.vercel.app/qrs/qr/${props.id}`}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 30}}>
            <FontAwesome name='star' size={35} color='#FDCC4D'/>
            <FontAwesome name='trash-o' size={35} color='#942E40'/>
        </View>
    </View>
  )
}

export default QrCard