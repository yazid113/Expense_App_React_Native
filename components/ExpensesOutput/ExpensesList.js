import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import { getFormattedDate } from "../../util/date";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => {
        return (
          <ExpenseItem
            amount={item.amount}
            date={item.date}
            description={item.description}
            id={item.id}
          />
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
