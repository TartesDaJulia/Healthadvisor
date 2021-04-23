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

function RegisterScreen({ navigation }) {
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
						first: "",
						last: "",
					}}
					onSubmit={async (values) => {
						console.log(values);
						fetch("http://192.168.1.99:3000/person", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								email: values.email.toLowerCase(),
								password: values.password,
								first: values.first,
								last: values.last,
							}),
						})
							.then((response) => response.json())
							.catch((error) => console.error(error))
							.finally(navigation.goBack());
					}}
				>
					{({ handleChange, handleSubmit, values }) => (
						<View style={styles.formContainer}>
							<Text style={styles.headerText}>Register your account</Text>
							<TextInput
								onChangeText={handleChange("first")}
								value={values.first}
								style={styles.textInput}
								placeholder="First name"
							/>
							<TextInput
								onChangeText={handleChange("last")}
								value={values.last}
								style={styles.textInput}
								placeholder="Last name"
							/>
							<TextInput
								onChangeText={handleChange("email")}
								value={values.email}
								style={styles.textInput}
								placeholder="Email"
							/>
							<TextInput
								onChangeText={handleChange("password")}
								value={values.password}
								textContentType="password"
								style={styles.textInput}
								placeholder="Password"
								secureTextEntry={true}
							/>
							<Button
								onPress={handleSubmit}
								title="Register"
								color={colors.primary}
							/>
						</View>
					)}
				</Formik>
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

export default RegisterScreen;
