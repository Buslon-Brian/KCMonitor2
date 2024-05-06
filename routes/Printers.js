import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "../components/styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';
import KeepState from '../components/KeepState';

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
    
            <SubmitBttnfn fn = {() => {submit_prnt(snap, store)}}/>
    
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
        <Text style = {[styles.text_medium, {margin: 25}]}> Scanned Printers:</Text>
        <View style={{ backgroundColor: '#333940', padding: 25, margin: 5 }}>
            <Text style = {{color: 'white'}}>You have not scanned any printers yet!</Text>
        </View>
        </View>
    }

    else {
    return <View style={{ flex: 1 }}>
        <FlatList
            data={data}
            renderItem={({ item }) => <Item prnt_code={item} />}
            keyExtractor={(item, index) => index.toString()} />
    </View>
    }
}

async function submit_prnt(snap, store) {
  fetch(process.env.EXPO_PUBLIC_PRNTOKEN, {
                  method: "POST",
                  body: JSON.stringify({
                      "text": `${snap.username} scanned ${snap.prnt_scanned.length} printers`
                  })
              });

    store.prnt_codes.push(...snap.prnt_scanned);
    store.prnt_codes = snap.prnt_codes.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    store.prnt_scanned = []
    
    
    const res = await fetch(process.env.EXPO_PUBLIC_SHEETSURL,{
        method: "POST",
    
        body: JSON.stringify({
            'scriptfn': 'post_printers',
            'datatags': snap.prnt_datatag
    })
    })
  
    console.log(await res.text())
    store.prnt_datatag = []
}
