import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const BasicButtonLayout = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Add</Text>
      </Pressable>
    </View>
  );
};

export default BasicButtonLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 16,
    marginTop: 26,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 6,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#fff",
  },
  primaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 4,
    backgroundColor: "#5b1dd6",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#fff",
  },
});
