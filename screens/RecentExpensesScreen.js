import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../context/expensesContext";
import { todayMinusDays } from "../util/date";
import { fetchExpenses } from "../util/https";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpensesScreen = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const recentExpenses = expenses.filter((expense) => {
    return expense.date >= todayMinusDays(7);
  });

  useEffect(() => {
    const fetchExpensesHandler = async () => {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses.sort((a, b) => b.date - a.date));
      } catch (error) {
        setError("Something went wrong! Could not fetch expenses!");
      }
      setIsLoading(false);
    };
    fetchExpensesHandler();
  }, []);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  if (error) {
    return (
      <ErrorOverlay errorMessage={error} onConfirm={errorConfirmedHandler} />
    );
  }

  return (
    <ExpensesOutput
      expensesPeriod={"Last 7 Days"}
      expenses={recentExpenses}
      emptyText={"No expenses in the last 7 days"}
      isLoading={isLoading}
    />
  );
};

export default RecentExpensesScreen;
