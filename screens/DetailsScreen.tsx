import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'


const DetailsScreen = ({route}:any) => {
    let {qrId} = route.params
    qrId = String(qrId)
    // const qrId = '63a042da2b185ed67060d0ea'
    

    const [data, setData] = useState<string[]>([])
    const [photoSrc, setPhotoSrc] = useState<string>('')
    const [coverSrc, setCoverSrc] = useState<string>('')
    console.log(coverSrc, photoSrc)
    



    useEffect(()=> {
        (async()=> {
            const fetchData = await fetch(`https://onecard-backend.vercel.app/qrs/qr/${qrId}`)
            const response = await fetchData.json()
            
            setData(response.responseArr)
            setPhotoSrc(response.responseArr[3].photo)
            setCoverSrc(response.responseArr[4].cover)
        })()
    }, [])

   
    
    const infos = data.map((e,i)=> {
        const keyName:any = Object.keys(e)
        const strings = String(keyName)
        const value = e[keyName]
        
        if (strings !== 'photo' && strings !== 'cover'){
            return (<View key={i}>
                <Text style={styles.profileField} >{keyName} :</Text>
                <Text style={styles.profileInfos} >{e[keyName]}</Text>
    
            </View>)
        }
        
    })
    const imgSource = '../assets/email-svgrepo-com.svg'
  return (
    <ScrollView>
        
        <View style={styles.banner}>
            <Image source={{uri: coverSrc, width:'100%',height:200 }} /> 
            <Image source={{uri: photoSrc, width:'100%',height:200 }} /> 
        </View>
        <View style={styles.profilePage}>{infos}</View>
    </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    banner: {
        // margin: 0,
        // padding: 0,
        // position: 'absolute',
        // top: 0,
        // left: 0
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photo: {
        // borderRadius: 50,
        // position: 'absolute',
        // top: 50,
        // left: 50
       
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePage: {
        marginTop: 30
    },
    profileField: {
        fontSize: 17,
        marginLeft: 20,
        color: '#788F99'
    },
    profileInfos: {
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20,
        fontFamily: 'Futura'
    },
    
   
})