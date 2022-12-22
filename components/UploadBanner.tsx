import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'
// import fs from 'react-native-fs'
import { Buffer } from 'buffer'

export default function UploadBanner() {
  const [image, setImage] = useState<string>('');
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
  useEffect(()=> {
    (async ()=>{
      const fetchData = await fetch(`https://onecard-backend.vercel.app/settings/${userId}`)
      const response = await fetchData.json()
      // console.log('response ____________',response)

      if (response.user.cover){
        setImage(response.user.cover)
      } else {
        console.log('default banner')
      }
    })()
  }, [])
  const addImage = async () => {
    
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16,9],
      base64: true,
      quality: 1,
    });
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      const imageData = _image.assets[0].base64
      const buffer = Buffer.from(imageData, 'base64')
      
      console.log(imageData)
      fetch(`https://onecard-backend.vercel.app/settings/cover/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'image/jpeg; charset=utf-8' },
        body: buffer
      }).then((response)=> response.json())
      .then((data)=> {
        console.log(data)
      })
    }
  };
 

  return (
    <TouchableOpacity onLongPress={addImage} style={imageUploaderStyles.uploadBtn} >
            <View style={imageUploaderStyles.container}>
                
                
                 <Image source={!!image ? {uri: image} : require('../assets/banner-default.png')} style={{ width: "100%", height: 180 }} onError={() => setImgSrc('../assets/banner-default.png')} />
                
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        
                    </View>
                    
            </View>
            </TouchableOpacity>
            
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        justifyContent: 'center',
        elevation:2,
        height:180,
        width:"100%",
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})