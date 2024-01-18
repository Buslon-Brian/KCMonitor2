import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "../components/styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import Header_c from '../components/Header';

export default function Printers ({navigation}){
    const snap = useSnapshot(store)
    data = snap.prnt_scanned
    KeepState()
    return(
        <SafeAreaProvider>
            <Header_c title = "Printers" navigation = {navigation}/>
    
            <View style={{ backgroundColor: '#25292e', flex: 1, flexDirection: 'column' }}>
                {List(data, Item)}
            </View>
    
            <TouchableOpacity
                style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Menu')}
            >
            </TouchableOpacity>
    
        </SafeAreaProvider>
        )
}

const Item = ({ prnt_code }) => (
    <View style={{ backgroundColor: '#333940', padding: 25, margin: 5 }}>
      <Text style = {{color: 'white'}}>{prnt_code}</Text>
    </View>
)

function List(data, Item) {
    if(data.length == 0){
        return <View>
        <Text style = {{color: 'white', fontSize: 25, margin: 25}}> Scanned Printers:</Text>
        <View style={{ backgroundColor: '#333940', padding: 25, margin: 5 }}>
            <Text style = {{color: 'white'}}>You have not scanned any printers yet!</Text>
        </View>
        </View>
    }

    else {
    return <View style={{ flex: 1 }}>
        <FlatList
            data={data}
            renderItem={({ item }) => <Item prop_code={item} />}
            keyExtractor={(item, index) => index.toString()} />
    </View>
    }
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