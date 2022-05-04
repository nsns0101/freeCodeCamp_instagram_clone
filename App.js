import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { View, Text } from "react-native";

import firebase from "firebase/compat/app";
// import "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL9vdTnZ_BdNaabFotzSGC50GGusjf9JE",
  authDomain: "instagram-dev-fa258.firebaseapp.com",
  projectId: "instagram-dev-fa258",
  storageBucket: "instagram-dev-fa258.appspot.com",
  messagingSenderId: "624328078063",
  appId: "1:624328078063:web:0e8096ea59d1b9e90b611a",
  measurementId: "G-2RPGEE2VC8",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      loaded: false,
    };
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />

            {/* Register */}
            <Stack.Screen name="Register" component={RegisterScreen} />

            {/* Login */}
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>User is logged in</Text>
      </View>
    );
  }
}

export default App;
