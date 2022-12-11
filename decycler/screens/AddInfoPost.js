import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput} from 'react-native-gesture-handler';

import { auth } from "../firebase";
import { firestore } from '../firebase';

import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';

const AddInfoPost = ({navigation, route}) => {
    const [userData, setData] = useState(null);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [weight, setWeight] = useState('');
    const [material, setMaterial] = useState('');
    const [mapRegion, setRegion] = useState({
        latitude: route.params.lat,
        longitude: route.params.long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

    const handlePost = async () => {
        const doc = await firestore.collection("posts")
        .add({
          user: auth.currentUser.uid,
          title: title,
          description: desc,
          material: material,
          weight: weight,
          longitude: mapRegion.longitude,
          latitude: mapRegion.latitude,
          imgurl: 'https://agrointel.ro/wp-content/uploads/2016/01/gunoi-organic.jpg',
          
        })
          .catch(error => {
             alert(error.message);
          })
        doc.update({uniqueid: doc.id});
        navigation.navigate("UserPage");
      }

  return (
    <SafeAreaView > 
    <TouchableOpacity
    onPress={() => {navigation.navigate("UserPage")}}> 
    <XMarkIcon style={{
        
        top: "8%",
        left: "90%"
       
    }} size={30} color='gray'/>
    
     </TouchableOpacity>

    <Animatable.View>
     <Text style={{
        rounded: 20,
        position: 'absolute'
     }}
     className="ml-[14%] mt-[17%] pl-4 text-[20px] text-white bg-[#086b2e]"> Please introduce some information on your post! </Text>
      <View style={styles.middleContainer}>
          <TextInput 
              placeholder="Title"
              value={title}
              textAlign="center"
              onChangeText={text => setTitle(text)}
              style={styles.title}
            />

          <TextInput 
              placeholder="Description"
              value={desc}
              textAlign="left"
              textAlignVertical='top'
              onChangeText={text => setDesc(text)}
              multiline={true}
              style={styles.desc}
            />  
          </View>

          <View style={styles.rowContainer}>
            <TextInput 
              placeholder="Weight"
              value={weight}
              textAlign="center"
              onChangeText={text => setWeight(text)}
              style={styles.wmInput}
            /> 
            <TextInput 
              placeholder="Material"
              value={material}
              textAlign="center"
              onChangeText={text => setMaterial(text)}
              style={styles.wmInput}
            /> 
            
          </View>

    </Animatable.View>
    
    <TouchableOpacity
    onPress={handlePost}>
    <Text style={{
        position: 'absolute',
       paddingHorizontal: "20%",
       paddingVertical: "5%"
    }} className="bg-[#086b2e] left-[25%] text-white text-[15px] rounded-lg"> Post </Text>

    </TouchableOpacity>

    <Animatable.Image className=" bottom-[-20%] left-[25%] h-[180px] w-[180px]" 
      source={require('../assets/logo.png')} />

    </SafeAreaView>
  )
}

export default AddInfoPost;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
    },
  
   topContainer:{
      width: "100%",
      height: 90,
      alignItems: "center",
      justifyContent: "center",
      elevation: 10,
   },

   middleContainer: {
      width: "100%",
      alignItems: "center",
      marginTop: "40%",
   },
  
   buttonContainer: {
      width: "100%",
      alignItems: "center",
      marginTop: 0,
   },
  
   button:{
    backgroundColor: "#086b2e",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
    marginTop: 20,
  },
  
  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  
   title: {
      backgroundColor: "white",
      borderColor: "#086b2e",
      paddingHorizontal: 15,
      borderWidth: 2,
      borderRadius: 10,
      width: "70%",
      marginTop: 10,
      height: 40,
  },
  
  desc: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderWidth: 2,
      borderColor: "#086b2e",
      borderRadius: 10,
      width: "90%",
      height: 100,
      marginTop: 10,
  },
  
  rowContainer:{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly"
      
  },
  
  wmInput: {
    borderColor: "#086b2e",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "40%",
    height: 40,
    marginTop: 10,
    marginBottom: 20
  },
  
   
});