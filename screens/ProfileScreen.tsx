import AppBar from '../components/AppBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BottomParamList, StackParamList } from '../App';
import { StyleSheet, Text, View, SafeAreaView,  TextInput, Pressable } from 'react-native';


import React, { useState, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { MaterialIcons } from "@expo/vector-icons";
import { Switch, HStack, Center, NativeBaseProvider, Divider, Box, Icon, ScrollView, Button, Modal, FormControl, Input, TextArea, } from "native-base";
import { FunctionSetInputValue } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { useSelector, useDispatch } from 'react-redux';
import { addQr, QrObject } from '../reducers/qr'

import { updateFirstName, updateLastName, updateEmail, updatePhoneNumber,  updateCompanyName, updateAddress,  updateLinkedin, updateWebsite, UserState,  ArrObject, addCustom, removeCustom} from "../reducers/user"


import { logout, AuthState } from '../reducers/auth'
import { resetSettings } from '../reducers/user'
import { url } from 'inspector';



function ProfileScreen({navigation} : NativeStackScreenProps<BottomParamList>) {
    
    
    const user = useSelector<{user:UserState}, UserState>((state) => state.user);
    
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber.value);
    const [phoneSwitch, setPhoneSwitch] = useState<boolean>(user.phoneNumber.switchOn);
    const [companyName, setCompanyName] = useState<string>(user.companyName.value);
    const [companyNameSwitch, setCompanyNameSwitch] = useState<boolean>(user.companyName.switchOn);
    const [address, setAddress] = useState<string>(user.address.value);
    const [addressSwitch, setAddressSwitch] = useState<boolean>(user.address.switchOn);
    const [linkedin, setLinkedin] = useState<string>(user.linkedin.value);
    const [linkedinSwitch, setLinkedinSwitch] = useState<boolean>(user.linkedin.switchOn);
    const [website, setWebsite] = useState<string>(user.website.value);
    const [websiteSwitch, setWebsiteSwitch] = useState<boolean>(user.website.switchOn);

    // const [custom, setCustom] = useState<ArrObject[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showQrModal, setShowQrModal] = useState(false);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [icon, setIcon] = useState('')

    const [logoutState, setLogoutState] = useState(false)
    const [qrName, setQrName] = useState('')
    const [qrMessage, setQrMessage] = useState('')

    const dispatch = useDispatch();

    const userId= useSelector<{auth:AuthState}, string>((state) => state.auth.value?.userId)
    const customData = useSelector<{ user: UserState }, ArrObject[]>((state) => state.user.customArr);
    const userToken = useSelector<{auth:AuthState}, string>((state) => state.auth.value?.token)

    useEffect(() => {
        if (!userToken) {
        
            navigation.navigate('Signup')
        }
    }, [logoutState])

    

    const fetchUpdatedData = async (
        isRequired:'required'|'userSettings',
        field:string,
        value:string | boolean
    ) => {
    
        if (isRequired === 'required'){

            const fetchData = await fetch('https://onecard-backend.vercel.app/settings/required', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId, 
                    valueToUpdate: field, 
                    newValue: value
                })
            })
            const data = await fetchData.json() 
            
        }
        if (isRequired === 'userSettings'){
            if (typeof value === "string"){
                const fetchData = await fetch('https://onecard-backend.vercel.app/settings/userSettings/value', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId, 
                        valueToUpdate: field, 
                        newValue: value
                    })
                })
                const data = await fetchData.json() 
                   
            } else {
                const fetchData = await fetch('https://onecard-backend.vercel.app/settings/userSettings/switch', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        userId, 
                        valueToUpdate: field, 
                        newValue: value
                    })
                })
                const data = await fetchData.json() 
                  
            }
        }
    }



    

    const handleDeleteCustomItem = async (value:string) => {
        console.log('PRE DELETE',value)
        dispatch(removeCustom(value))
        const fetchData = await fetch(`https://onecard-backend.vercel.app/settings/customs`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId, 
                url: value,
            })
        })


        const data = await fetchData.json()    
        console.log('POST DELETE',data)

    }

    const handleFieldChange = ( isRequired:'required'|'userSettings', type: 'firstName'|'lastName'|'email'|'phoneNumber' | 'companyName' | 'address' | 'linkedin' | 'website', value: string) => {
        switch (type) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'address':
                setAddress(value)
                dispatch(updateAddress({ value, switchOn: addressSwitch }));
                break;
            case 'companyName':
                setCompanyName(value)
                dispatch(updateCompanyName({ value, switchOn: companyNameSwitch }));
                break;
            case 'linkedin':
                setLinkedin(value)
                dispatch(updateLinkedin({ value, switchOn: linkedinSwitch }));
                break;
            case 'phoneNumber':
                setPhoneNumber(value)
                dispatch(updatePhoneNumber({ value, switchOn: phoneSwitch }));
                break;
            case 'website':
                setWebsite(value)
                dispatch(updateWebsite({ value, switchOn: websiteSwitch }));
                break;
        }
        fetchUpdatedData(isRequired, type, value)
    }

    const handleOptionnalFieldSwitch = (value: boolean, type: 'phoneNumber' | 'companyName' | 'address' | 'linkedin' | 'website') => {
        switch (type) {
            case 'address':
                setAddressSwitch(value)
                dispatch(updateAddress({ value: address, switchOn: value }))
                break;
            case 'companyName':
                setCompanyNameSwitch(value)
                dispatch(updateCompanyName({ value: companyName, switchOn: value }))
                break;
            case 'linkedin':
                setLinkedinSwitch(value)
                dispatch(updateLinkedin({ value: linkedin, switchOn: value }))
                break;
            case 'phoneNumber':
                setPhoneSwitch(value)
                dispatch(updatePhoneNumber({ value: phoneNumber, switchOn: value }))
                break;
            case 'website':
                setWebsiteSwitch(value)
                dispatch(updateWebsite({ value: website, switchOn: value }))
                break;
        }
        fetchUpdatedData('userSettings', type, value)
    }


    const handleCustom = async () => {
         dispatch(addCustom({name, icon, url, switchOn:false}))
         setShowModal(false)
        
         const fetchData = await fetch(`https://onecard-backend.vercel.app/settings/customs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId, 
                name,
                url,
                color: 'color',
                icon: 'icon',
                switchOn: false
            })
          })
          const data = await fetchData.json()    

    }   
    const fetchCustomSwitch = async (url: string, switchOn: boolean) => {
        console.log(switchOn)
        console.log(url)
        const fetchSwitch = await fetch("https://onecard-backend.vercel.app/settings/customs", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({userId, url, switchOn})
        })
        const response = await fetchSwitch.json()
        console.log(response)
    }
    

    const handleLogout = () => {
        dispatch(logout())
        dispatch(resetSettings())
        setLogoutState(!logoutState)

    }
   
    const handleGenerate = async() => {
        if (!qrName){
            return setQrMessage('Please choose a name for your new qr')
        }
        let infos: string[] = []
        Object.entries(user).forEach((e) =>{
            
            if (e[0] !== 'firstName' && e[0] !== 'lastName' && e[0] !== 'email' && e[0] && e[0] !== 'customArr'){
            //@ts-ignore  
                if (e[1].switchOn){
                    infos.push(e[0])
                }
            } else if (e[0] === 'customArr') {
                const customs  = user.customArr
            customs.forEach((e)=> {
                if (e.switchOn){
                    infos.push(e.name)
                }
             })
            }
        })
        
       const fetchQr = await fetch("https://onecard-backend.vercel.app/qrs/newQr", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({userId, infos, qrName})
        })
        const response = await fetchQr.json()
       
        console.log(response)
        dispatch(addQr(response.newQr))
        setQrName('')
        setQrMessage('')
        setShowQrModal(false)
    }

 
    const customDisplay = customData.map((e:any, i:number) => {
        
        return <CustomInput 
            key={i} 
            name={e.name} 
            color={e.color} 
            icon={e.icon} 
            value={e.url} 
            isCustom 
            isActive={e.switchOn}
            onDelete={(value) => handleDeleteCustomItem(value)} 
            onSwitch={(status)=>fetchCustomSwitch(e.url, status)}
        />
    })


return (
     <>
     <AppBar screenName='Profile' />
     <ScrollView>
       <SafeAreaView>
        
        <NativeBaseProvider >
           <View>
              <Text style={styles.title}>Required infos</Text>
           </View>
           <Divider my={3} width='88%' backgroundColor='#788F99' />
               <View style={styles.profileR}>
                
                
                 <CustomInput isRequired name='' color='' icon='' value={user.firstName} placeholder='Fisrt name' onBlur={(value) => handleFieldChange('required','firstName', value )} />
                 <CustomInput isRequired name='' color='' icon='' value={user.lastName} placeholder='Last name' onBlur={(value) => handleFieldChange('required', 'lastName', value)} />
                 <CustomInput isRequired name='' color='' icon='' value={user.email} placeholder='Email' onBlur={(value) => handleFieldChange('required', 'email', value)} />
                
                 
      
    
               </View>

              <View>
                      <Text style={styles.title}>Add to profile</Text>
              </View>
              <Divider my={3} width='88%' backgroundColor='#788F99' />
        <View >
              <View style={styles.profile}>

              <CustomInput name='' color='' icon='' isActive={user.phoneNumber.switchOn} value={user.phoneNumber.value} placeholder='Phone' onBlur={(value) => handleFieldChange('userSettings','phoneNumber', value)} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'phoneNumber')} />
              <CustomInput name='' color='' icon='' isActive={user.companyName.switchOn} value={user.companyName.value } placeholder='Company name' onBlur={(value) => handleFieldChange('userSettings','companyName', value)} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'companyName')} />
              <CustomInput name='' color='' icon='' isActive={user.address.switchOn} value={user.address.value } placeholder='Address' onBlur={(value) => handleFieldChange('userSettings','address', value)} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'address')}/>
              <CustomInput name='' color='' icon='' isActive={user.linkedin.switchOn} value={user.linkedin.value } placeholder='LinkedIn' onBlur={(value) => handleFieldChange('userSettings','linkedin', value)} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'linkedin')} />
              <CustomInput name='' color='' icon='' isActive={user.website.switchOn} value={user.website.value } placeholder='Website' onBlur={(value) => handleFieldChange ('userSettings','website',value)} onSwitch = {(value) => handleOptionnalFieldSwitch(value,'website')}/>
               </View>

        
       
        </View>

        <View>
        <Text style={styles.title}>More</Text>
        </View> 
        <Divider my={3} width='88%' backgroundColor='#788F99' />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" >
          <Modal.CloseButton />
          <Modal.Header>Custom Infos</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Field name</FormControl.Label>
              <Input onChangeText={(value) => setName(value)}/>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Infos</FormControl.Label>
              <TextArea h={20} w="100%" maxW="300" autoCompleteType={undefined} onChangeText={(value) => setUrl(value)}/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {setShowModal(false);}} >
                Cancel
              </Button>
              <Button backgroundColor="rgba(18, 53, 67, 0.75)" onPress={() => handleCustom()}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        <HStack style={styles.stack}>
        <Pressable
      
      onPress={() => {setShowModal(true)}}
      >
        <Icon as={MaterialIcons} name="add-circle-outline" size="10" color="#123543" top='-5' left='1'>
            </Icon>
        
      </Pressable>
      <Text style={styles.addcus}>Add custom infos..</Text>
        </HStack>

        <View>
 
         {customDisplay}
        
       

        </View>
        </NativeBaseProvider>
       
        {/* <TextInput placeholder='Give your qr a name' onChange={(value)=> setQrName(value)}/> */}
        <View style={styles.generate}>
            <Pressable onPress={()=> setShowQrModal(true)} style={styles.button}>
                <Text style={styles.textButton}>Generate QR code</Text>
            </Pressable>
        </View>

        <Modal isOpen={showQrModal} onClose={() => setShowQrModal(false)}>
        <Modal.Content maxWidth="400px" >
          <Modal.CloseButton />
          <Modal.Header>Your New QR</Modal.Header>
          <Modal.Body>
          <Input placeholder='Give your Qr a name' onChangeText={(value)=> setQrName(value)} value={qrName}/>
            <Text>{qrMessage}</Text>
            <Pressable onPress={()=>handleGenerate()} style={styles.button}>
                <Text style={styles.textButton}>Generate QR code</Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
        
        <View style={styles.upDiv}>
        <Divider my={3} width='100%' backgroundColor='#788F99' />
        <Pressable onPress={()=>handleLogout()} style={styles.buttonIn}>
            <Text style={styles.textButton}>Logout</Text>
        </Pressable>
        </View>
       </SafeAreaView>
       </ScrollView>
       </>
)

}



const styles = StyleSheet.create({

    textInput: {
        backgroundColor: "",
        width: 235,
        height: 40,
        borderRadius: 5,
        marginBottom: 15
    },

    title: {
        fontFamily: 'Futura',
        fontStyle: 'normal',
        fontWeight: '200',
        fontSize: 21,
        color: '#123543',
        top: 10
    },
    required: {
        flex: 1,

    },
    profile: {
        flex: 1,
        flexDirection: 'column'

    },
    profileR: {
        flex: 1,
        flexDirection: 'column',
        left: 51

    },
    stack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
    },
    addcus: {
        fontFamily: 'Futura',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 21,
        lineHeight: 25,
        textAlign: 'center',
        color: '#123543',
        width: 188,
        height: 34,
        left: 7,

    },
    generate: {
        alignItems: 'center',
        marginBottom: 50
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
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
      },
    buttonIn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        marginTop: 20,
        width: 170,
        height: 40,
        backgroundColor:'#285D73',
        borderRadius: 5,
      },
    
    upDiv: {
    alignItems: 'center',
    bottom:'4%'
      },
    textButton: {
    color: 'white',
    fontFamily: 'Futura',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
      }
})

export default ProfileScreen
