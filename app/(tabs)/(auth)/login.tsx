import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { CheckBox } from "react-native-elements";
import Input from "@/components/Input";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const LoginScreen = () => {
  const router = useRouter(); // Use the router for navigation
  // const [login, { data, isLoading, isError }] = useLoginMutation();
  const [remember, setRemember] = useState(false);

  

  // Assuming you have a function to set the token
const setToken = async (newToken:any) => {
  try {
    await AsyncStorage.setItem("token", newToken);
  } catch (error) {
    console.error("Failed to store token", error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token"); // Await the token retrieval
    return token; // Return the token value
  } catch (error) {
    console.error("Failed to retrieve token", error);
    return null; // Return null in case of error
  }
};

// Call this function when you want to remember password


// useFocusEffect(
//   useCallback(() => {
//     const checkToken = async () => {
//       const token = await getToken(); // Get the token
//       if (token) { // If token exists
//         console.log("Token found:", token);
//         router.push("/home"); // Navigate to home
//       } else {
//         console.log("No token found");
//       }
//     };

//     checkToken(); // Call the async function inside the effect
//   }, [router]) // Add `router` to dependencies
// );


  const handleLogin = async (values: FormValues) => {
    // try {
    //   const email = values.email
    //   const password = values.password
    //   const response = await login({email, password}).unwrap();

    //   setToken(response.data.token);
    //   if (response.message == "token_create_success"){
    //     router.push("/dashboard")
    //   }
    // } catch (error) {
    //   console.log("Login failed. Please try again.", error);
    //   Alert.alert(
    //     "Login Error", // Alert Title
    //     "Either email or password is wrong. Please try again.", // Alert Message
    //     [
    //       { text: 'OK', onPress: () => console.log('OK Pressed') },
    //     ],
    //     { cancelable: false } // If true, pressing outside the alert will dismiss it
    //   );
    // }
  };

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2460B9", justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <View
          style={{
            width:'100%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent:'center',
            marginBottom: 20,
            
          }}
        >
          
          <Text style={styles.title}>
            LOGIN
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Input
                      label="Email"
                      name="email"
                      placeholder="Enter Email"
                    />
              </View>
              <View style={styles.inputContainer}>
              <Input
                      label="Password"
                      name="password"
                      placeholder="Enter Password"
                    />
                <View style={{ marginTop: 5 }}>
                  <Pressable onPress={() => router.push('/(tabs)/dashboard')}>
                    <Text style={{ color: "white" }}>Forgot Password?</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={remember}
                  onPress={() => setRemember(!remember)}
                  title="Remember Me"
                  checkedColor="white"
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 0,
                  }}
                  textStyle={{ color: "white" }}
                />
              </View>

              <Pressable
      onPress={() => handleSubmit()}
      style={styles.button}
      // disabled={isLoading} // Disable the button while loading
    >
      {/* {isLoading ? (
        <ActivityIndicator size="small" color="#fff" /> // Loading indicator
      ) : (
        <Text style={styles.buttonText}>Login</Text>
      )} */}
       <Text style={styles.buttonText}>Login</Text>
    </Pressable>
            </>
          )}
        </Formik>

        <Pressable onPress={() => router.push('/register')} style={styles.button2}>
          <Text style={styles.buttonText}>Create an account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Abhaya Libre",
    fontWeight: "bold",
    color: "white",
    marginBottom: 14,
  },
  inputContainer: {
    color: "#2460B9",
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
    color: "#2460B9",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  checkboxContainer: {
    width: '100%',
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  button2: {
    marginTop: 15,
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
