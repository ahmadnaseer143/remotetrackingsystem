import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()}`;
    };
    const formatTime = (date) => {
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
          const currentDate = selectedValue || new Date();
          setDate(currentDate);
        //   console.log("Date:",formatDate(date));
          console.log(formatDate(date));
        } else {
          const selectedTime = selectedValue || new Date();
          setTime(selectedTime);
        //   console.log("Time:", formatTime(time));
          console.log(formatTime(time));
        }
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
        <View>
            <View style={{marginTop:80}}>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            <View style={{marginTop:80}}>
                <Button onPress={showTimepicker} title="Show time picker!" />
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
        </View>
    )
}

export default SetMeeting

const styles = StyleSheet.create({
  });
