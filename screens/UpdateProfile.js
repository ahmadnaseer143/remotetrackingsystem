import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native'
import {auth, app} from '../firebase';

const UpdateProfile = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [designation, setDesignation] = useState();

    const navigation = useNavigation();

    // get collection users
    const itemRef = app.database().ref('/users');

    const updateUser = ()=>{
        itemRef.child(auth.currentUser?.uid).update({
            age: age,
            designation: designation,
            email: email,
            name: name,
        })
        .then(() => {
            Alert.alert(
                "Alert Title",
                "Updated Succesfully",
                [
                  { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
          })
          .catch(error => alert(error.message))
    }

    useEffect(() => {
        itemRef.on('value', (snapshot) => {
            const allObjects = snapshot.val();
            console.log(allObjects);
            for(let oneObject in allObjects){
                if(oneObject==auth.currentUser?.uid){
                    setEmail(allObjects[oneObject].email);
                    setName(allObjects[oneObject].name);
                    setAge(allObjects[oneObject].age);
                    setDesignation(allObjects[oneObject].designation);
                }
            }
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          });
    }, [])

    return (
        <View style={styles.updateContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                    placeholderTextColor={"#8644fa"}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                    placeholderTextColor={"#8644fa"}
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Age</Text>
                    <TextInput
                    placeholder="Age"
                    placeholderTextColor={"#8644fa"}
                    value={age}
                    onChangeText={text => setAge(text)}
                    style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Desgination</Text>
                    <TextInput
                    placeholder="Desgination"
                    placeholderTextColor={"#8644fa"}
                    value={designation}
                    onChangeText={text => setDesignation(text)}
                    style={styles.input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={updateUser}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    updateContainer:{
        flex:1,
        backgroundColor:"#8644fa",
        // backgroundColor:"yellow",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        backgroundColor: '#fff',
        width:280,
        height:70,
        padding:20,
        justifyContent:"center",
        alignItems:"center"
    },
    inputContainer:{
        backgroundColor: '#fff',
        width:280,
        height:100,
        padding:20,
    },
    inputText:{
        color:"#8644fa",
        fontSize:20
    },
    buttonText:{
        color:"#8644fa",
        fontSize:25,
        fontWeight:"bold",
        borderBottomWidth:1,
        borderColor:"#8644fa",
    },
    input:{
        fontSize:20,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:"#784f9d"
    },
})
