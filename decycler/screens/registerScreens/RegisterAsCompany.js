import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { UserIcon } from "react-native-heroicons/outline";

import { auth } from "../../firebase";
import { firestore } from "../../firebase";

const RegisterAsCompany = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [fiscal, setFiscal] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumb, setPNum] = useState('');

    const handleSignUp = () => {
        if(email.length === 0) { alert("Please enter your email"); return; }
        if(password.length === 0) { alert("Please enter your password"); return; }
        if(name.length === 0) { alert("Please enter your company name"); return; }
        if(fiscal.length === 0) { alert("Please enter your fiscal code"); return; }
        if(address.length === 0) { alert("Please enter your address"); return; }
        if(phonenumb.length === 0) { alert("Please enter your phone number"); return; }
        if(password !== password2) { alert("Passwords don't match"); return; }


        let signUpError = false;

        auth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            signUpError = true;
        })
        .then(() => {
            if(!signUpError){
                auth.currentUser.sendEmailVerification({
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
                    name: name,
                    fiscal: fiscal,
                    address: address,
                    phonenumber: phonenumb,
                    userType: "buyer",
                })
                .catch(error => {
                    alert(error.message);
                })
            }
        })
        
        auth.signOut();
    }
        
    return (
        <KeyboardAvoidingView style={styles.container}>
        <UserIcon size={40} color='#086b2e'/> 
            <Text style={styles.headerText}>Create a new company account</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Company name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fiscal code"
                    value={fiscal}
                    onChangeText={text => setFiscal(text)}
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
                    placeholder="Address"
                    value={address}
                    onChangeText={text => setAddress(text)}
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

export default RegisterAsCompany

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