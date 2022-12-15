import AppBar from '../components/AppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView,} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import ToggleSwitch from 'toggle-switch-react-native'
import { FunctionSetInputValue } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateFisrtName, updateLastName, updateEmail, updatePhone,  updateCompanyName, updateAdress,  updateLinkedin, updateWebsite, UserState} from "../reducers/user"
 

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
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    
    const dispatch = useDispatch();
    const user = useSelector<{user:UserState}, UserState>((state) => state.user);
      
    const customData:any[] = []
//     const customData: any = useSelector(state, "ProfileInputs")

    const deleteCustom = (name:string) => {
// ecrire fonction delete ici
    }

    const customDisplay = customData.map((e:any) => <CustomInput name={e.name} color={e.color} icon={e.icon} value={e.value} isCustom onDelete={handleDeleteCustomItem} />)

    const handleDeleteCustomItem = (name:string) => {
       // Gérer l'effacement
       // useDispatch(deleteCustomItem(name))
    }

    const handlePhoneChange = (value:string) => {
        setPhone(value)
        dispatch(updatePhone(value))
    } 

    const handleCompanyNameChange = (value:string) => {
        setCompanyName(value)
        dispatch(updateCompanyName(value))
    }
    
    const handleAdressChange = (value:string) => {
        setAdress(value)
        dispatch(updateAdress(value))
    }

    const handleLinkedinChange = (value:string) => {
        setLinkedin(value)
        dispatch(updateLinkedin(value))
    }

    const handleWebsite = (value:string) => {
        setWebsite(value)
        dispatch(updateWebsite(value))
    }

return (
     <>
     <AppBar screenName='Profile' />
       <SafeAreaView>
        <ScrollView>
        <NativeBaseProvider >
           <View>
              <Text style={styles.title}>Required infos</Text>
           </View>
               <View style={styles.profile}>

                
                 <CustomInput isRequired name='' color='' icon='' value={user.firstName} placeholder='Fisrt name' onBlur={(value) => setFirstName(value)} />
                 <CustomInput isRequired name='' color='' icon='' value={user.lastName} placeholder='Last name' onBlur={(value) => setLastName(value)} />
                 <CustomInput isRequired name='' color='' icon='' value={user.email} placeholder='Email' onBlur={(value) => setEmail(value)} />

               </View>

              <View>
                      <Text style={styles.title}>Add to profile</Text>
              </View>

        <View >
              <View style={styles.profile}>

              <CustomInput name='' color='' icon='' value={user.phone ? user.phone: ''} placeholder='Phone' onBlur={(value) => handlePhoneChange(value)} />
              <CustomInput name='' color='' icon='' value={user.companyName ? user.companyName: ''} placeholder='Company name' onBlur={(value) => handleCompanyNameChange(value)} />
              <CustomInput name='' color='' icon='' value={user.adress ? user.adress: ''} placeholder='Adress' onBlur={(value) => handleAdressChange(value)} />
              <CustomInput name='' color='' icon='' value={user.linkedin ? user.linkedin: ''} placeholder='LikedIn' onBlur={(value) => handleLinkedinChange(value)} />
              <CustomInput name='' color='' icon='' value={user.website ? user.website: ''} placeholder='Website' onBlur={(value) => handleWebsite (value)} />
               </View>

        
       
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
        {/* <CustomInput name='' color='' icon='' value='' isCustom placeholder='Website' onBlur={(value) => setWebsite(value)} onDelete={handleDeleteCustomItem} /> */}
 
        {customDisplay}
        
        </View>
        </NativeBaseProvider>
        </ScrollView>
        
       </SafeAreaView>
       </>
)
}


const styles = StyleSheet.create({

textInput :{
    backgroundColor: "",
    width: 235,
    height: 40,
    borderRadius: 5,
    marginBottom: 15
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

   },
   required: {
       flex: 1,

   },
   profile: {
       flex: 1,
       flexDirection: 'column'

   }
})

export default ProfileScreen

