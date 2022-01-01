import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import UpdateProfile from './screens/UpdateProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from "./screens/CalendarMeetupScreens/MainScreen";
import SetMeeting from "./screens/CalendarMeetupScreens/SetMeeting";
import Meetups from "./screens/CalendarMeetupScreens/Meetups";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreenn() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Calendar & Meetup" component={MainScreen} />
    </Drawer.Navigator>
  );
}

export default function App({navigation}) {
  return (
    // <>
    // <SetMeeting />
    // </>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false}} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="Meetups" component={Meetups}  />
        <Stack.Screen name="SetMeeting" component={SetMeeting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
