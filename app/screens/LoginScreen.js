import React, { useEffect, useState } from "react";
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

import { Formik, Field, Form } from "formik";

import colors from "../config/colors";
import sizes from "../config/fontSizes";

function LoginScreen({ navigation }) {
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

	// Implemeting data requests to show providers.
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	//Ask API for institution data to show on the list
	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution")
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	// Implementing search function
	const [searchText, setSearchText] = useState("");

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
									navigation.navigate("Home");
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

export default LoginScreen;
