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
                "Alert Title",
                "Meeting Created"
                [
                  { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
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
                placeholderTextColor={"#8644fa"}
                value={meetingName}
                onChangeText={text => setMeetingName(text)}
                style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                placeholder="Meeting Type"
                placeholderTextColor={"#8644fa"}
                value={meetingType}
                onChangeText={text => setMeetingType(text)}
                style={styles.input}
                />
            </View>
            {myDate?(
                <>
                    <View style={styles.inputContainer}>
                        <TextInput
                        placeholder="Set Date"
                        placeholderTextColor={"#8644fa"}
                        value={myDate}
                        onChangeText={text => setMyDate(text)}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                        placeholder="Set Time"
                        placeholderTextColor={"#8644fa"}
                        value={time}
                        onChangeText={text => setTime(text)}
                        style={styles.input}
                        />
                    </View>
                </>
            ):<Text></Text>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={styles.buttonText}>Set Date</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimepicker}>
                    <Text style={styles.buttonText}>Set Time</Text>
                </TouchableOpacity>
            </View>

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
        backgroundColor:"#050214",
        // backgroundColor:"yellow",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        width:280,
        height:70,
        padding:20,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    inputContainer:{
        backgroundColor: 'black',
        width:280,
        height:100,
        padding:20,
    },
    inputText:{
        color:"#8644fa",
        fontSize:20
    },
    buttonText:{
        color:"#8644fa",
        fontSize:25,
        fontWeight:"bold",
        borderBottomWidth:1,
        borderColor:"#8644fa",
        marginRight:20
    },
    input:{
        fontSize:20,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#784f9d",
        color:"#8644fa"
    },
})
