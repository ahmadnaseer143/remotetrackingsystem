import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Button, Touchable } from 'react-native'
import { auth, app } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  // <TouchableOpacity
  //         onPress={handleLogin}
  //         style={styles.button}
  //       >
  //         <Text style={styles.buttonText}>Login</Text>
  // </TouchableOpacity>

  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => {
            navigation.navigate("Meetups")
          }} style={styles.button}>
            <Text style={styles.buttonText}>Meetups</Text>
          </TouchableOpacity>
          ),

        });
  }, [navigation]);

  const getImage = ()=>{
    // console.log(auth.currentUser);
    setImage(auth.currentUser.photoURL);
  }

  const handleImagePress = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);
    // console.log("current",auth.currentUser);
    const update = {
      photoURL: result.uri,
    };
    await auth.currentUser.updateProfile(update);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    getImage();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
              {/* <Text>Email: {auth.currentUser?.email}</Text> */}
          <TouchableOpacity onPress={handleImagePress}>
            {/* 'https://bootdey.com/img/Content/avatar/avatar6.png' */}
            {image? <Image style={styles.avatar} source={{uri: image}}/> : <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/> }
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={()=>{
                  navigation.navigate("UpdateProfile");
                }}
              >
                <Text style={{color:"#fff", fontSize:18}}>Update Profile</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}
                onPress={handleSignOut}
              >
                <Text style={{color:"#fff", fontSize:18}}>Log Out</Text> 
              </TouchableOpacity>
            </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header:{
    backgroundColor: "yellow",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    marginTop:-70
  },
  body:{
    marginTop:100,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:25,
    backgroundColor: "#c22ea3",
    borderColor:"yellow",
    borderWidth:1
  },
  button: {
    backgroundColor: '#c22ea3',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})