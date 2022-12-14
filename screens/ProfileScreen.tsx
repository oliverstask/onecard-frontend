import AppBar from '../components/AppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView,} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import ToggleSwitch from 'toggle-switch-react-native'
import { FunctionSetInputValue } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { useSelector } from 'react-redux';

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

                
                 <CustomInput isRequired name='' color='' icon='' value='' placeholder='Fisrt name' onChange={(value) => setFirstName(value)} />
                 <CustomInput isRequired name='' color='' icon='' value='' placeholder='Last name' onChange={(value) => setLastName(value)} />
                 <CustomInput isRequired name='' color='' icon='' value='' placeholder='Email' onChange={(value) => setEmail(value)} />

               </View>

              <View>
                      <Text style={styles.title}>Add to profile</Text>
              </View>

        <View >
              <View style={styles.profile}>

              <CustomInput name='' color='' icon='' value='' placeholder='Phone' onChange={(value) => setPhone(value)} />
              <CustomInput name='' color='' icon='' value='' placeholder='Company name' onChange={(value) => setCompanyName(value)} />
              <CustomInput name='' color='' icon='' value='' placeholder='Adress' onChange={(value) => setAdress(value)} />
              <CustomInput name='' color='' icon='' value='' placeholder='LikedIn' onChange={(value) => setLinkedin(value)} />
              <CustomInput name='' color='' icon='' value='' placeholder='Website' onChange={(value) => setWebsite(value)} />
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
        <CustomInput name='' color='' icon='' value='' isCustom placeholder='Website' onChange={(value) => setWebsite(value)} onDelete={handleDeleteCustomItem} />
 
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

