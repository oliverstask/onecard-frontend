import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import * as RootNavigation from '../utils/RootNavigation'
import { useSelector } from 'react-redux'
import { AuthState } from '../reducers/auth'
import { latest } from 'immer/dist/internal';
import { Spinner } from 'native-base';
import { fetchUpdateAsync } from 'expo-updates';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
type IProps = {
  onScan: (event: any) => void;
  onClose: () => void;
  children: any;
};


export default function SnyBarCodeScanner(props: IProps, {
  route, navigation,
}: any) {
  
  const { onScan, onClose, children } = props;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [screen, setScreen] = useState<string>('scan');
  const [scanned, setScanned] = useState<boolean>(false);
  const [sizeQrCode, setSizeQrCode] = useState<any>({ width: 0, height: 0 });
  const lineAnim = useRef(new Animated.Value(0)).current;

  const userId = useSelector<{auth:AuthState}, string>((state)=> state.auth.value.userId)
  const lat = 'lat'
  const lon = 'lon'

  const onLineLayout = (event: any) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setSizeQrCode({ width: width, height: height });
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status }: any = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);
  

  useEffect(() => {
    handleAnimationLine();
  }, []);


  const handleAnimationLine = () => {
    lineAnim.setValue(0);
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => handleAnimationLine());
  };

  const transformLine = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeQrCode?.height],
  });

  
  const handleBarCodeScanned = async ({ type, data }: { type: any; data: any }) => {
    onScan && onScan(data);
    setScanned(true);
    const contact: any = await (await fetch(data)).json()
    const arr = contact.responseArr
    console.log(data)
    const qrId = data.replace('https://onecard-backend.vercel.app/qrs/qr/','')
    alert(`${arr[0].firstName} ${arr[1].lastName} has been added to your contact list`)
    const fetchData = await fetch('https://onecard-backend.vercel.app/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, qrId, lat, lon
        })
      })
      const response = await fetchData.json()
      console.log(response)
    return 
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.main}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

      {(screen === 'scan' && (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} 
        
        style={[styles.container]}>
          <View style={styles.layerTop}></View>
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} onLayout={onLineLayout}>
              <EdgeQRCode position="topRight" />
              <EdgeQRCode position="topLeft" />
              <Animated.View
                style={[
                  {
                    transform: [{ translateY: transformLine }],
                  },
                  styles.lineAnim,
                ]}
              />
              
              <EdgeQRCode position="bottomRight" />
              <EdgeQRCode position="bottomLeft" />
            </View>
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>
      )) ||
        (screen === 'data' && <View style={{ backgroundColor: 'white' }}>{children}</View>)}
      {/* Actions */}
      <TouchableOpacity onPress={() => RootNavigation.navigate('Home')} style={styles.close}>
        <View style={{ backgroundColor: 'rgba(0,0,0,.6)', width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 13 }}>
          <Ionicons name="ios-close" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      <View style={styles.bottomAction}>
        <TouchableOpacity onPress={() => setScanned(false)}>
          <View style={styles.bottomButtonAction}>
           
            <Text style={styles.bottomTextAction}>Scan</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const EdgeQRCode = ({ position }: { position: string }) => {
  const edgeWidth = 20;
  const edgeHeight = 20;
  const edgeColor = '#FFF'
  const edgeBorderWidth = 4;
  const edgeRadius = 0;

  const defaultStyle = {
    width: edgeWidth,
    height: edgeHeight,
    borderColor: edgeColor,
  };
  const edgeBorderStyle: any = {
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: edgeRadius,
      right: edgeRadius,
    },
    topLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: edgeRadius,
      left: edgeRadius,
    },
    bottomRight: {
      borderRightWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: edgeRadius,
      right: edgeRadius,
    },
    bottomLeft: {
      borderLeftWidth: edgeBorderWidth,
      borderBottomWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: edgeRadius,
      left: edgeRadius,
    },
  };
  return <View style={[defaultStyle, styles[position + 'Edge'], edgeBorderStyle[position]]} />;
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles: any = StyleSheet.create({
  // action
  close: { position: 'absolute', top: Constants.statusBarHeight + 20, left: 20, width: 40, height: 40 },
  bottomAction: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    position: 'absolute',
    width: deviceWidth,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomButtonAction: { alignItems: 'center', justifyContent:'center', width: deviceWidth },
  bottomTextAction: { flexDirection:'column' ,color: 'white', fontSize: 13, lineHeight: 22, fontFamily: 'Futura', marginBottom: 30, alignItems: 'center', justifyContent: 'center' },

  // layout
  main: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: deviceHeight,
    height: deviceHeight / 2,
  },

  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },

  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },

  // edge
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  lineAnim: { height: 2, backgroundColor: '#fff' },
});