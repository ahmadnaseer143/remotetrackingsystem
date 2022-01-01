import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {auth, app} from '../../firebase';

const Cale = () => {
    const [items, setItems] = useState({
        
        // i:{
        //     date:"2021-12-09",
        //     time:"12am",
        //     about:"Birthday Meeting",
        // },
        // j:{
        //     date:"2021-12-31",
        //     time:"12am",
        //     about:"Birthday Meeting",
        // },
        // k:{
        //     date:"2021-12-28",
        //     time:"12am",
        //     about:"Birthday Meeting",
        // },
    });
    const [meetings, setMeetings] = useState();
    const [clickedDay, setClickedDay] = useState();

    const navigation = useNavigation()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                onPress={() => {
                    navigation.navigate("SetMeeting");
                }}
                title="Set Meeting"
                color="black"
                />
            ),

            });
    }, [navigation]);

    // get collection meetings
    const itemRef = app.database().ref('/meetings');

    const loadItems = (day) => {
        var myArray= [];
        for(var i in items){
            if(items[i].myDate===day.dateString){
                // console.log(items[i]);
                
                myArray.push(items[i]);
                // setMeetings(items[i]);
            }
            else{
                setMeetings();
            }
            // console.log("element",myArray);
        }
        setMeetings(myArray);
        // console.log("Meetings:",meetings);

    };

    useEffect(() => {
        itemRef.on('value', (snapshot) => {
            const allObjects = snapshot.val();
            // console.log("ALL Meetings",allObjects);
            setItems(allObjects);
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
    }, [])

    //  const renderItem=(item)=> {
    //      console.log("Hello");
    //     return (
    //       <View style={[styles.item, {height: item.height}]}><Text>{item.about}</Text></View>
    //     );
    //   }

    //   const rowHasChanged=(r1, r2)=> {
    //     return r1.name !== r2.name;
    //   }

    //   const timeToString=(time)=> {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    //   }
          
    return (
        <View style={{flex:1}}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                minDate={'2020-05-10'}
                maxDate={'2030-05-30'}
                onDayPress={(day)=>{
                    setClickedDay(day.dateString);
                    setMeetings();
                    loadItems(day);
                }}
                theme={{ 
                    calendarBackground: "black", //agenda background
                    agendaKnobColor: "#fff", // knob color
                    backgroundColor: "#fff", // background color below agenda
                    agendaDayTextColor: "#fff", // day name
                    agendaDayNumColor: "#fff", // day number
                    monthTextColor: "#fff", // name in calendar
                    textDefaultColor: "red",
                    dayTextColor: "#fff", // calendar day
                    dotColor: "white", // dots
                  }}
            />
            <View style={{position:"absolute", top:150, left:100}}>
                <Text style={{alignItems:"center", textAlign:"center",paddingTop:10,fontSize:30,fontWeight:"bold"}}>
                    Meetups
                </Text>
                <Text style={{alignItems:"center", textAlign:"center",paddingTop:10,fontSize:30,fontWeight:"bold"}}>
                    {clickedDay}
                </Text>
            </View>
            {
                meetings?(
                    <View style={{flex:1, backgroundColor:"#fff"}}>
                        <ScrollView style={styles.scrollView}>
                            {meetings.map((item,index)=> {
                                // console.log(meetings);
                                return (
                                    <View key={index} style={styles.item}>
                                        <Text>{item.meetingName}</Text>
                                        <Text>{item.time}</Text>
                                    </View>
                                )
                                })
                            }
                        </ScrollView>
                    </View>
                ):(
                    <View style={styles.emptyDate}><Text style={styles.emptyDate}>No Meetings. Enjoy!</Text></View>
                    )
            }
        </View>
    )
}

export default Cale;

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        borderColor:"black",
        borderWidth:1,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
      },
      emptyDate: {
          flex:1,
          alignItems:"center",
          fontSize:30,
          fontWeight:"bold"
      },
      scrollView: {
        marginHorizontal: 20,
      },
})
