import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";

import { auth } from "../../firebase";
import { firestore } from "../../firebase";
import { UserIcon } from "react-native-heroicons/outline";
import { Use } from "react-native-svg";
import * as Animatable from 'react-native-animatable';

const RegisterAsPerson = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstname, setFName] = useState('');
    const [lastname, setLName] = useState('');
    const [phonenumb, setPNum] = useState('');

    const handleSignUp = () => {
        if(firstname.length === 0) { alert("Please enter your first name"); return; }
        if(lastname.length === 0) { alert("Please enter your last name"); return; }
        if(phonenumb.length === 0) { alert("Please enter your phone number"); return; }
        if(email.length === 0) { alert("Please enter your email"); return; }
        if(password.length === 0) { alert("Please enter your password"); return; }
        if(password !== password2) { alert("Passwords don't match"); return; }

        let signUpError = false;

        auth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            signUpError = true;
        })
        .then(async () => {
            if(!signUpError){
                await auth.currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: "https://decycler-f50a7.firebaseapp.com"
                })
                .then(() => {
                    alert("Verification email sent, check your inbox!");
                });
            }
        })
        .then(() => {
            if(!signUpError){
                firestore.collection("users")
                .doc(auth.currentUser.uid).set({
                    uniqueId: auth.currentUser.uid,
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumb,
                    userType: "seller",
                })
                .catch(error => {
                    alert(error.message);
                })
            }
        })
        
        auth.signOut();
    }
        
    return (
        <KeyboardAvoidingView style={styles.container} >
        
        <UserIcon size={50} color='#086b2e'/> 
            <Text style={styles.headerText}>Create a new seller account</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    value={firstname}
                    onChangeText={text => setFName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    value={lastname}
                    onChangeText={text => setLName(text)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Phone number"
                    value={phonenumb}
                    onChangeText={text => setPNum(text)}
                />
                <TextInput  
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
               
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                    secureTextEntry={true}
                       />
                        
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    )
}

export default RegisterAsPerson

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        textAlign: "center",
        fontSize: 35,
        marginBottom: 10,
        fontWeight: "100",
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
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 45,
    },
    button: {
        backgroundColor: "#086b2e",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})