import AppBar from '../components/AppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';

 function ProfileScreen() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [adress, setAdress] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [website, setWebsite] = useState('');
    const [custom, setCustom] = useState('');

    const customData: any = []

    const deleteCustom = (name:string) => {
// ecrire fonction delete ici
    }

    const customDisplay = customData.map((e:any) => <CustomInput value={e.url} name={e.name} icon={e.icon} color={e.color} enabled={false} onDelete={(name:string) => deleteCustom(name)} />)


return (
  
       <SafeAreaView>
        <AppBar screenName='Profile' />
     <Text>Home Screen</Text>
     <Button
       title="Go to Contact"
       />
        <ScrollView>
        <View>
        <Text style={styles.title}>Required infos</Text>
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
        </View>

        <View>
        <Text style={styles.title}>Add to profile</Text>
        </View>

        <View>
        <TextInput
              onChangeText={(value : string)=> setPhone(value)}
              value={phone}
              placeholder='Phone' style={styles.textInput}>
       </TextInput>

       <TextInput
              onChangeText={(value : string)=> setCompanyName(value)}
              value={companyName}
              placeholder='Company name' style={styles.textInput}>
       </TextInput>

       <TextInput
              onChangeText={(value : string)=> setAdress(value)}
              value={adress}
              placeholder='Address' style={styles.textInput}>
       </TextInput>

       <TextInput
              onChangeText={(value : string)=> setLinkedin(value)}
              value={linkedin}
              placeholder='Linkedin account' style={styles.textInput}>
       </TextInput>

       <TextInput
              onChangeText={(value : string)=> setWebsite(value)}
              value={website}
              placeholder='Website' style={styles.textInput}>
       </TextInput>
        </View>

        <View>
        <Text style={styles.title}>More</Text>
        </View> 

        <View>
       {
           // Ajouter bouton ici
       }
        </View>
        <View>
        {customDisplay}
        </View>
        </ScrollView>
        
       </SafeAreaView>
)
}


const styles = StyleSheet.create({

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

   title : {

   }
})

export default ProfileScreen

