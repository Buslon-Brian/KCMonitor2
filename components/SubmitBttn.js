import {Text, TouchableOpacity,} from 'react-native'

export default function SubmitBttnfn({fn}) {
    return <TouchableOpacity
    style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
    onPress={() => fn}
    >
        <Text style = {{color: 'white', fontSize: 30}}> Submit </Text>
    </TouchableOpacity>;

}