import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import LoadingOverlay from "../UI/LoadingOverlay";

const ExpensesOutput = ({ expenses, expensesPeriod, emptyText, isLoading }) => {
  const EmptyText = () => <Text style={styles.ifEmptyText}>{emptyText}.</Text>;

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {!isLoading ? (
        expenses.length > 0 ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <EmptyText />
        )
      ) : (
        <LoadingOverlay />
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  ifEmptyText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 32,
  },
});
