import React, { useState } from 'react'
import { View, Text, Modal, Pressable } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import QrCard from '../components/QrCard';

const OtherQrs = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false)
    
  return (
    <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, marginBottom: 20}}>{props.qrName}</Text>
        <Pressable onPress={()=>setModalVisible(!modalVisible)}>
            <QRCode size={200} value={`https://onecard-backend.vercel.app/qrs/qr/${props.qrId}`}/>
        </Pressable>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            presentationStyle='overFullScreen'
            onRequestClose={() => {setModalVisible(!modalVisible)}}
        >
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 70}}>

            <View style={{backgroundColor: 'white', width: '90%', borderRadius: 10}}>
                <QrCard qrName={props.qrName} qrId={props.qrId} isFav={props.isFav}/>
                <Pressable onPress={()=> setModalVisible(!modalVisible)}>
                    <Text style={{textAlign: 'center', marginBottom: 20}}>Close</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    </View>
  )
}

export default OtherQrs