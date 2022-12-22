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
        
        if (strings !== 'photo' && strings !== 'cover'){
            return (<View key={i}>
                <Text style={styles.profileField} >{keyName} :</Text>
                <Text style={styles.profileInfos} >{e[keyName]}</Text>
    
            </View>)
        }
        
    })
 
  return (
    <ScrollView>
        
        <View style={styles.banner}>
           
            {coverSrc && <Image 
            //@ts-ignore
                source={{uri: coverSrc, width:'100%',height:200 }} 
                style={styles.banner}
            /> }
            { photoSrc && <Image 
            //@ts-ignore
                source={{uri: photoSrc, width:150, height:150 }} 
                style={styles.photo}
            /> }
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
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photo: {
        borderRadius: 500,
        top: -77,
        left: 70,
        // left: 50
       
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePage: {
        top: -110
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