import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import AllExpensesScreen from "./screens/AllExpensesScreen";

export default function App() {
  const Tabs = createBottomTabNavigator();
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#5412d8",
            },
            headerTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "#5412d8",
            },
            tabBarActiveTintColor: "yellow",
            headerRight: () => (
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
            ),
          }}
          sceneContainerStyle={{
            backgroundColor: "#39079d",
          }}
        >
          <Tabs.Screen
            name="Recent Expenses"
            component={RecentExpensesScreen}
            options={{
              tabBarLabel: "Recent",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="timer-sand"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="All Expenses"
            component={AllExpensesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-month"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
