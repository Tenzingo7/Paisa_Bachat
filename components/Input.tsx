import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field, ErrorMessage, FieldProps } from 'formik';

interface FormikTextInputProps {
  label: string;
  name: string;
  placeholder: string;
  // Additional props for TextInput can be included here
}

const Input: React.FC<FormikTextInputProps> = ({ label, name, placeholder, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#2460B9"
            onChangeText={form.handleChange(name)}
            onBlur={form.handleBlur(name)}
            value={field.value}
            style={styles.input}
            {...props}
          />
        )}
      </Field>
      <ErrorMessage name={name}>
        {msg => <Text style={styles.errorText}>{msg}</Text>}
      </ErrorMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 0,
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
    paddingLeft: 10,  // Adjust padding for better alignment
    borderRadius: 10,
    color: "#2460B9",
    fontSize: 16,  // Set font size to make the text legible
  },
  errorText: {
    color: "#F4364C",
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 10,  // Align error text with the input field
  },
});

export default Input;
