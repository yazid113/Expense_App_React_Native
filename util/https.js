import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-http-76e7e-default-rtdb.firebaseio.com/",
});

export const storeExpense = async (expense) => {
  const response = await instance.post("/expenses.json", expense);
  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await instance.get("/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      amount: response.data[key].amount,
    });
  }
  return expenses;
};

export const deleteExpense = async (id) => {
  await instance.delete(`/expenses/${id}.json`);
};

export const updateExpenseRequest = async (id, expense) => {
  await instance.patch(`/expenses/${id}.json`, expense);
};
