import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "../components/styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';
import KeepState from '../components/KeepState';

export default function Property({navigation}){
    const [tab, setTab] = useState("unscanned")
    const snap = useSnapshot(store)

    if(tab == "unscanned"){
        data = snap.prop_codes
    }
    else{
        data = snap.prop_scanned
    }

    KeepState()

    return(
    
    <SafeAreaProvider>
        <Header_c title = "Property Rounds" navigation = {navigation}/>

        <View style={{ backgroundColor: '#25292e', flex: 1, flexDirection: 'column' }}>
            {Selector(snap, setTab)}
            {List(data, Item)}
        </View>

        <SubmitBttnfn fn = {()=> {submit_props(snap, store)}}/>

    </SafeAreaProvider>
    )
}

function Selector(snap, setTab) {
    return <View style={{ backgroundColor: '#25292e', flex: .15, flexDirection: 'row' }}>

        <TouchableOpacity
            style={{ backgroundColor: '#333940', flex: .5, margin: '1%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => setTab("unscanned")}
        >
            <Text style={{ color: 'white', fontSize: 25 }}> Unscanned Codes ({snap.prop_codes.length - snap.prop_scanned.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{ backgroundColor: '#333940', flex: .5, margin: '1%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => setTab("scanned")}
        >
            <Text style={{ color: 'white', fontSize: 25 }}> Scanned Codes ({snap.prop_scanned.length})</Text>
        </TouchableOpacity>

    </View>;
}

const Item = ({ prop_code }) => (
    <View style={{ backgroundColor: '#333940', padding: 25, margin: 5 }}>
      <Text style = {{color: 'white'}}>{prop_code}</Text>
    </View>
)

function List(data, Item) {
    return <View style={{ flex: .85 }}>
        <FlatList
            data={data}
            renderItem={({ item }) => <Item prop_code={item} />}
            keyExtractor={(item, index) => index.toString()} />
    </View>
}

async function submit_props(snap, store) {

    fetch(process.env.EXPO_PUBLIC_SLACKTOKEN, {
        method: "POST",
        body: JSON.stringify({
            "text": `${snap.username} scanned ${snap.prop_scanned.length} QR Codes`
        })
    });

    
    store.prop_codes.push(...snap.prop_scanned);
    store.prop_codes = snap.prop_codes.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    store.prop_scanned = []
    
    
    const res = await fetch(process.env.EXPO_PUBLIC_SHEETSURL,{
        method: "POST",
    
        body: JSON.stringify({
            'scriptfn': 'post_property',
            'datatags': snap.prop_datatag
    })
    })
  
    console.log(await res.text())
    store.prop_datatag = []
    
}