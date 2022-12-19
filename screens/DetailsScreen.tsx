import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'


const DetailsScreen = ({route}:any) => {
    const {qrId} = route.params
    const [data, setData] = useState([])
    useEffect(()=> {
        (async()=> {
            const fetchData = await fetch(`https://onecard-backend.vercel.app/qrs/qr/${qrId}`)
            const response = await fetchData.json()
            setData(response?.responseArr)
        })()
    }, [])

    console.log(qrId)
    console.log(data)
    const infos = data.map((e,i)=> {
        const key:any = Object.keys(e)
        return (
            <View>
                <Text>{key} : {e[key]}</Text>
            </View>
        )
    })
  return (
    <View>
        <Text>QR ID: {qrId}</Text>
        <View>{infos}</View>
    </View>
  )
}

export default DetailsScreen