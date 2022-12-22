import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'

export default function UploadAvatar() {
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
  const [image, setImage] = useState('');
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");

  const  checkForCameraRollPermission=async()=>{
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
           alert('Sorry, we need camera roll permissions to make this work!');
        }else{
          console.log('Media Permissions are granted')
    }
}

useEffect(()=> {
  (async ()=>{
    const fetchData = await fetch(`https://onecard-backend.vercel.app/settings/${userId}`)
    const response = await fetchData.json()
    console.log('response ____________',response)
    if (response.user.photo){
      setImage(response.user.photo)
    } else {
      console.log('default profile picture')
    }
  })()
}, [])
useEffect(() => {
  checkForCameraRollPermission()
  }, []);

  
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
      const formData = new FormData()
      formData.append('photoFromFront', {
        //@ts-ignore
        uri: _image.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      })
      
      fetch(`https://onecard-backend.vercel.app/settings/photo/${userId}`, {
        method: 'POST',
        body: formData
      }).then((response)=> response.json())
      .then((data)=> {
        console.log(data)
      })
    }
  };
  

  return (
    <TouchableOpacity onLongPress={addImage} style={imageUploaderStyles.uploadBtn} >

            <View style={imageUploaderStyles.container}>
                
                <Image source={!!image ? {uri: image} : require('../assets/AvatarDefault.png')} style={{ width: 135, height: 135 }} onError={() => setImgSrc('../assets/AvatarDefault.png')} />
                
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
        height:135,
        width:135,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
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