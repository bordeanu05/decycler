import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';

import { auth } from "../../firebase";
import { firestore } from '../../firebase';

import * as Animatable from 'react-native-animatable';

const LoginAsCompany = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        let threwError = false;
        await auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            threwError = true;
        });
  
        if(!threwError)
        {
            if(!auth.currentUser.emailVerified){
                alert("Verify your email to continue");
            }
            else{
                await firestore.collection("users").doc(auth.currentUser.uid).get()
                .then(snapshot => {
                  if(snapshot.exists){
                    if(snapshot.data().userType === "buyer"){
                      navigation.navigate("CompanyPage");
                    }
                    else{
                      auth.signOut();  
                      alert("Account already created as a seller");
                    }
                  }
                })
            }
        }
    } 

    return (
      
    <KeyboardAvoidingView 
            style={styles.container}
            // behavior="padding"
        >
          <TouchableOpacity
        onPress={() => {navigation.navigate("Decide")}}
        >
        
      <Animatable.Image
      
      animation="fadeInLeft"
      source={require('../../assets/stanga.png')}
      
      className="h-[40px] w-[40px]  bg-[#086b2e]"
      style={{
        left: -170,
        top: -70,
        position: 'absolute',
        borderRadius: 50,
      }}
      /> 

</TouchableOpacity>
            <Animatable.Image 
      className="top-3 h-[200px] w-[200px]" 
      source={require('../../assets/logo.png')}
      animation="slideInDown"
      />
            <Animatable.View
            animation="fadeInUp"
             style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
            </Animatable.View>

            <Animatable.View
            animation="fadeInUp" 
            style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login as a company</Text>
                </TouchableOpacity>


                <TouchableOpacity 
                    onPress={() => {navigation.navigate("Register as buyer")}}
                    style={{margin: 15}}
                >
                    <Text style={styles.signUpText}>Create a new account</Text>
                </TouchableOpacity>
                
            </Animatable.View>

        </KeyboardAvoidingView>
  );
}

export default LoginAsCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button:{
    elevation: 10,
    backgroundColor: "#086b2e",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  signUpText: {
    color: "#067069",
    fontWeight: "320",
    fontSize: 16,
},
});
