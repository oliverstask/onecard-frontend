import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'


const DetailsScreen = ({route}:any) => {
    let {qrId} = route.params
    qrId = String(qrId)
    // const qrId = '63a042da2b185ed67060d0ea'
    

    const [data, setData] = useState([])
    

    



    useEffect(()=> {
        (async()=> {
            const fetchData = await fetch(`https://onecard-backend.vercel.app/qrs/qr/${qrId}`)
            const response = await fetchData.json()
            
            setData(response?.responseArr)
        })()
    }, [])

   
    
    const infos = data.map((e,i)=> {
        const keyName:any = Object.keys(e)
        return (<View key={i}>
            <Text style={styles.profileField} >{keyName} :</Text>
            <Text style={styles.profileInfos} >{e[keyName]}</Text>

        </View>)
    })
    const imgSource = '../assets/email-svgrepo-com.svg'
  return (
    <ScrollView>
        {/* <Text>QR ID: {qrId}</Text> */}
        <View style={styles.banner}></View>
        <View style={styles.profilePage}>{infos}</View>
    </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 100,
        margin: 0,
        padding: 0,
        backgroundColor: '#0F2E3A'
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
    contactIcon: {
        borderRadius: 50,
        
        width: 100,
        height: 100
    },
    image: {
        color: 'black'
    }
})