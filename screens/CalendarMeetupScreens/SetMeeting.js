import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {auth, app} from '../../firebase';
const SetMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [myDate, setMyDate] = useState();
    const [meetingName, setMeetingName] = useState();
    const [meetingType, setMeetingType] = useState();

    const navigation = useNavigation();

    // get collection meetings
    const itemRef = app.database();

    const createMeeting = ()=>{
        if(myDate && time && meetingType && meetingName){
            // Create a new post reference with an auto-generated id
            var postListRef = app.database().ref('meetings');
            var newPostRef = postListRef.push();
            newPostRef.set({
                meetingName:meetingName,
                meetingType:meetingType,
                myDate:myDate,
                time:time
            });
            setMyDate();
            setMeetingName();
            setMeetingType();
            setTime();
            Alert.alert(
                'Heading',
                'Meeting Created',
                [{
                  text: 'OK',
                  onPress: () => navigation.goBack()
                },
                ],

              )
            // const db = getDatabase();
            // set(ref(db, 'meetings/' + meetingId), {
            //     meetingName:meetingName,
            //     meetingType:meetingType,
            //     myDate:myDate,
            //     time:time
            //   });
            // itemRef.set ({
            //     meetingName:meetingName,
            //     meetingType:meetingType,
            //     myDate:myDate,
            //     time:time
            //  });
        }
        else{
            alert("Please Fill All Required Fields");
        }
    }

    const onChange = (event, selectedValue) => {
        const currentDate = selectedValue || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        // ("0" + (tempDate.getMonth() + 1)).slice(-2)
        // ("0" + tempDate.getDate()).slice(-2)

        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getFullYear() + '-' + ("0" + (tempDate.getMonth() + 1)).slice(-2) + '-' + ("0" + tempDate.getDate()).slice(-2); 
        let fullTime = tempDate.getHours() + ':' + tempDate.getMinutes();

        setMyDate(fullDate);
        setTime(fullTime);
        console.log((fullDate));

        console.log(fullTime);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <View style={styles.updateContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Meeting Name"
                placeholderTextColor={"#c22ea3"}
                value={meetingName}
                onChangeText={text => setMeetingName(text)}
                style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Meeting Type"
                placeholderTextColor={"#c22ea3"}
                value={meetingType}
                onChangeText={text => setMeetingType(text)}
                style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Set Date"
                placeholderTextColor={"#c22ea3"}
                value={myDate}
                onChangeText={text => setMyDate(text)}
                style={styles.input}
                onFocus={showDatepicker}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Set Time"
                placeholderTextColor={"#c22ea3"}
                value={time}
                onChangeText={text => setTime(text)}
                style={styles.input}
                onFocus={showTimepicker}
                />
            </View>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={styles.buttonText}>Set Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimepicker}>
                    <Text style={styles.buttonText}>Set Time</Text>
                </TouchableOpacity>
            </View> */}

            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={createMeeting}>
                    <Text style={styles.buttonText}>Create Meeting</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SetMeeting

const styles = StyleSheet.create({
    updateContainer:{
        flex:1,
        backgroundColor:"#c22ea3",
        // backgroundColor:"yellow",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        backgroundColor: '#fff',
        width:280,
        height:70,
        justifyContent:"center",
        alignItems:"center",
    },
    inputContainer:{
        backgroundColor: '#fff',
        width:280,
        height:100,
        padding:20,
    },
    inputText:{
        color:"#c22ea3",
        fontSize:20
    },
    buttonText:{
        backgroundColor: '#c22ea3',
        borderRadius: 15,
        color:"#fff",
        fontSize:25,
        fontWeight:"bold",
        width:200,
        height:40,
        textAlign:"center"
    },
    input:{
        fontSize:20,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#784f9d",
        color:"#c22ea3"
    },
})
