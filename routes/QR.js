import React, { useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { BarCodeScanner, requestPermissionsAsync } from 'expo-barcode-scanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../components/styles';
import Header_c from '../components/Header';

function QR({ navigation }){
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [text, setText] = useState('Not yet scanned')
    const snap = useSnapshot(store)

    KeepState() 

    //define request
    const askForCameraPermission = () => {
        (async() =>{
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status == 'granted')
        })()
    }

    //request permission
    useEffect(()=>{
        askForCameraPermission()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        if(snap.prop_codes.includes(data)){
            setText(data)
            if(snap.prop_scanned.includes(data) == false){
                store.prop_scanned.push(data)
                console.log("SCANNED")
            }
        }
    
        else if(snap.prnt_codes.includes(data)){
            setText(data)
            if(snap.prnt_scanned.includes(data) == false){
                store.prnt_scanned.push(data)
            }
        }
    
        else{
            setText(data)
        }
    }

    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text style = {{color: 'white'}}>Requesting for camera permission</Text>
        </View>)
    }

    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10, color:'white'}}>No access to camera</Text>
            <TouchableOpacity title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }

    return(
        <SafeAreaProvider>
            <Header_c title = "QR" navigation = {navigation}/>
            
            <View style ={[styles.container, {flex: .15, justifyContent: 'flex-end'}]}>
                <Text style= {{fontSize: 32, color: 'white'}}> {text} </Text>
            </View>
            
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1, backgroundColor: '#25292e'}} />
            
            <View style ={[styles.container, {flex:.2}]}></View>
            
            <View style ={[styles.container, {flex: .1, justifyContent: 'flex-end'}]}>
                <Text style= {{fontSize: 32, color: 'white'}}> Scanned {snap.prop_scanned.length}/39 Codes </Text>
            </View>

            <TouchableOpacity
                style={{ backgroundColor: "#333940", flex: .1, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Menu')}
            >
            </TouchableOpacity>
        </SafeAreaProvider>
    )
}

function KeepState() {
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(store);
          await AsyncStorage.setItem('state', jsonValue);
        } catch (e) {
          // saving error
        }
      };

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('state');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };
}

export default QR
