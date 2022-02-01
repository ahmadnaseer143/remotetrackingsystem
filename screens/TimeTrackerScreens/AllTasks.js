import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const FIREBASE_API_ENDPOINT = 'https://madproject-771de-default-rtdb.firebaseio.com/';
const AllTasks = ({navigation}) => {
    // show all tasks
    // when user clicks on a specific task then go the time tracker screen
    const [myTasks, setMyTasks] = useState();
    const [myTaskId, setmyTaskId] = useState();

    const getAllTasks = async () => {
        const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks.json`);
        const data = await response.json();
        // console.log(data);
        // setMyTasks(data)
        // console.log(Object.keys(data));
        setMyTasks(Object.values(data));
        // console.log(Object.values(data));
        // console.log(Object.entries(data));
        setmyTaskId(Object.keys(data))
    }
    
    // start working on a task
    // go to time tracker screen
    // along with the clicked task
    const handleForward = (ta,i)=>{
        // console.log(ta,i,myTaskId[i]);
        if(ta.status=="completed"){
            alert("Task Already Completed");
        }
        else{
            ta.myId = myTaskId[i];
            navigation.navigate('TimeTracker', ta);
        }

    }
    useEffect(() => {
        getAllTasks();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getAllTasks();
        });
    
        return willFocusSubscription;
    }, [])
    return (
        <ScrollView style={{ flex: 1, borderWidth:2, borderColor:"black", marginTop:40}}>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Task</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Assigned To</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Status</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Due Date</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Time Spent</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Start Working</Text>
                </View>
            </View>
            <View style={{borderBottomWidth:2, borderBottomColor:"black"}}></View>
            {myTasks?.map((ta,i)=>{
                return(
                    <>
                    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                            <Text style={{fontSize:14, margin:6}}>{ta.task}</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                            <Text style={{fontSize:14, margin:6}}>{ta.assignedTo}</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                            <Text style={{fontSize:14, margin:6}}>{ta.status}</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                            <Text style={{fontSize:14, margin:6}}>{ta.dueDate}</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                            <Text style={{fontSize:14, margin:6}}>{ta.timeSpent}</Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch', borderRightWidth:2, borderRightColor:"black" }} >
                        <TouchableOpacity onPress={()=> handleForward(ta,i)} >
                            <Icon name="forward" size={25} color="black" style={{fontSize:20, margin:17}}  />
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{borderBottomWidth:2, borderBottomColor:"black"}}></View>
                    </>
                )
            })}
        </ScrollView>
    )
}

export default AllTasks

const styles = StyleSheet.create({})

// const postData = () => {
    //     var requestOptions = {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         task: 'kuch bhee Article',
    //         assignedTo: 'Sani Ahmad',
    //         status:'completed',
    //         dueDate:'12-12-2022',
    //         description:"You are safe now"
    //       }),
    //     };
    
    //     fetch(`${FIREBASE_API_ENDPOINT}/tasks.json`, requestOptions)
    //       .then((response) => response.json())
    //       .then((result) => console.log(result))
    //       .catch((error) => console.log('error', error));
    //   };
