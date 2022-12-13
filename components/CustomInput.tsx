import React from "react";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView } from 'react-native';
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function CustomInput (props:any){

    return (
        <>
        <Text>
            {props.value}
        </Text>
        <FontAwesomeIcon icon="times"/>
        </>
    )

}

export default CustomInput