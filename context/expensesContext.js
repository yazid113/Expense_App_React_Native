import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expense) => {},
  addExpense: ({ description, amount, date }) => {},
  removeExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

export const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseHandler = ({ id, description, amount, date }) => {
    setExpenses((prevState) => {
      return [
        {
          id,
          description,
          amount,
          date,
        },
        ...prevState,
      ];
    });
  };

  const removeExpenseHandler = (id) => {
    setExpenses((prevState) => {
      return prevState.filter((expense) => expense.id !== id);
    });
  };

  const updateExpenseHandler = (id, { description, amount, date }) => {
    const expenseIndex = expenses.findIndex((expense) => expense.id === id);
    const updatedExpenses = [...expenses];
    updatedExpenses[expenseIndex] = {
      id,
      description,
      amount,
      date,
    };
    setExpenses(updatedExpenses);
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler,
        updateExpense: updateExpenseHandler,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
