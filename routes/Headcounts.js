import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import styles from '../components/styles';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Headcounts({ navigation }){
    const snap = useSnapshot(store)
    const [value, setValue] = useState(null)

    KeepState()
    return(
        <SafeAreaProvider>
            <Header_c title = "Headcounts" navigation = {navigation}/>
            <View style = {{backgroundColor: '#25292e', flex: 1, flexDirection: 'row'}}>
                
                <View style = {{flex: .5}}>
                    {FloorSelector(snap)}
                </View>

                <View style ={{flex: .5}}>
                    {IteratorBttns(value, setValue, snap)}
                </View>

            </View>
            
            <SubmitBttnfn fn = {() => {submit_floors(snap, value)}}/>
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

function FloorSelector(snap) {
    return <View style={{ flex: .7 }}>
        <FloorBttn label = "Floor 5:" floor_num ={5} data={snap}/>
        <FloorBttn label = "Floor 4:" floor_num ={4} data={snap}/>
        <FloorBttn label = "Floor 3:" floor_num ={3} data={snap}/>
        <FloorBttn label = "Floor 2:" floor_num ={2} data={snap}/>
        <FloorBttn label = "Floor 1:" floor_num ={1} data={snap}/>
    </View>;
}

function IteratorBttns(value, setValue, snap) {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
    {label: '8AM', value: '8:00AM'},
    {label: '9AM', value: '9:00AM'},
    {label: '10AM', value: '10:00AM'},
    {label: '11AM', value: '11:00AM'},
    {label: '12PM', value: '12:00PM'},
    {label: '1PM', value: '1:00PM'},
    {label: '2PM', value: '2:00PM'},
    {label: '3PM', value: '3:00PM'},
    {label: '4PM', value: '4:00PM'},
    {label: '5PM', value: '5:00PM'},
    {label: '6PM', value: '6:00PM'},
    {label: '7PM', value: '7:00PM'},
    {label: '8PM', value: '8:00PM'},
    {label: '9PM', value: '9:00PM'},
    {label: '10PM', value: '10:00PM'},
    {label: '11PM', value: '11:00PM'},
    {label: '12AM', value: '12:00AM'},
    {label: '1AM', value: '1:00AM'},
    ])
    
    return (
    <>
        
        <View style ={{flex: .2, marginHorizontal: '1%', marginBottom: '.5%', marginTop: '1%', zIndex: 2}}>
        <DropDownPicker
            placeholder = "Select a time"
            listMode = "MODAL"
            modalAnimationType="slide"
            modalTitle= "Select a time"
            theme = "DARK"
            style = {{backgroundColor: '#25292e'}}
            modalContentContainerStyle={{backgroundColor: "#25292e",}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
        </View>
    
        <TouchableOpacity 
            style={{backgroundColor: snap.color, flex: 1, marginHorizontal: '1%', marginVertical: '.5%', justifyContent: 'center', alignItems: 'center',}} 
            onPress={()=> store.floor_count[store.cur_floor - 1] += 1} 
        >
            <Image style = {{width: 100, height: 100, marginLeft: 5,}} source = {require('../assets/images/up_arrow.png')}/>
        </TouchableOpacity>
                    
        <TouchableOpacity style={{
        backgroundColor: '#333940',
        flex: .53,
        marginHorizontal: '1%',
        marginVertical: '.5%',
        marginBottom: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        }} 
        onPress={()=>{if(store.floor_count[store.cur_floor - 1] != 0){store.floor_count[store.cur_floor - 1] -= 1}}}
        > 
            <Image style = {{width: 100, height: 100, marginLeft: 5,}} source = {require('../assets/images/down_arrow.png')}/>
        </TouchableOpacity>
    </>
    )
}
  
const handleTextChange = (floor_num, newText) => {
  const parsedValue = parseInt(newText, 10);

  if (isNaN(parsedValue)) {
    store.floor_count[floor_num - 1] = 0;
  } else {
    store.floor_count[floor_num - 1] = parsedValue;
  }
};

const FloorBttn = ({ label, floor_num, data }) => {
  const handleChangeWrapper = (newText) => {
    handleTextChange(floor_num, newText , data);
  };

  return (
  <TouchableOpacity
    style={[
      styles.container,
      {
        flex: 0.2,
        backgroundColor: floor_num == data.cur_floor ? data.color : '#333940',
        margin: '1%',
        flexDirection: 'row', 
        alignItems: 'center', 
      },
    ]}
    onPress={() => store.cur_floor = floor_num}
  >
    <Text style={{ color: 'white', fontSize: 22 }}>{label}</Text>
    <TextInput
      style={{ color: 'white', fontSize: 22, marginLeft: 50 }} 
      value={data.floor_count[floor_num - 1]}
      onChangeText={handleChangeWrapper}
    />
  </TouchableOpacity>
)}

function submit_floors(snap, time){
    
    const formEle = {
        "Floor1": check(snap.floor_count[0]),
        "Floor2": check(snap.floor_count[1]),
        "Floor3": check(snap.floor_count[2]),
        "Floor4": check(snap.floor_count[3]),
        "Floor5": check(snap.floor_count[4]),
        "Time": time
    }

    function check(floor){
        if (floor == 0){
            return "0"
        }
        else return floor
    }
    console.log(formEle)
   
    const re = fetch('https://sheetdb.io/api/v1/hn07xtbdqi48h', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formEle),
    });
}

 
