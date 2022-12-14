
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from "@expo/vector-icons";
import { VStack, HStack, IconButton, Icon, NativeBaseProvider, Center, Box, StatusBar} from "native-base";

export default function SignupScreen({
  route, navigation,
}: NativeStackScreenProps<StackParamList, "Signup">) {
 

  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignin = () => {
    navigation.navigate('TabNavigator')
    setModalVisible(false)
  }

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '191632874108-c17crjeh8t75495rji8c3dasp2cfvc47.apps.googleusercontent.com',
  })
  const fbToken = 'EAAIFEpnUDJABAHzBQvUrtXfP6lbEZALMO4ZA0Bd4PRaWxgPaV89MjAoFBIBRmZBh3hBylOoHMnZCZCCogPG8k0ZAjLDE0sVHzzhywPgoS9fNtfYtQVOZCC0uhrhDjRruC8nbcWnBG7KqatgXCxs44U11eNZArfJuoTKQlsOGvHsrpWZCEyWYaXkIl50r0a9EtZAKReSD9utBogx93y1WK5j0pfZAWx5GFGtmVfd0wzgVNnJ1kiuhSWfwwqR'
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: '568527401782416',
    responseType: ResponseType.Code
  })

  const googleUserInfo = async (token: string | undefined) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  }

  const facebookUserInfo = async (token: string) => {
    const response = await fetch(
      `https://graph.facebook.com/v15.0/me?fields=email%2Cfirst_name%2Clast_name&access_token=${token}`
    );
    return await response.json()
  }
 

  useEffect(()=> {
    (async()=>{
      if (googleResponse?.type === 'success'){
        const { authentication } = googleResponse
        const accessToken = authentication?.accessToken
        const user = await googleUserInfo(accessToken)
        
      fetch('http://localhost:3000/auth/socialsignin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify({ 
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email
          })
        }).then(response => response.json())
        .then(data => {
          console.log(data)
        })
        }
      })()
  },[googleResponse])

  useEffect(()=> {
    (async()=> {
      if (fbResponse?.type === "success") {
        const { code } = fbResponse.params
        const user = await facebookUserInfo(fbToken)
        console.log(user)
        fetch('http://localhost:3000/auth/socialsignin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify({ 
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email
          })
        }).then(response => response.json())
        .then(data => {
          console.log(data)
        })
      }
    })()
  }, [fbResponse])
   
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.upDiv}>
      <Image source={require('../assets/LogoPNG.png')} ></Image>
      <Text style={styles.welcome}>Welcome</Text>
    </View>
    <View>

      <TextInput
              onChangeText={(value : string)=> setFirstName(value)}
              value={firstName}
              placeholder='FirstName' style={styles.textInput}>
      </TextInput>

      <TextInput
              onChangeText={(value: string)=> setLastName(value)}
              value={lastName}
              placeholder='LastName'>
      </TextInput>

      <TextInput 
              onChangeText={(value: string)=> setEmail(value)}
              value={email}
              placeholder='Email'>
      </TextInput>

      <TextInput
              onChangeText={(value: string)=> setPassword(value)}
              value={password}
              placeholder='Password'>
      </TextInput>

      <Pressable 
      style={styles.button}
      onPress={() => navigation.navigate('TabNavigator')}
      >

        <Text style={styles.textButton}>Sign-Up</Text>
      </Pressable>
    </View>
    <View style={styles.upDiv}>
      <Text style={styles.textalready}>or login with..</Text>
     <View style={styles.socialLogin}>
      <Pressable onPress={()=> googlePromptAsync()}>
        <FontAwesome name='google' size={35} color='#0F2E3A'/>
      </Pressable>
      <Pressable onPress={()=> fbPromptAsync()}>
        <Icon as={MaterialIcons} name="facebook" size={35} color="#0F2E3A"/>
      </Pressable>
      
     </View>
    </View>
    <View style={styles.upDiv}>
      <Text style={styles.textalready}>Already have an account ?</Text>
    <Pressable
      style={styles.buttonIn}
      onPress={() => {setModalVisible(true)}}
      >
        <Text style={styles.textButton}>Sign-In</Text>
      </Pressable>
      </View>
      <View>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Welcome Back!</Text>
            
            <TextInput
                  onChangeText={(value: string)=> setEmail}
                  value={email}
                  placeholder='Email'>
            </TextInput>

            <TextInput
                    onChangeText={(value: string)=> setPassword}
                    value={password}
                    placeholder='Password'>
            </TextInput>
           
            <Pressable 
      style={styles.button}
      onPress={() => handleSignin()}
      >
        <Text style={styles.textButton}>Sign-In</Text>
      </Pressable>
          </View>
        </Modal>
      </View>

    
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3F6',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  upDiv: {
    alignItems: 'center',
    
  },
  welcome : {
    fontFamily : 'Futura-Medium',
    fontSize: 45,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 20,
    width: 235,
    height: 40,
    backgroundColor: '#5F038A',
    borderRadius: 5,
  },
  buttonIn: {
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 20,
    width: 235,
    height: 40,
    backgroundColor:'#285D73',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  textInput :{
  backgroundColor: "rgba(245,245,245,1)",
  width: 235,
  height: 40,
  borderRadius: 5,
},
content: {
  backgroundColor: 'white',
  padding: 22,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: 17,
  borderTopLeftRadius: 17,
},
contentTitle: {
  fontSize: 20,
  marginBottom: 100,
},
contentView: {
  justifyContent: 'flex-end',
  margin: 0,

},
socialLogin: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: "25%",
  marginTop: 20,
  marginLeft: 7
},
socialContainer: {
  alignItems: 'center'
},
textalready: {
  fontSize: 14,
  color: "#788F99"
  }
});