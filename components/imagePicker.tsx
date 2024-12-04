import React from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useField } from 'formik';

interface ImagePickerInputProps {
  label: string;
  placeholder: string;
  fieldName: string;
}

const uriToFile = async (uri: string, filename: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
};

const ImagePickerInput: React.FC<ImagePickerInputProps> = ({ label, placeholder, fieldName }) => {
  const [{ value }, , { setValue }] = useField(fieldName); // Correctly destructure useField

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access your media library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct media type
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result)
      if (!result.canceled && result.assets?.[0]?.uri) {
        const selectedImageUri = result.assets[0].uri;
        const imageName = result.assets[0].fileName || selectedImageUri.split('/').pop(); // Get file name
        const file = await uriToFile(selectedImageUri, imageName || 'image'); // Default name if no fileName exists
        setValue({ uri: selectedImageUri, name: imageName }); // Set both URI and name
      } else {
        Alert.alert('No image selected', 'Please select an image.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={pickImage} style={styles.input}>
        <Text style={styles.text}>{placeholder}</Text>
      </Pressable>
      {value?.uri ? (
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Image source={{ uri: value.uri }} style={styles.image} resizeMode="contain" />
          <Text style={styles.imageName}>{value.name}</Text> {/* Display the name of the image */}
        </View>
      ) : (
        <View style={{ justifyContent: 'center' }}>
          <Text>No image selected</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  label: {
    color: 'white',
    paddingBottom: 5,
    fontSize: 17,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    maxWidth: '100%',
    maxHeight: 200,
  },
  input: {
    height: 50,
    alignContent: 'flex-start',
    justifyContent: 'center',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
  },
  text: {
    color: '#2460B9',
    fontSize: 16,
  },
  imageName: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ImagePickerInput;
