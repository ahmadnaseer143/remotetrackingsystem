import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
const FIREBASE_API_ENDPOINT = 'https://madproject-771de-default-rtdb.firebaseio.com/';

const TimeTracker = ({ route, navigation }) => {
  const { assignedTo,description,dueDate,status, task, timeSpent,myId } = route.params;
  var timeParts = timeSpent.split(":");
  const milliseconds = (h, m, s) => ((h*60*60+m*60+s)*1000);
  const result = milliseconds(timeParts[0],timeParts[1],timeParts[2]);
    // start timer
    // pause timer option
    // when user stop timer calculate total time spent working, total breaks taken
    // total tasks completed
    const [isTimerStart, setIsTimerStart] = useState(false);
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [timerDuration, setTimerDuration] = useState(90000);
    const [resetTimer, setResetTimer] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [myStopwatchTime, setMyStopwatchTime] = useState();

    const handleStart = ()=>{
        setIsStopwatchStart(!isStopwatchStart);
        setResetStopwatch(false);
    }
    const handleCompletion = ()=>{
      Alert.alert(
        "Task Completed?",
        "Are you sure task is completed?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          { text: "OK", onPress: () => {
            updateCompletion();
          } }
        ]
      );
    }

    // update object changing status to completed
    const updateCompletion = () => {
      var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          status:"completed"
        }),
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/tasks/${myId}.json`, requestOptions)
        .then((response) => response.json())
        .then(() => navigation.goBack())
        .catch((error) => console.log('error', error));
    }
    // update the object by saving the time as well
    const updateData = () => {
      var requestOptions = {
        method: 'PATCH',
        body: JSON.stringify({
          timeSpent: myStopwatchTime
        }),
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/tasks/${myId}.json`, requestOptions)
        .then((response) => response.json())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    }
    const handleSave = ()=>{
        setIsStopwatchStart(false);
        setResetStopwatch(true);
        updateData();
    }
    return (
        <View style={styles.container}>
        <Text style={styles.title}>
          Let's Track Time
        </Text>
        <View>
          <Text style={styles.myObject}>AssignedTo: {assignedTo}</Text>
          <Text style={styles.myObject}>Status: {status}</Text>
          <Text style={styles.myObject}>Task: {task}</Text>
          <Text style={styles.myObject}>Due Date: {dueDate}</Text>
          <Text style={styles.myObject}>Description: {description}</Text>
        </View>
        <View>
          <View style={styles.sectionStyle}>
            <Stopwatch
              msecs={false}
              start={isStopwatchStart}
              // To start
              reset={resetStopwatch}
              // To reset
              options={options}
              // Options for the styling
              getTime={(time) => {
                setMyStopwatchTime(time);
              }}
              startTime={result}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}
              onPress={handleStart}>
              <Text style={styles.buttonText}>
                {!isStopwatchStart ? 'START' : 'PAUSE'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}
              onPress={handleCompletion}>
              <Text style={styles.buttonText}>
                Task Completed?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}

export default TimeTracker

const styles = StyleSheet.create({
    container: {
      padding: 10,
      marginTop:90
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 20,
    },
    myObject:{
      fontSize:17,
      padding:5
    },
    sectionStyle: {
      marginTop: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:"row"
    },
    button: {
      margin: 10,
      backgroundColor: '#0c446b',
      padding: 15,
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 17,
      color:"#fff"
    },
  });
const options = {
    container: {
      backgroundColor: '#063f68',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7,
    },
  };
