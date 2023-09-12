import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ errorMessage, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An error ocurred!</Text>
      <Text style={[styles.text, styles.message]}>{errorMessage}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
});
