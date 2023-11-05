import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "./styles"
import { useState } from 'react';


export default function Property({navigation}){
    const [tab, setTab] = useState("scanned")
   
   
    return(
        <SafeAreaProvider>

            <View style={[styles.header_bar, { alignItems: 'flex-start' }]}>
                    <Text style={{ color: 'white', fontSize: 32, marginLeft: "3%" }}> Property Rounds </Text>
            </View>

            <View style={{ backgroundColor: '#25292e', flex: 1, flexDirection: 'column' }}>
                {Selector(setTab)}
            </View>


            <TouchableOpacity
                style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Menu')}
            >
            </TouchableOpacity>

        </SafeAreaProvider>
    )
}


function Selector(setTab) {
    return <View style={{ backgroundColor: '#25292e', flex: .15, flexDirection: 'row' }}>

        <TouchableOpacity
            style={{ backgroundColor: '#333940', flex: .5, margin: '1%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => setTab("unscanned")}
        >
            <Text style={{ color: 'white', fontSize: 25 }}> Unscanned Codes</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{ backgroundColor: '#333940', flex: .5, margin: '1%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => setTab("scanned")}
        >
            <Text style={{ color: 'white', fontSize: 25 }}> Scanned Codes</Text>
        </TouchableOpacity>
    </View>;
}

