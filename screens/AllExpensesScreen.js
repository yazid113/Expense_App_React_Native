import { View, Text } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/expensesContext";

const AllExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensesPeriod={"Total"}
      expenses={expenses}
      emptyText={"No expenses yet"}
    />
  );
};

export default AllExpensesScreen;
