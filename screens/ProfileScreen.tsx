import AppBar from '../components/AppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView, AsyncStorage,} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import { FunctionSetInputValue } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateFisrtName, updateLastName, updateEmail, updatePhone,  updateCompanyName, updateAddress,  updateLinkedin, updateWebsite, UserState, SettingObject, ArrObject} from "../reducers/user"
 

function ProfileScreen() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState<string>('');
    const [phoneSwitch, setPhoneSwitch] = useState<boolean>(false);
    const [companyName, setCompanyName] = useState<string>('');
    const [companyNameSwitch, setCompanyNameSwitch] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [addressSwitch, setAddressSwitch] = useState<boolean>(false);
    const [linkedin, setLinkedin] = useState<string>('');
    const [linkedinSwitch, setLinkedinSwitch] = useState<boolean>(false);
    const [website, setWebsite] = useState<string>('');
    const [websiteSwitch, setWebsiteSwitch] = useState<boolean>(false);
    const [custom, setCustom] = useState<ArrObject[]>([]);
   
    const dispatch = useDispatch();
    const user = useSelector<{user:UserState}, UserState>((state) => state.user);
     console.log(user)
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

    const handleOptionnalFieldChange = (value:string, type:'phone'|'companyName'|'address'|'linkedIn'|'website') => {
        switch (type) {
            case 'address' : 
                setAddress(value)
                dispatch(updateAddress({value, switchOn:addressSwitch}))
            break;
            case 'companyName' :
                setCompanyName(value)
                dispatch(updateCompanyName({value, switchOn:companyNameSwitch}))
            break;
            case 'linkedIn' : 
                setLinkedin(value)
                dispatch(updateLinkedin({value, switchOn:linkedinSwitch}))
            break;
            case 'phone' :
                setPhone(value)
                dispatch(updatePhone({value, switchOn:phoneSwitch}))
            break;
            case 'website' :
                setWebsite(value)
                dispatch(updateWebsite({value, switchOn:websiteSwitch}))
            break;
        }
    }

    const handleOptionnalFieldSwitch = (value:boolean, type:'phone'|'companyName'|'address'|'linkedIn'|'website') => {
        switch (type) {
            case 'address' : 
                setAddressSwitch(value)
                dispatch(updateAddress({value:address, switchOn:value}))
            break;
            case 'companyName' :
                setCompanyNameSwitch(value)
                dispatch(updateCompanyName({value:companyName, switchOn:value}))
            break;
            case 'linkedIn' : 
                setLinkedinSwitch(value)
                dispatch(updateLinkedin({value:linkedin, switchOn:value}))
            break;
            case 'phone' :
                setPhoneSwitch(value)
                dispatch(updatePhone({value:phone, switchOn:value}))
            break;
            case 'website' :
                setWebsiteSwitch(value)
                dispatch(updateWebsite({value:website, switchOn:value}))
            break;
        }
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

              <CustomInput name='' color='' icon='' value={user.phone.value ? user.phone.value : ''} placeholder='Phone' onBlur={(value) => handleOptionnalFieldChange(value,'phone')} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'phone')} />
              <CustomInput name='' color='' icon='' value={user.companyName.value ? user.companyName.value: ''} placeholder='Company name' onBlur={(value) => handleOptionnalFieldChange(value,'companyName')} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'companyName')} />
              <CustomInput name='' color='' icon='' value={user.address.value ? user.address.value: ''} placeholder='Address' onBlur={(value) => handleOptionnalFieldChange(value,'address')} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'address')}/>
              <CustomInput name='' color='' icon='' value={user.linkedin.value ? user.linkedin.value: ''} placeholder='LinkedIn' onBlur={(value) => handleOptionnalFieldChange(value,'linkedIn')} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'linkedIn')} />
              <CustomInput name='' color='' icon='' value={user.website.value ? user.website.value: ''} placeholder='Website' onBlur={(value) => handleOptionnalFieldChange (value,'website')} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'website')}/>
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
         <CustomInput name='' color='' icon='' value='' isCustom placeholder='Website' onBlur={(value) => setWebsite(value)} onDelete={handleDeleteCustomItem} /> 
 
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

