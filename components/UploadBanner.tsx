import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadBanner() {
  const [image, setImage] = useState('');
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
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