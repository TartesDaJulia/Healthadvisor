import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ProviderScreen from "./app/screens/ProviderScreen";
import SpecialtiesScreen from "./app/screens/SpecialtiesScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

import colors from "./app/config/colors";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ title: "Healthadvisor", headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={RegisterScreen}
					options={{ title: "Healthadvisor", headerShown: false }}
				/>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "Healthadvisor", headerShown: false }}
				/>
				<Stack.Screen
					name="Profile"
					component={ProfileScreen}
					options={{
						headerTintColor: colors.primary,
						headerTitleStyle: {
							fontWeight: "bold",
						},
					}}
				/>
				<Stack.Screen
					name="Provider"
					component={ProviderScreen}
					options={{
						headerTintColor: colors.primary,
						headerTitleStyle: {
							fontWeight: "bold",
						},
					}}
				/>
				<Stack.Screen
					name="Specialties Available"
					component={SpecialtiesScreen}
					options={{
						headerTintColor: colors.primary,
						headerTitleStyle: {
							fontWeight: "bold",
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
