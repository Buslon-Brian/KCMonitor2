import {View, Text, TouchableOpacity, Image} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';

export default function Settings({ navigation }){
       return (
        <SafeAreaProvider>
            <View style = {styles.container}>



            </View>
        </SafeAreaProvider>
       )

}