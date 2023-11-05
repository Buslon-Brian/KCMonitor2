import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import styles from "./styles"


export default function Property({navigation}){

    return(
        <SafeAreaProvider>

            <View style={[styles.header_bar, { alignItems: 'flex-start' }]}>
                    <Text style={{ color: 'white', fontSize: 32, marginLeft: "3%" }}> Property Rounds </Text>
            </View>

            <View style = {{backgroundColor: '#25292e', flex: 1, flexDirection: 'column'}}>
                <View style = {{backgroundColor: '#333940', flex: .15, flexDirection: 'row'}}>
                    <TouchableOpacity style = {{backgroundColor: 'red', flex: .5, margin: '1%'}}></TouchableOpacity>
                    <TouchableOpacity style = {{backgroundColor: 'blue', flex: .5, margin: '1%'}}></TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
                onPress={() => navigation.navigate('Menu')}
            >
            </TouchableOpacity>

        </SafeAreaProvider>
    )
}

