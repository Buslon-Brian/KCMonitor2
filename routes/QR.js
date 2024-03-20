import React, { useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { BarCodeScanner, requestPermissionsAsync } from 'expo-barcode-scanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';
import KeepState from '../components/KeepState';
import moment from 'moment';

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
                let scan = JSON.stringify({
                    "date": moment().format('YYYY-MM-DD hh:mm:ss a'), 
                    "name": data
                })
                store.prop_scanned.push(scan)
            }
        }
    
        else if(snap.prnt_codes.includes(data)){
            setText(data)
            if(snap.prnt_scanned.includes(data) == false){
                let scan = JSON.stringify({
                    "date": moment().format('YYYY-MM-DD hh:mm:ss a'), 
                    "name": data
                })
                store.prnt_scanned.push(scan)
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

        </SafeAreaProvider>
    )
}

export default QR
