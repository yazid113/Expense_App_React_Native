import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, textInputConfig, style, invalid }) => {
  const isMultiline = textInputConfig ? textInputConfig.multiline : false;
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.inputLabel, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          isMultiline && styles.multiline,
          invalid && styles.invalidInput,
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    borderRadius: 6,
    padding: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    fontSize: 18,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
