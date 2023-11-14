import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "./styles"
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';


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
        <View style={[styles.header_bar, { alignItems: 'flex-start' }]}>
            <Text style={{ color: 'white', fontSize: 32, marginLeft: "3%" }}> Property Rounds </Text>
        </View>

        <View style={{ backgroundColor: '#25292e', flex: 1, flexDirection: 'column' }}>
            {Selector(snap, setTab)}
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

