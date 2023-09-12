import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { ExpensesContext } from "../../context/expensesContext";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ expenseId, onSubmit, onCancel }) => {
  const { expenses } = useContext(ExpensesContext);
  const editExpense = expenses.find((expense) => expense.id === expenseId);
  const [error, setError] = useState({
    state: false,
    message: "",
    inValidInput: [
      { name: "amount", isValid: false },
      { name: "date", isValid: false },
      { name: "description", isValid: false },
    ],
  });
  const [description, setDescription] = useState(
    expenseId ? editExpense.description : ""
  );
  const [amount, setAmount] = useState(
    expenseId ? editExpense.amount.toString() : ""
  );
  const [date, setDate] = useState(
    expenseId ? getFormattedDate(editExpense.date) : ""
  );

  const onChangeHandler = (setState, enteredText) => {
    setState(enteredText);
  };

  const submitHandler = () => {
    const amountIsValid = +amount > 0;
    const dateIsValid = date.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
    const descriptionIsValid = description.trim().length > 0;
    setError({
      state: false,
      message: "",
      inValidInput: [
        { name: "amount", isValid: false },
        { name: "date", isValid: false },
        { name: "description", isValid: false },
      ],
    });

    const errorMessages = !amountIsValid
      ? "Please enter a valid amount!"
      : !dateIsValid
      ? "Please enter a valid date!"
      : !descriptionIsValid
      ? "Please enter a valid description!"
      : "";

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setError({
        state: true,
        message: errorMessages,
        inValidInput: [
          { name: "amount", isValid: !amountIsValid },
          { name: "date", isValid: !dateIsValid },
          { name: "description", isValid: !descriptionIsValid },
        ],
      });
      return;
    }

    onSubmit({ description, amount, date });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Expense</Text>
      <View style={styles.upperContainer}>
        <Input
          style={styles.upperInput}
          label="Amount"
          invalid={
            error.inValidInput.find((input) => input.name === "amount").isValid
          }
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredText) =>
              onChangeHandler(setAmount, enteredText),
            value: amount,
          }}
        />
        <Input
          style={styles.upperInput}
          invalid={
            error.inValidInput.find((input) => input.name === "date").isValid
          }
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredText) =>
              onChangeHandler(setDate, enteredText),
            value: date,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={
          error.inValidInput.find((input) => input.name === "description")
            .isValid
        }
        textInputConfig={{
          multiline: true,
          autoCorrect: true, //default value is true
          autoCapitalize: "sentences", //default value is sentences
          onChangeText: (enteredText) =>
            onChangeHandler(setDescription, enteredText),
          value: description,
        }}
      />
      {error.state && <Text style={styles.errorText}>{error.message}</Text>}
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {expenseId ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upperInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
});
