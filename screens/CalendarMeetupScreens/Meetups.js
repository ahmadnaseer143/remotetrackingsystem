import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {auth, app} from '../../firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
const today = new Date();
const todayDate = today.getFullYear() + "-" + today.getMonth()+1 + "-" + today.getDate();
// console.log("Hello",todayDate);
const Meetups = () => {
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
    const [clickedDay, setClickedDay] = useState(new Date().toDateString());

    const navigation = useNavigation()

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("SetMeeting")
                }} style={styles.button}>
                  <Text style={styles.buttonText}>Set Meeting</Text>
                </TouchableOpacity>
            ),

            });
    }, [navigation]);

    // get collection meetings
    const itemRef = app.database().ref('/meetings');


    const handleDelete = (item)=>{
        var eventContactsRef = app.database().ref('/meetings');
        var query = eventContactsRef.orderByChild('meetingName').equalTo(item.meetingName);
        query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
        })
    }

    const loadItems = (day) => {
        // console.log("My Day is:", day.dateString);
        var myArray= [];
        for(var i in items){
            if(items[i].myDate===day.dateString){
                // console.log(items[i]);
                
                myArray.push(items[i]);
                // setMeetings(items[i]);
            }
            // else{
            //     setMeetings();
            // }
            // // console.log("element",myArray);
        }
        setMeetings(myArray);
        // console.log("Meetings:",meetings);

    };

    useEffect(() => {
        itemRef.on('value', (snapshot) => {
            const allObjects = snapshot.val();
            // console.log("ALL Meetings",allObjects);
            setItems(allObjects);
            loadItems(todayDate);
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
        <View style={{flex:1, zIndex:1}}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                minDate={'2020-05-10'}
                maxDate={'2030-05-30'}
                onDayPress={(day)=>{
                    // console.log(day);
                    // console.log("My Day is part:", day.dateString);
                    setClickedDay(day.dateString);
                    loadItems(day);
                }}
                theme={{ 
                    calendarBackground: "#c22ea3", //agenda background
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
            {
                meetings?(
                    <View style={{flex:1, backgroundColor:"#fff"}}>
                        <View>
                            <Text style={{alignItems:"center", textAlign:"center",paddingTop:10,fontSize:25,}}>
                                {clickedDay}
                            </Text>
                        </View>
                        <ScrollView style={styles.scrollView}>
                            {meetings.map((item,index)=> {
                                // console.log(meetings);
                                return (
                                    <View key={index} style={styles.item}>
                                        <Text>{item.meetingName}</Text>
                                        <Text>{item.time}</Text>
                                        <TouchableOpacity onPress={()=>{
                                            handleDelete(item);
                                            }} >
                                            {/* <Text style={{color:"white", fontSize:20}}>Delete</Text> */}
                                            <Icon name="delete-outline" size={25} color="#c22ea3"  />
                                        </TouchableOpacity>
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

export default Meetups;

const styles = StyleSheet.create({
    item: {
        flexDirection:"row",
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop:10,
        borderColor:"black",
        borderWidth:1,
        justifyContent:"space-between",
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
      button: {
        backgroundColor: '#c22ea3',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
      },
})
