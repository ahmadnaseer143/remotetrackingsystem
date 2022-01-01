import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Button } from 'react-native'
import { auth, app } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate("Meetups");
              }}
              title="Meetups"
              color="black"
            />
          ),

        });
  }, [navigation]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
              {/* <Text>Email: {auth.currentUser?.email}</Text> */}
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
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
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
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
  }
})