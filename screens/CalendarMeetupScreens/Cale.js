import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Cale = () => {
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

    const loadItems = (day) => {
        for(var i in items){
            if(items[i].date===day.dateString){
                console.log(items[i].about);
                setMeetings(items[i])
            }
        }

    };

    const renderEmptyDate=()=> {
        return (
          <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
      }

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
        <View style={{height:"fitContent",marginTop:60}}>
            <Agenda
            items={items}
                loadItemsForMonth={loadItems}
                renderEmptyDate={renderEmptyDate}
                minDate={'2020-05-10'}
                maxDate={'2030-05-30'}
            />
            <View style={{flex:1}}>
                <Text>
                {meetings?.about}
                </Text>
            </View>
            {/* { Object.entries(meetings).map((t,k) => console.log(t[2])) } */}
        </View>
    )
}

export default Cale;

const styles = StyleSheet.create({
    item: {
        
      },
      emptyDate: {
        
      }
})
