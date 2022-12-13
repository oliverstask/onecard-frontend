
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, } from 'react-native';
import React from 'react';
import { useState } from 'react';

export default function SignupScreen({
  route, navigation,
}: NativeStackScreenProps<StackParamList, "Signup">) {
 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

      <Pressable style={styles.button}>
        <Text style={styles.textButton}>Sign-Up</Text>
      </Pressable>
    </View>
     <Button
       title="Sign-Up"
       onPress={() => navigation.navigate('TabNavigator')}
     />
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
    width: '100%',
    marginTop: 30,
    backgroundColor: '#fbe29c',
    borderRadius: 1,
  },
  textButton: {
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

 /*shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.10,
shadowRadius: 5,
fontFamily: "Inter",
fontWeight: '400',
fontSize: 12,
color: "rgba(120,143,153,1",
textAlign: "",
textAlignVertical: 'top',
letterSpacing: 0.1,
*/
},

});