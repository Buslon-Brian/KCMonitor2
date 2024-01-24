import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from './styles'

export default function Header_c({title, navigation}) {
    return (
        <View style={[styles.header_bar, {flexDirection: 'row', alignItems: 'center'}]}>
            <TouchableOpacity 
                style = {{flex: .05, alignItems: 'center'}}
                onPress={()=> navigation.navigate('Menu')}
            >
                <Image style = {{width: 33, height: 33, marginLeft: 5}} source = {require('../assets/images/back_arrow2.png')}/>

            </TouchableOpacity>
            
            <Text style = {{ flex: 1, color: 'white', fontSize: 32,}}> {title} </Text>
            
            <TouchableOpacity 
                style = {{flex: .2, alignItems: 'flex-end'}}
                onPress={()=> navigation.navigate('Settings')}    
            >
                <Image style = {{width: 33, height: 33, marginLeft: 5, marginRight: 15}} source = {require('../assets/images/gear.png')}/>
            </TouchableOpacity>
        </View>
    )
}
