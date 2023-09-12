import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import MangeExpenseScreen from "./screens/MangeExpenseScreen";
import IconButton from "./components/UI/IconButton";
import { ExpensesContextProvider } from "./context/expensesContext";

export default function App() {
  const Tabs = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const ViewExpensesNavigator = () => {
    return (
      <Tabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("MangeExpense");
              }}
            />
          ),
        })}
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <Tabs.Screen
          name="Recent Expenses"
          component={RecentExpensesScreen}
          options={{
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="All Expenses"
          component={AllExpensesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  };

  return (
    <>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ViewExpensesNavigator"
              component={ViewExpensesNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MangeExpense"
              component={MangeExpenseScreen}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
