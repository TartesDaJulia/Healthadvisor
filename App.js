import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as React from "react";
import {
	ActivityIndicator,
	Button,
	TextInput,
	View,
	StyleSheet,
	Text,
	Platform,
	StatusBar,
	Pressable,
} from "react-native";
///Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";

import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ProviderScreen from "./app/screens/ProviderScreen";
import SpecialtiesScreen from "./app/screens/SpecialtiesScreen";
// import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import MapScreen from "./app/screens/MapScreen";
import colors from "./app/config/colors";

import { Formik, Field, Form } from "formik";

import sizes from "./app/config/fontSizes";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createStackNavigator();

//Creating tab for either list of providers or map of providers
const Tab = createBottomTabNavigator();

const AuthContext = React.createContext();

function SplashScreen() {
	return (
		<View>
			<Text>Loading...</Text>
		</View>
	);
}

function LoginScreen({ navigation }) {
	// Implemeting data requests to show providers.

	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const { signIn } = React.useContext(AuthContext);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>HealthAdvisor</Text>
			</View>
			<View>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={async (values) => {
						fetch("http://192.168.1.99:3000/person/login", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: values.email.toLowerCase(),
								password: values.password,
							}),
						})
							.then((response) => response.json())
							.then((json) => {
								setData(json);
								console.log(json);
								if (json) {
									signIn(values.email, values.password);
								}
							})
							.catch((error) => console.error(error))
							.finally(() => setLoading(false));
					}}
				>
					{({ handleChange, handleBlur, handleSubmit, values }) => (
						<View style={styles.formContainer}>
							<Text style={styles.headerText}>Login your account</Text>
							<TextInput
								onChangeText={handleChange("email")}
								onBlur={handleBlur("email")}
								value={values.email}
								style={styles.textInput}
								placeholder="Email"
							/>
							<TextInput
								onChangeText={handleChange("password")}
								onBlur={handleBlur("password")}
								value={values.password}
								textContentType="password"
								style={styles.textInput}
								placeholder="Password"
								secureTextEntry={true}
							/>
							<Button
								onPress={handleSubmit}
								title="Submit"
								color={colors.primary}
							/>
						</View>
					)}
				</Formik>
				<View style={styles.registerContainer}>
					<Text style={styles.registerLink}>Don't have an account yet?</Text>
					<Button
						onPress={() => navigation.navigate("Register")}
						title="Register here"
						color={colors.primary}
					/>
				</View>
			</View>
		</View>
	);
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "Healthadvisor", headerShown: false }}
			/>
			<HomeStack.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerTintColor: colors.primary,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<HomeStack.Screen
				name="Provider"
				component={ProviderScreen}
				options={{
					headerTintColor: colors.primary,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<HomeStack.Screen
				name="Specialties Available"
				component={SpecialtiesScreen}
				options={{
					headerTintColor: colors.primary,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
		</HomeStack.Navigator>
	);
}

const MapStack = createStackNavigator();

function MapStackScreen() {
	return (
		<MapStack.Navigator>
			<MapStack.Screen
				name="Map"
				component={MapScreen}
				options={{ title: "Healthadvisor", headerShown: false }}
			/>
		</MapStack.Navigator>
	);
}

export default function App({ navigation }) {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				// Restore token stored in `SecureStore` or any other encrypted storage
				// userToken = await SecureStore.getItemAsync('userToken');
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: "RESTORE_TOKEN", token: userToken });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (data) => {
				// In a production app, we need to send some data (usually username, password) to server and get a token
				// We will also need to handle errors if sign in failed
				// After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
				// In the example, we'll use a dummy token

				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
			signOut: () => dispatch({ type: "SIGN_OUT" }),
			signUp: async (data) => {
				// In a production app, we need to send user data to server and get a token
				// We will also need to handle errors if sign up failed
				// After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
				// In the example, we'll use a dummy token

				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				{state.isLoading ? (
					// We haven't finished checking for the token yet
					<Stack.Navigator>
						<Stack.Screen name="Splash" component={SplashScreen} />
					</Stack.Navigator>
				) : state.userToken == null ? (
					// No token found, user isn't signed in
					<Stack.Navigator>
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								title: "Healthadvisor",
								headerShown: false,
								animationTypeForReplace: state.isSignout ? "pop" : "push",
							}}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
							options={{ title: "Healthadvisor", headerShown: false }}
						/>
					</Stack.Navigator>
				) : (
					<Tab.Navigator>
						<Tab.Screen
							name="Home"
							component={HomeStackScreen}
							options={{
								title: "Healthadvisor",
								headerShown: false,
								tabBarIcon: () => <Icon name="home" color={colors.primary} />,
							}}
						/>
						<Tab.Screen
							name="MapStackScreen"
							component={MapStackScreen}
							options={{
								title: "Map",
								tabBarIcon: () => <Icon name="map" color={colors.primary} />,
							}}
						/>
					</Tab.Navigator>
				)}
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	buttonSubmit: {
		color: colors.primary,
	},
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	formContainer: {
		marginTop: "50%",

		alignItems: "center",
		justifyContent: "center",
	},
	registerContainer: {
		marginTop: 20,

		alignItems: "center",
		justifyContent: "center",
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerText: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: sizes.normal.h1,
	},
	registerLink: {
		color: colors.primary,
		textDecorationStyle: "solid",
		textDecorationColor: colors.primary,
	},
	textInput: {
		paddingTop: 2,
		paddingBottom: 2,

		marginBottom: 5,

		borderWidth: 0.5,
		borderColor: colors.black,

		width: "75%",
	},
});
