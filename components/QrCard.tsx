import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { View, Text, Pressable, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'

// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { deleteQr, changeFav, QrState, QrObject } from '../reducers/qr'
import { useDispatch } from 'react-redux'
const QrCard = (props: any) => {
  // const [fav, setFav] = useState(props.isFav)

  const userId = useSelector<{auth:AuthState}, string>((state)=> state.auth.value.userId)
  // const qr = useSelector((state)=> state.qr.value)
  const {isFav} = props
  console.log(props)
  let starIcon
  isFav ? starIcon = 'star' : starIcon = 'star-o'
  const qrId = props.qrId
 
  const dispatch = useDispatch()

  

  const handleFav = async() => {
    // dispatch(getAllQrs()
    const response = await(await fetch('https://onecard-backend.vercel.app/qrs/fav', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          qrId
        })
    })).json()
    console.log(response)
    dispatch(changeFav(qrId))
  }

  const handleDelete = async() => {
    dispatch(deleteQr(qrId))
    const fetchDelete = await fetch('https://onecard-backend.vercel.app/qrs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({qrId})
    })
    const response = await fetchDelete.json()
    console.log(response)
    
  }
  return (
    <View>
    <View style={styles.container}>
        <Text style={{fontSize: 30, marginBottom: 20, fontFamily:'Futura', textShadowColor: 'rgba(0, 0, 0, 0.2)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10}}>{props.qrName}</Text>
        <QRCode size={250} value={`https://onecard-backend.vercel.app/qrs/qr/${props.qrId}`}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 40, bottom:'4%'}}>
            <FontAwesome name={starIcon} size={35} color='#FDCC4D' onPress={()=> handleFav()}/>
            <Pressable onPress={()=> handleDelete()}>
              <FontAwesome name='trash-o' size={35} color='#942E40'/>
            </Pressable>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
container: { 
  alignItems: 'center', 
  width: '90%',
  margin:'5%',
  top:'4%', 
  backgroundColor: 'white' , 
  borderRadius:20, 
 
}
})
export default QrCard