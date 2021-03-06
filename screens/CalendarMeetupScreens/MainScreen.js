import "react-native-gesture-handler";
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Meetups from "./Meetups";
// import MyCalendar from "./MyCalendar";
// import TeamsCalendar from "./TeamsCalendar";
import SetMeeting from "./SetMeeting";

const Drawer = createDrawerNavigator();

const MainScreen = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Meetups" component={Meetups} />
            {/* <Drawer.Screen name="MyCalendar" component={MyCalendar} />
            <Drawer.Screen name="TeamsCalendar" component={TeamsCalendar} /> */}
            <Drawer.Screen name="SetMeeting" component={SetMeeting} />
        </Drawer.Navigator>
    )
}

export default MainScreen

const styles = StyleSheet.create({})
