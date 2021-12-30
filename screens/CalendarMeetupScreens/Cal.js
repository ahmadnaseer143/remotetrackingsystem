import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const Cal = () => {
    const [day, setDay] = useState();
    const [meetings, setMeetings] = useState([
        {
            date:"2021-12-09",
            time:"12am",
            about:"Birthday Meeting",
        },
        {
            date:"2021-12-24",
            time:"8:00pm",
            about:"Month End Meeting",
        },
        {
            date:"2021-12-31",
            time:"9 pm",
            about:"New Year Party",
        },
    ]);
    // console.log(new Date().getDate());
    // console.log(new Date().getFullYear());
    // console.log(new Date().getMonth());
    return (
        <View>
            <Calendar
            style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                height: 350,
                marginTop:70
              }}
                maxDate={'2030-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {setDay(day)}}
                // Handler which gets executed on day long press. Default = undefined
                // onDayLongPress={(day) => {console.log('selected day', day)}}
                
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                // onMonthChange={(month) => {console.log('month changed', month)}}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
                
                />
            {/* <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                // onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                onDayPress={(day) => {console.log('selected day', day)}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                horizontal={true}
            /> */}
            <View>
                <View>
                    <Text>Meetups For</Text>
                    <Text>Date goes here</Text>
                </View>
                <View>
                {/* {meetings.filter((meet)=>meet.dateString===day?(<Text>{meet.dateString}</Text>):(<Text>No Meetings Set On this date</Text>)))} */}
                {meetings.filter()}
                </View>
            </View>
        </View>
    )
}

export default Cal

const styles = StyleSheet.create({});