import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Image } from "react-native";

import colors from "../config/colors";
import API from "../API/API";

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
				<Image
					style={styles.userImage}
					source={require("../assets/android-profile-icon-green.png")}
				/>
				<Text style={styles.details}>
					{data.first} {data.last}
				</Text>
				<Text style={styles.details}>{data.email}</Text>
				{isLoading ? <ActivityIndicator /> : <Text> PERSON LOADED</Text>}
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
	userImage: {
		width: 100,
		height: 100,
	},
});

export default ProfileScreen;
