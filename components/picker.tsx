import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { Picker } from '@react-native-picker/picker';

interface PickerInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  isPickerVisible: boolean;
  setPickerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerInput: React.FC<PickerInputProps> = ({
  label,
  name,
  options,
  isPickerVisible,
  setPickerVisibility,
}) => {
  return (
    <View style={styles.inputMainContainer}>
      <Text style={styles.label}>{label}</Text>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <>
            <Pressable
              onPress={() => setPickerVisibility(!isPickerVisible)}
              style={styles.PickerInput}
            >
              <Text style={styles.PickerInputText}>
                {field.value
                  ? options.find((option) => option.value === field.value)
                      ?.label
                  : "Select Option"}
              </Text>
            </Pressable>

            {isPickerVisible && (
              <Picker
                selectedValue={field.value}
                onValueChange={(itemValue) => {
                  form.setFieldValue(name, itemValue);
                  setPickerVisibility(false);
                }}
                style={styles.Picker}
              >
                {!field.value && (
                  <Picker.Item
                    label="Select Option"
                    value=""
                    color="#a9a9a9"
                  />
                )}
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    color="gray"
                  />
                ))}
              </Picker>
            )}
          </>
        )}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <Text style={styles.errorText}>{msg}</Text>}
      </ErrorMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  inputMainContainer: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  label: {
    color: 'white',
    paddingBottom: 5,
    fontSize: 17,
  },
  PickerInput: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    color: '#2460B9',
    fontSize: 16,
    justifyContent:'center'
  },
  PickerInputText: {
    fontSize: 16,
    color: '#2460B9',
  },
  Picker: {
    height: 150, // Adjust height if needed
    width: "100%",
    backgroundColor: "white",
    color:'black',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    // overflow: "hidden", // Adjust to remove top space
  },
  errorText: {
    color: '#F4364C',
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 10,
  },
});

export default PickerInput;
