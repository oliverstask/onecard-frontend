import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { storeFavInfos } from '../reducers/qr'
import { useDispatch } from 'react-redux'
const QrCard = (props: any) => {
  const [fav, setFav] = useState(props.isFav)

  const userId = useSelector<{auth:AuthState}, string>((state)=> state.auth.value.userId)

  let starIcon
  fav ? starIcon = 'star' : starIcon = 'star-o'
  const qrId = props.qrId
 
  const dispatch = useDispatch()

  

  const handleFav = async() => {
    setFav(!fav)
    const response = await(await fetch('https://onecard-backend.vercel.app/qrs/fav', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          qrId
        })
    })).json()
    console.log(response)
    dispatch(storeFavInfos(fav))
  }

  return (
    <View style={{marginTop: 50, marginBottom: 50, alignItems: 'center', width: '100%', backgroundColor: 'white'}}>
        <Text style={{fontSize: 30, marginBottom: 20}}>{props.qrName}</Text>
        <QRCode size={300} value={`https://onecard-backend.vercel.app/qrs/qr/${props.qrId}`}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 30}}>
            <FontAwesome name={starIcon} size={35} color='#FDCC4D' onPress={()=> handleFav()}/>
            <FontAwesome name='trash-o' size={35} color='#942E40'/>
        </View>
    </View>
  )
}

export default QrCard