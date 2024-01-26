import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from './styles'
import { store } from '../stores/store'
import { useSnapshot } from 'valtio'

export default function Header_c({title, navigation}) {
    const snap = useSnapshot(store)
    return (
        <View style={[styles.header_bar, {flexDirection: 'row', alignItems: 'center', backgroundColor: snap.color}]}>
            <TouchableOpacity 
                style = {{flex: .05, alignItems: 'center'}}
                onPress={()=> navigation.navigate('Menu')}
            >
                <Image style = {{width: 33, height: 33, marginLeft: 25}} source = {require('../assets/images/back_arrow2.png')}/>

            </TouchableOpacity>
            
            <Text style = {{ flex: 1, color: 'white', fontSize: 32, marginLeft: 25}}> {title} </Text>
            
            <TouchableOpacity 
                style = {{flex: .2, alignItems: 'flex-end'}}
                onPress={()=> navigation.navigate('Settings')}    
            >
                <Image style = {{width: 33, height: 33, marginLeft: 5, marginRight: 15}} source = {require('../assets/images/gear.png')}/>
            </TouchableOpacity>
        </View>
    )
}
