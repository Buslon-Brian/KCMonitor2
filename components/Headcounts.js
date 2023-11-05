import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from './styles';

export default function Headcounts({ navigation }){
    let num = 30
    let user = "Brian"
    const snap = useSnapshot(store)

    KeepState()

    return(
        <SafeAreaProvider>
            
            {Header}
            <View style = {{backgroundColor: '#25292e', flex: 1, flexDirection: 'row'}}>
                
                <View style = {{flex: .5}}>
                    {FloorSelector(snap)}
                </View>

                <View style ={{flex: .5}}>
                    {IteratorBttns()}
                </View>

            </View>
            {TempBackBttn(navigation)}
    
           
        </SafeAreaProvider>
    );
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

const Header = <View style={[styles.header_bar, { alignItems: 'flex-start' }]}>
    <Text style={{ color: 'white', fontSize: 32, marginLeft: "3%" }}> Headcounts </Text>
</View>;

function FloorSelector(snap) {
    return <View style={{ flex: .7 }}>
        <FloorBttn label = "Floor 5:" floor_num ={5} data={snap}/>
        <FloorBttn label = "Floor 4:" floor_num ={4} data={snap}/>
        <FloorBttn label = "Floor 3:" floor_num ={3} data={snap}/>
        <FloorBttn label = "Floor 2:" floor_num ={2} data={snap}/>
        <FloorBttn label = "Floor 1:" floor_num ={1} data={snap}/>
    </View>;
}

function IteratorBttns() {
      return (<>
    <View style={{
    backgroundColor: '#333940',
    flex: .25,
    marginHorizontal: '1%',
    marginTop: '1%',
    marginBottom: '.5%'}}>
    </View>
    
    <TouchableOpacity style={{
    backgroundColor: '#041e42',
    flex: 1,
    marginHorizontal: '1%',
    marginVertical: '.5%'
    }} onPress={()=> store.floor_count[store.cur_floor - 1] += 1} 
    />
                    
    <TouchableOpacity style={{
    backgroundColor: '#333940',
    flex: .53,
    marginHorizontal: '1%',
    marginVertical: '.5%',
    marginBottom: '1%'
    }} onPress={()=>{if(store.floor_count[store.cur_floor - 1] != 0){store.floor_count[store.cur_floor - 1] -= 1}}}/> 
    </>);
}
  
const FloorBttn=({
    label,
    floor_num,
    data
    }) => (
    <TouchableOpacity
    style = {[styles.container, {flex: .2, backgroundColor: floor_num == data.cur_floor? '#041e42': '#333940', margin: '1%'}]}
    onPress={()=>store.cur_floor = floor_num}
    >
        <Text style = {{color: 'white', fontSize:22}}> {label}         {data.floor_count[floor_num - 1]} </Text>
    </TouchableOpacity>
)

function SubmitBttn(user, num) {
        return <TouchableOpacity
            style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
                fetch("https://hooks.slack.com/services/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", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        "text": `${user} scanned ${num} QR Codes`
                    })
                });
            } }
        >
            <Text style={{ color: 'white', fontSize: 23 }}> Submit </Text>
        </TouchableOpacity>;
}

function TempBackBttn(navigation) {
    return <TouchableOpacity
        style={{ backgroundColor: "#333940", flex: .09, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => navigation.navigate('Menu')}
    >
    </TouchableOpacity>;
}