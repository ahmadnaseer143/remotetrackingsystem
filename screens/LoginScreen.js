import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {auth} from '../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('Register')
  }

  const handleLogin = () => {
    if(email && password){
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
        })
        .catch(error => alert("Please type correct Email and Password"))
    }
    else{
      alert("Please Fill All Required Fields");
    }
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={{fontSize:30, fontWeight:"bold", color:"#fff"}}>Sign in</Text>
        <Text style={{color:"#fff", paddingTop:20}}>If you don't have an account You can</Text>
        {/* Register button */}
        <TouchableOpacity
          onPress={handleSignUp}
        >
          <Text style={{color:"#c10c99", fontWeight:"bold", fontSize:17}}>Register here!</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          placeholder="Enter your email address"
          placeholderTextColor={"#fff"}
          value={email}
          onChangeText={text => setEmail(text)}
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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50,
    backgroundColor:'#050214'
  },
  header:{
    marginTop:50
  },
  inputContainer: {
    paddingTop:15
  },
  inputText: {
    color:"#fff",
    paddingTop:55
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#c22ea3',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
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