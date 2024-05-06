import { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { store } from '../stores/store';
import { Feather } from '@expo/vector-icons';
import KeepState from '../components/KeepState';
import styles from '../components/styles';
import Header_c from '../components/Header';
import SubmitBttnfn from '../components/SubmitBttn';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

export default function Headcounts({ navigation }){
    const snap = useSnapshot(store)
    const [value, setValue] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false)
    const toggleModal = () => {setModalVisible(!isModalVisible)}

    const handleOkPress = () => {
      toggleModal()
      submit_floors(snap, value)
    }
    const handleCancelPress = () => {toggleModal()}
    
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
            
            {Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress)}
            <SubmitBttnfn fn = {() => toggleModal()}/>
        </SafeAreaProvider>
    );
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
            <Feather name="chevron-up" size={124} color="white" />
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
            <Feather name="chevron-down" size={124} color="white" />
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
    <Text style={styles.text_medium}>{label}</Text>
    <TextInput
      style={[styles.text_medium, {marginLeft: 50}]} 
      value={data.floor_count[floor_num - 1].toString()}
      onChangeText={handleChangeWrapper}
    />
  </TouchableOpacity>
)}

function submit_floors(snap, value){
    
    const formEle = {
        "scriptfn": "post_count",
        "Timestamp": moment().format('L, h:mm:ss a'),
        "Hour": value,
        "Floor 1": check(snap.floor_count[0]),
        "Floor 2": check(snap.floor_count[1]),
        "Floor 3": check(snap.floor_count[2]),
        "Floor 4": check(snap.floor_count[3]),
        "Floor 5": check(snap.floor_count[4]),
        "Initials": snap.username,
    }

    function check(floor){
        if (floor == 0){
            return "0"
        }
        else return floor
    }
    console.log(formEle)
   
    postHeadcounts(formEle)
    store.floor_count = [0,0,0,0,0,0]
}

async function postHeadcounts(formEle){
  
  try{
  const res = await fetch(process.env.EXPO_PUBLIC_SHEETSURL, {
    method: "POST",
    body: JSON.stringify(formEle)
    
  })
  
    if (!res.ok) {
      throw new Error('Failed to make POST request: ' + response.status);
    }

  const output = await res.text()
  console.log(output)
  
  } 
  
  catch (error) {
    console.error('Error:', error);
    alert('An error occurred while making the POST request. Please try again later.')
  }   
} 

function Popup(isModalVisible, toggleModal, handleOkPress, handleCancelPress) {
  const snap = useSnapshot(store);
  const cur_assign = snap.cur_assign;

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ ...styles.overlay, backgroundColor: isModalVisible ? 'rgba(0, 0, 0, 0.7)' : 'transparent' }} />

        <View style={{ backgroundColor: '#25292e', width: '66%', height: '25%', margin: '100', flexDirection: 'column' }}>
          
          <View style={{ flex: 1, padding: 5 }}>
            <Text style={{ color: 'white', fontSize: 22 }}> You are about to submit:</Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 22 }}> Floor 1: {snap.floor_count[0]} | Floor 2: {snap.floor_count[1]} | Floor 3: {snap.floor_count[2]} | Floor 4: {snap.floor_count[3]} | Floor 5: {snap.floor_count[4]} | </Text>
          </View>

         
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1, color: 'white', backgroundColor: snap.color, margin: 5, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => handleOkPress()}
            >
              <Text style = {{color: 'white'}}> OK </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flex: 1, color: 'white', backgroundColor: '#333940', margin: 5, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => handleCancelPress()}
            >
              <Text style = {{color: 'white'}}> Cancel </Text>
            </TouchableOpacity>
          </View>
        
        </View>

      </View>

    </Modal>
  );
}