import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import Input from "@/components/Input";
import PickerInput from "@/components/picker";

export const register = () => {
  const router = useRouter();

  const [isRCCIPickerVisible, setRCCIPickerVisibility] = useState(false);
  const [isDocumentTypesPickerVisible, setDocumentTypesPickerVisibility] =
    useState(false);

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Type is required."),
  });

  const RegisterDocumentTypes = async (values: documentValues) => {
    try {
      const formDataDocumentType = new FormData();

      // Append the text fields
      formDataDocumentType.append("type", values.type);
      formDataDocumentType.append("rcciId", values.rcciId);
      //   formDataDocumentType.append("rcciId", values.rcciId);
      console.log(formDataDocumentType);

      // Append the images with correct properties
      const response = await register(formDataDocumentType).unwrap();
      console.log(response);
      if (response && response.message === "user_create_sucess") {
        Alert.alert("Account created successfully");
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      Alert.alert("Rcci failed. Please try again.", errorMessage);
      console.log("Rcci failed. Please try again.", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/login")}>
            <View>
              <Text style={styles.closeButton}>X</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          <Formik
            initialValues={{
              id: "",
              type: "",
              rcciId: "",
              data:[],
            }}
            validationSchema={validationSchema}
            onSubmit={RegisterDocumentTypes}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => {
              return (
                <>
                  {/* input for post of designation */}
                  <View style={styles.inputMainContainer}>
                    <Input
                      label="Type"
                      name="type"
                      placeholder="Enter Document Type"
                    />
                  </View>

                  <Pressable
                    onPress={() => handleSubmit()}
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={styles.buttonText}>Create</Text>
                    )}
                  </Pressable>
                </>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2460B9",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "80%",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    width: "100%",
  },
  buttonDisabled: {
    backgroundColor: "#a0a0a0", // Gray color to indicate disabled state
  },
  picker: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  closeButton: {
    fontSize: 24, // Increase font size for better visibilityn
    color: "#fff", // White color to contrast with the background
    overflow: "hidden", // Ensure the border radius works
    alignSelf: "flex-end", // Align to the end of the header
    textAlign: "center", // Center text inside
    paddingBottom: 20,
  },
  datePickerButton: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#ffffff", // White background
    borderColor: "#2460B9", // Border color matching the theme
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10, // Add padding for spacing
  },
  datePickerButtonText: {
    color: "#2460B9", // Text color matching the theme
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0,
  },
  PickerInput: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
    color: "#2460B9",
  },
  PickerInputText: {
    color: "#2460B9",
    lineHeight: 50, // Align text vertically in the center
  },
  Picker: {
    height: 150, // Adjust height if needed
    width: "100%",
    backgroundColor: "white",
    color: "black",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    // overflow: "hidden", // Adjust to remove top space
  },
  errorText: {
    color: "#F4364C",
    fontSize: 14,
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: "Abhaya Libre",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputMainContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: 15,
  },
  label: {
    color: "white",
    paddingBottom: 5,
    fontSize: 17,
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
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default register;
