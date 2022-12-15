import React from "react";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Switch, HStack, Center, NativeBaseProvider } from "native-base";
import { faTimes, height} from '@fortawesome/free-solid-svg-icons/faTimes'

type CustomInputProps = {
    isRequired?:boolean,
    isActive?:boolean,
    isCustom?:boolean,
    keyboardType?: "default" | 'numeric' | 'email-address' | "ascii-capable" | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'phone-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password',
    value:string,
    placeholder?:string,
    name:string,
    icon:string,
    color:string,
    onChange?:(value:string)=>void,
    onSwitch?:(status:boolean)=>void,
    onDelete?:(name:string)=>void,
    onBlur?:(value:string)=>void
}
     
function CustomInput ({name, color, icon,value, placeholder, keyboardType = "default" , isRequired = false, isActive = false, isCustom = false, onChange, onSwitch, onDelete, onBlur}:CustomInputProps){

    const [inputValue, setInputValue] = useState<string>(value)

    const handleSwitchToggle = (status:boolean) => {
        onSwitch && onSwitch(status)
    }

    const handleTextChange = (value:string) => {
        setInputValue(value)
        onBlur && onBlur(value)
    }
   
    const handleDelete = (name:string) => {
        onDelete && onDelete(name)
    }

    return (
        <>
        <HStack style={styles.stack}>
            { !isRequired && <Switch size="sm" onValueChange={(e) => handleSwitchToggle(e)} /> }
            {
                !isCustom &&
                    <TextInput placeholder={placeholder} value={inputValue} onChangeText={(e:any) => setInputValue(e)} onEndEditing={(e: NativeSyntheticEvent<TextInputEndEditingEventData>) => handleTextChange(e.nativeEvent.text)} keyboardType={keyboardType} style={styles.textInput}/>
            }
            { isCustom &&
                <Text>
                    {value}
                </Text>
            }
            { isCustom && 
            <Pressable onPress={()=>handleDelete(name)}>
                <FontAwesomeIcon icon={faTimes} /> 
            </Pressable>
            }
        </HStack>
        </>
    )
  };


  const styles = StyleSheet.create({
    stack: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        height:40,
        marginTop:10,
    },
    textInput :{
        backgroundColor: "white",
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
    })

export default CustomInput