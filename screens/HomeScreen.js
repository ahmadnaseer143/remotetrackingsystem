import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Button, Touchable } from 'react-native'
import { auth, app } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

const HomeScreen = () => {
  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState();
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
        headerLeft: () => (
          <TouchableOpacity style={{backgroundColor:"#c22ea3", padding:12, borderRadius:15}}
                onPress={handleSignOut}
          >
            <Icon name="logout" size={25} color="#fff"  />
            {/* <Text style={{color:"#fff", fontSize:18}}>Log Out</Text>  */}
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

  const getMotivationalQuote = () => {
    const options = {
      method: "POST",
      url: "https://motivational-quotes1.p.rapidapi.com/motivation",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "motivational-quotes1.p.rapidapi.com",
        "x-rapidapi-key": "dba998558fmsh5ad7c3364d357f1p18263cjsne15b101e6edc",
      },
      data: { key1: "value", key2: "value" },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setQuote(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    getImage();
    getMotivationalQuote();
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
            <View style={styles.quote}>
              <Text style={styles.qtxt}>{quote}</Text>
            </View>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={()=>{
                  navigation.navigate("UpdateProfile");
                }}
              >
                <Text style={{color:"#fff", fontSize:18}}>Update Profile</Text>  
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.buttonContainer}
                onPress={handleSignOut}
              >
                <Icon name="logout" size={30} color="#fff" />
                <Text style={{color:"#fff", fontSize:18}}>Log Out</Text> 
              </TouchableOpacity> */}    
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#c22ea3",
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
    borderRadius:15,
    backgroundColor: "#c22ea3",
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
    fontSize: 16,
  },
  quote: {
    width: "100%",
    overflow: "visible",
    padding: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  qtxt: {
    fontSize: 20,
    flexWrap: "wrap",
    fontWeight: "bold",
    fontFamily: "monospace",
    color:"#c22ea3"
  },
})