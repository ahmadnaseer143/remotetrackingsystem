import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {auth, app} from '../firebase';


// create a collection users
// const itemRef = app.database().ref('/users');

const RegisterScreen = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [designation, setDesignation] = useState()
    const [password, setPassword] = useState()

    const navigation = useNavigation();

    // store user data under users as a child node using uid as a pushkey.

    const writeUserData=(user)=> {
      app.database().ref('users/' + user.uid).set(user).catch(error => {
          console.log(error.message)
      });
    }

    const handleSignUp = () => {
      if(name && email && age && designation && password){
        // itemRef.push({name:name,email:email, age:age, password:password, desgination:designation});
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const userAuth = userCredentials.user;
            // console.log(userAuth);
            var user = {
              uid: userAuth.uid,
              email: userAuth.email,
              name: name,
              age: age,
              designation: designation,
          }
          writeUserData(user)
          })
          .catch(error => alert(error.message))
      }
      else{
        alert("Please Fill All required Fields");
      }
    }
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    return (
        <View
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={{fontSize:30, fontWeight:"bold", color:"#fff"}}>Sign Up</Text>
            <Text style={{color:"#fff", paddingTop:20}}>If you already have an account You can</Text>
            {/* Login button */}
            <TouchableOpacity
              onPress={handleLogin}
            >
              <Text style={{color:"#c10c99", fontWeight:"bold", fontSize:17}}>Login here!</Text>
            </TouchableOpacity>
    
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput
              placeholder="Enter your Email Address"
              placeholderTextColor={"#fff"}
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor={"#fff"}
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <Text style={styles.inputText}>Age</Text>
            <TextInput
              placeholder="Enter your Age"
              placeholderTextColor={"#fff"}
              value={age}
              onChangeText={text => setAge(text)}
              style={styles.input}
            />
            <Text style={styles.inputText}>Designation</Text>
            <TextInput
              placeholder="Enter your Designation"
              placeholderTextColor={"#fff"}
              value={designation}
              onChangeText={text => setDesignation(text)}
              style={styles.input}
            />
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor={"#fff"}
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding:50,
    backgroundColor:'#050214'
    },
    header:{
    marginTop:20
    },
    inputContainer: {
    paddingTop:2
    },
    inputText: {
    color:"#fff",
    paddingTop:30
    },
    input: {
    paddingVertical: 5,
    color:"white",
    fontSize:17,
    borderBottomColor:"white",
    borderBottomWidth:1
    },
    buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 35,
    },
    button: {
    backgroundColor: '#c22ea3',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    },
    buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
    },
    buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    },
    buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    },
})
