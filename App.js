/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import InsetShadow from 'react-native-inset-shadow'

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';
import RNQRGenerator from 'rn-qr-generator';
import {getVersion} from 'react-native-device-info';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [refreshOrders, setRefreshOrders] = useState(true);

  const [ImageURI,setImageURI] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setRefreshOrders(!refreshOrders)
    }, 5000)
  }, [])

  const get_qrcode = () => {
    RNQRGenerator.generate({
      value: 'https://github.com/gevgasparyan/rn-qr-generator',
      height: 100,
      width: 100,
    })
      .then(response => {
        const { uri, width, height, base64 } = response;
        // this.setState({ imageUri: uri });
        setImageURI(uri)
        console.log("imageUri", ImageURI)
      })
      .catch(error => console.log('Cannot create QR code', error));

    // Detect QR code in image
    // RNQRGenerator.detect({
    //   uri: PATH_TO_IMAGE
    // })
    //   .then(response => {
    //     const { values } = response; // Array of detected QR code values. Empty if nothing found.
    //   })
    //   .catch(error => console.log('Cannot detect QR code in image', error));
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle, [{ padding: 20, backgroundColor: "#fff", height: "100%", width: "100%" }]}>

      {
        refreshOrders ?
          <View style={{ height: "100%", width: "100%" }}>
            <CirclesLoader />
            <TextLoader text="Loading" />
          </View>
          :
          <View style={{ height: "100%", width: "100%" }}>
            <View>
            <TextInput style={{
              paddingLeft: 20,
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderRadius: 5,
              borderColor: "red",
              shadowColor: 'red',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              elevation: 1
            }}>

            </TextInput>
            <TextInput style={{
              top: 50,
              paddingLeft: 20,

              backgroundColor: '#fff',
              borderColor: "orange",
              borderWidth: 2,
              borderRadius: 5,

              elevation: 10,
              shadowColor: 'orange',
              shadowOpacity: 4,
              shadowOffset: {
                width: 2,
                height: 2
              },
              shadowRadius: 10, // <- Radius of the shadow
            }}>

            </TextInput>
            </View>
            <View>
              <Button
                onPress={() => {
                  /* HERE WE GONE SHOW OUR FIRST MESSAGE */
                  // showMessage({
                  //   message: "Simple message",
                  //   type: "info",
                  // });

                  get_qrcode();
                }}
                title="Request Details"
                color="#841584"
              />
            </View>
<Text>version: {getVersion()}</Text>
            <View>
              <Image source={{uri:ImageURI}} style={{height:100, width:100}} />
            </View>

          </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
