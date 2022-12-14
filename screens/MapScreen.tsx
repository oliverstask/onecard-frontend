import { Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';




export default function MapScreen() {

  const [currentPosition, setCurrentPosition] = useState<LatLng>();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location?.coords);
          });
      }
    })();
  }, []);


  
  return (
    <>
    <AppBar screenName='Map' />
    <View style={styles.container} >
      

      <MapView style={styles.map}>
       {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#5F038A" onPress={toggleModal}/>}
      </MapView>
    </View>
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.centeredView} >
          
          <View style={styles.modalView}>
            <Text style={styles.input}>Contact</Text> 
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    flex: 1,
    borderRadius: 20
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});