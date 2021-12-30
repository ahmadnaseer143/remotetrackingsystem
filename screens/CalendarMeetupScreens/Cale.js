import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const Cale = ({navigation}) => {
    const [items, setItems] = useState({
        i:{
            date:"2021-12-09",
            time:"12am",
            about:"Birthday Meeting",
        },
        j:{
            date:"2021-12-31",
            time:"12am",
            about:"Birthday Meeting",
        },
        k:{
            date:"2021-12-28",
            time:"12am",
            about:"Birthday Meeting",
        },
    });
    const [meetings, setMeetings] = useState();
    const [clickedDay, setClickedDay] = useState();

    const loadItems = (day) => {
        for(var i in items){
            if(items[i].date===day.dateString){
                // console.log(items[i].about);
                setMeetings(items[i])
            }
        }

    };

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
        <View style={{flex:1,marginTop:30}}>
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
            />
            <View style={{}}>
                <Text style={{alignItems:"center", textAlign:"center",paddingTop:10,fontSize:30,fontWeight:"bold"}}>
                    Meetups
                </Text>
                <Text style={{alignItems:"center", textAlign:"center",paddingTop:10,fontSize:30,fontWeight:"bold"}}>
                    {clickedDay}
                </Text>
            </View>
            {
                meetings?(
                    <View style={{flex:1}}>
                        <Text style={styles.item}>
                        {meetings?.about}
                        </Text>
                        <Text style={styles.item}>
                        {meetings?.about}
                        </Text>
                        <Text style={styles.item}>
                        {meetings?.about}
                        </Text>
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
      }
})
