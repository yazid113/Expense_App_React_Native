import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../context/expensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { getFormattedDate } from "../util/date";
import {
  storeExpense,
  deleteExpense,
  updateExpenseRequest,
} from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const MangeExpenseScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const id = route?.params?.id;
  const { removeExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

  const deleteExpenseHandler = async (id) => {
    setIsLoading(true);
    try {
      removeExpense(id);
      await deleteExpense(id);
      navigation.goBack();
    } catch (error) {
      setError("Something went wrong! Could not delete expense!");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = async ({ description, amount, date }) => {
    setIsLoading(true);
    const [year, month, day] = date.split("-").map(Number);
    const localDate = new Date(year, month - 1, day);
    try {
      if (id) {
        updateExpense(id, { description, amount: +amount, date: localDate });
        await updateExpenseRequest(id, {
          description,
          amount: +amount,
          date: localDate,
        });
      } else {
        const idNewExpense = await storeExpense({
          description,
          amount: +amount,
          date: localDate,
        });
        addExpense({
          id: idNewExpense,
          description,
          amount: +amount,
          date: localDate,
        });
      }
      navigation.goBack();
    } catch (error) {
      setError("Something went wrong! Could not store expense!");
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, id]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <ErrorOverlay errorMessage={error} onConfirm={errorConfirmedHandler} />
    );
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        expenseId={id}
      />
      {id && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash-outline"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={async () => {
              deleteExpenseHandler(id);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MangeExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
