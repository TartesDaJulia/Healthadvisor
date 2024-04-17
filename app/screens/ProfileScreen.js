import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Button,
	View,
	Text,
	TextInput,
	StyleSheet,
	Image,
} from "react-native";
import { Formik, Field, Form } from "formik";
import colors from "../config/colors";
import sizes from "../config/fontSizes";

function ProfileScreen({ route, navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const { id } = route.params;

	useEffect(() => {
		fetch("http://192.168.1.99:3000/person/" + id)
			.then((response) => response.json())
			.then((json) => {
				setData(json[0]);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.containerImageAndDetails}>
				<Formik
					initialValues={{
						email: data.email,
						password: data.password,
						first: data.first,
						last: data.last,
					}}
					onSubmit={async (values) => {
						console.log(values);
						fetch("http://192.168.1.99:3000/person/update", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								id: id,
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
							<Text style={styles.headerText}>Your details</Text>
							<TextInput
								onChangeText={handleChange("first")}
								value={values.first}
								style={styles.textInput}
								placeholder={data.first}
							/>
							<TextInput
								onChangeText={handleChange("last")}
								value={values.last}
								style={styles.textInput}
								placeholder={data.last}
							/>
							<TextInput
								onChangeText={handleChange("email")}
								value={values.email}
								style={styles.textInput}
								placeholder={data.email}
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
								title="Save"
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
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
	},
	containerImageAndDetails: {},
	details: {
		color: colors.primary,
		fontSize: 22,
	},
	formContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: sizes.normal.h1,
	},
	textInput: {
		paddingTop: 2,
		paddingBottom: 2,

		marginBottom: 5,

		borderWidth: 0.5,
		borderColor: colors.black,

		width: "75%",
	},
	userImage: {
		width: 100,
		height: 100,
	},
});

export default ProfileScreen;
