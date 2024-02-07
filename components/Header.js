import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from './styles'
import { store } from '../stores/store'
import { useSnapshot } from 'valtio'
import { Feather } from '@expo/vector-icons';


export default function Header_c({title, navigation}) {
    const snap = useSnapshot(store)
    return (
        <View style={[styles.header_bar, {flexDirection: 'row', alignItems: 'center', backgroundColor: snap.color}]}>
            <TouchableOpacity 
                style = {{flex: .05, alignItems: 'center'}}
                onPress={()=> navigation.navigate('Menu')}
            >
                <Feather name="chevron-left" color="white" size = {64}/>

            </TouchableOpacity>
            
            <Text style = {{ flex: 1, color: 'white', fontSize: 32, marginLeft: 25}}> {title} </Text>
            
            <TouchableOpacity 
                style = {{flex: .2, alignItems: 'flex-end'}}
                onPress={()=> navigation.navigate('Settings')}    
            >
                <Feather name="settings" size={42} color="white" style = {{marginLeft: 5, marginRight: 32}} />
            </TouchableOpacity>
        </View>
    )
}
