import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, curr } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// import "firebase/compat/firestore";
export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email, password, name } = this.state;
    console.log(email, password, name);

    const auth = getAuth();
    const db = getFirestore();
    const usersRef = collection(db, "users");

    //인증, 이메일, 비밀번호
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        // collection(db, "users").doc(auth.currentUser.uid).set({
        //   name,
        //   email,
        // });
        await setDoc(doc(usersRef, auth.currentUser.uid), {
          name,
          email,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;
