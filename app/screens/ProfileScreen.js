import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function ProfileScreen({ route, navigation }) {
	const { firstName, lastName, email } = route.params;
	return (
		<View style={styles.container}>
			<View style={styles.containerImageAndDetails}>
				<Image
					style={styles.userImage}
					source={require("../assets/android-profile-icon-green.png")}
				/>
				<Text style={styles.details}>
					{firstName} {lastName}
				</Text>
				<Text style={styles.details}> {email}</Text>
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
		color: "green",
		fontSize: 22,
	},
	userImage: {
		width: 100,
		height: 100,
	},
});

export default ProfileScreen;
