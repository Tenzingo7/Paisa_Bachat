import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Field, ErrorMessage, FieldProps } from "formik";

interface DateInputProps {
  label: string;
  name: string;
  placeholder: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  placeholder,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempDate, setTempDate] = useState({ year: "", month: "", day: "" });

  const handleConfirmDate = (form: any) => {
    const { year, month, day } = tempDate;

    if (
      year.length === 4 &&
      parseInt(month, 10) >= 1 &&
      parseInt(month, 10) <= 12 &&
      parseInt(day, 10) >= 1 &&
      parseInt(day, 10) <= 31
    ) {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      form.setFieldValue(name, formattedDate);
      setShowModal(false);
    } else {
      alert("Please enter a valid date");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={styles.inputTouchable}
            >
              <Text
                style={[
                  styles.inputText,
                  !field.value && styles.placeholderText,
                ]}
              >
                {field.value || placeholder}
              </Text>
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={showModal}
              animationType="slide"
              onRequestClose={() => setShowModal(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Enter Date</Text>

                  <View style={styles.dateInputs}>
                    <TextInput
                      placeholder="YYYY"
                      keyboardType="number-pad"
                      maxLength={4}
                      style={styles.dateInput}
                      placeholderTextColor="#2460B9"
                      value={tempDate.year}
                      onChangeText={(text) =>
                        setTempDate((prev) => ({ ...prev, year: text }))
                      }
                    />
                    <TextInput
                      placeholder="MM"
                      keyboardType="number-pad"
                      maxLength={2}
                      style={styles.dateInput}
                      placeholderTextColor="#2460B9"
                      value={tempDate.month}
                      onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, "");
                        if (parseInt(numericValue, 10) > 12) {
                          setTempDate((prev) => ({ ...prev, month: "12" }));
                        } else {
                          setTempDate((prev) => ({ ...prev, month: numericValue }));
                        }
                      }}
                    />
                    <TextInput
                      placeholder="DD"
                      keyboardType="number-pad"
                      maxLength={2}
                      style={styles.dateInput}
                      placeholderTextColor="#2460B9"
                      value={tempDate.day}
                      onChangeText={(text) =>
                        setTempDate((prev) => ({ ...prev, day: text }))
                      }
                    />
                  </View>

                  <View style={styles.modalActions}>
                    <Button
                      title="Cancel"
                      onPress={() => setShowModal(false)}
                      color="#F4364C"
                    />
                    <Button
                      title="Confirm"
                      onPress={() => handleConfirmDate(form)}
                      color="#2460B9"
                    />
                  </View>
                </View>
              </View>
            </Modal>
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
  inputContainer: {
    marginBottom: 0,
  },
  label: {
    color: "white",
    paddingBottom: 5,
    fontSize: 17,
  },
  inputTouchable: {
    height: 50,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  inputText: {
    color: "#2460B9",
    fontSize: 16,
  },
  placeholderText: {
    color: "#2460B9",
  },
  errorText: {
    color: "#F4364C",
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dateInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    color:'black'
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    color:'black',
    opacity:1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
  },
});

export default DateInput;
