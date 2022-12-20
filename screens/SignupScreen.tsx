
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-native-modal';
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Input, Stack, Spinner } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { settingsInfos, UserState } from '../reducers/user';
import { storeUserAuthInfos, AuthState } from '../reducers/auth'
import user from '../reducers/user';
import { useRawData } from '@shopify/react-native-skia';
export default function SignupScreen({
  route, navigation,
}: NativeStackScreenProps<StackParamList, "Signup">) {
 

  const [modalVisible, setModalVisible] = useState(false);
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [show, setShow] = useState(false);
  
  const [signUpMessage, setSignUpMessage ] = useState('')
  const [signInMessage, setSignInMessage ] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
 
  const userToken = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.token)
  const userId = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
  const dispatch = useDispatch()


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
    if (userToken) {
     return navigation.navigate('TabNavigator')
    }
    return
  }, [])

  


  useEffect(()=> {
    (async()=>{
      if (googleResponse?.type === 'success'){
        const { authentication } = googleResponse
        const accessToken = authentication?.accessToken
        const user = await googleUserInfo(accessToken)
        navigation.navigate('TabNavigator')
        const fetchData = await fetch('https://onecard-backend.vercel.app/auth/socialLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify({ 
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email
          })
        })
        const data = await fetchData.json()
        dispatch(storeUserAuthInfos({token: data.token, userId: data.userId}))
        storeUserSettingsInfos(data.userId)
        }
      })()
  },[googleResponse])

  useEffect(()=> {
    (async()=> {
      if (fbResponse?.type === "success") {
        const { code } = fbResponse.params
        const user = await facebookUserInfo(fbToken)
        console.log(user)
        const fetchData = await fetch('https://onecard-backend.vercel.app/auth/socialLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify({ 
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email
          })
        })
        const data = await fetchData.json()
        dispatch(storeUserAuthInfos({token: data.token, userId: data.userId}))
        storeUserSettingsInfos(data.userId)
      }
    })()
  }, [fbResponse])
   
  const storeUserSettingsInfos = async(id: string) => {
    const response = await fetch(`https://onecard-backend.vercel.app/settings/${id}`)
    const userData = await response.json()
    const { firstName, lastName, email } = userData.user
    const { phoneNumber, companyName, address, linkedin, website } = userData.user.userSettings
    dispatch(settingsInfos({firstName, lastName, email, phoneNumber, companyName, address, linkedin, website}))
    console.log(firstName, lastName, email, phoneNumber, companyName, address, linkedin, website)
  }



  const handleSignup = async () => {
    setIsLoading(true)

   
    const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //check if email is OK
    // if NOK
    // - setIsloading(false)
    // - setErrorMessage('c'est honteux !')
    // if OK, proceed!

   
      const fetchData = await fetch('https://onecard-backend.vercel.app/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          firstName: signupFirstName, 
          lastName: signupLastName, 
          email: signupEmail, 
          password: signupPassword, 
        })
      })
      const data = await fetchData.json()
      if (!EMAIL_REGEX.test(signupEmail)) {
        setIsLoading(false)
        setErrorMessage(true)
      } else if (data?.result){
          dispatch(storeUserAuthInfos({token: data.token, userId: data.userId}))
          storeUserSettingsInfos(data.userId)
          navigation.navigate('TabNavigator')
          setIsLoading(false)
        } else {
      console.log(data.message)
      setSignUpMessage(data.message)
      setIsLoading(false)
    
  }

    

  }

  const handleSignin = async () => {
    setIsLoading(true)
    const fetchData = await fetch('https://onecard-backend.vercel.app/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
		      body: JSON.stringify({ email: signinEmail, password: signinPassword })
        })
        const data = await fetchData.json()
        // console.log(data)
        if (data?.result){
          dispatch(storeUserAuthInfos({token: data.token, userId: data.userId}))
          storeUserSettingsInfos(data.userId)
          navigation.navigate('TabNavigator')
          setModalVisible(false)
          setIsLoading(false)
          
        } else {
          console.log(data.message)
          console.log(signinEmail, signinPassword)
          setSignInMessage(data.message)
          setIsLoading(false)
        }
        
  }

  const openModal = () => {
    setSignInMessage('')
    setModalVisible(true)
  }


   
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.upDiv}>
      <Image source={require('../assets/LogoPNG.png')} ></Image>
      <Text style={styles.welcome}>Welcome</Text>
    </View>
    <Stack space={4} w="100%" alignItems="center">

      <Input 
      InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="5" color="muted.400" />} 
      onChangeText={(value : string)=> setSignupFirstName(value)}
      style={styles.textInput}
      w={{
      base: "75%",
      md: "25%"
    }} placeholder="Name" backgroundColor='rgba(245,245,245,1)'/>

      <Input 
      InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="5" color="muted.400" />} 
      onChangeText={(value: string)=> setSignupLastName(value)}
      style={styles.textInput}
      w={{
      base: "75%",
      md: "25%"
    }} placeholder="Lastname" backgroundColor='rgba(245,245,245,1)'/>

      <Input 
      InputLeftElement={<Icon as={<MaterialIcons name="alternate-email" />} size={5} ml="5" color="muted.400" />} 
      onChangeText={(value: string)=> setSignupEmail(value)}
      style={styles.textInput}
      w={{
      base: "75%",
      md: "25%"
    }} placeholder="Email" backgroundColor='rgba(245,245,245,1)'/>

      <Input 
      onChangeText={(value: string)=> setSignupPassword(value)}
      style={styles.textInput}
      w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
          {errorMessage && <Text>Invalid email address</Text>}

      <Pressable 
      style={styles.button}
      onPress={() => handleSignup()}
      >

        <Text style={styles.textButton}>Sign-Up</Text>
        {isLoading && <Spinner color='white' style={{marginBottom: 6}}/>}
      </Pressable>
        {signUpMessage && <Text>{signUpMessage}</Text>}
    </Stack>
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
      onPress={() => {openModal()}}
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
          <Stack space={4} w="100%" alignItems="center">
            <Text style={styles.contentTitle}>Welcome Back!</Text>
            
            <Input 
              InputLeftElement={<Icon as={<MaterialIcons name="alternate-email" />} size={5} ml="5" color="muted.400" />} 
              onChangeText={(value: string)=> setSigninEmail(value)}
              style={styles.textInput}
              w={{
              base: "75%",
              md: "25%"
              }} 
              placeholder="Email" backgroundColor='rgba(245,245,245,1)'
              />
            
            <Input 
              onChangeText={(value: string)=> setSigninPassword(value)}
              style={styles.textInput}
              w={{
              base: "75%",
              md: "25%"
              }} 
              type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                 <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                 </Pressable>} placeholder="Password" backgroundColor='rgba(245,245,245,1)'/>
            {signInMessage && <Text>{signInMessage}</Text>}
            
            <Pressable 
      style={styles.button}
      onPress={() => handleSignin()}
      >
        <Text style={styles.textButton}>Sign-In</Text>
        {isLoading && <Spinner color='white' style={{marginBottom: 6}}/>}
      </Pressable>
      </Stack>
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
    fontFamily : 'Futura',
    fontSize: 45,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 20,
    width: 235,
    height: 40,
    backgroundColor: '#5F038A',
    borderRadius: 5,
  },
  buttonIn: {
    alignItems: 'center',
    justifyContent: 'center',
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
  width: 300,
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
  fontSize: 30,
  marginBottom: 50,
  fontFamily:'Futura'
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