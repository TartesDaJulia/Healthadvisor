import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

function ProviderFragmentScreen(props) {
	return (
		<View style={styles.container}>
			<Image
				style={styles.providerImage}
				source={require("../assets/placeholder_image.png")}
			/>
			<View style={styles.detailsContainer}>
				<Text>{props.title}</Text>
				<Text>Phone Number:{props.phoneNumber}</Text>
				<Text>Estimated wait time: {props.waitTime}</Text>
				<Text>
					Rating: {props.rating}/5 ({props.reviews} Reviews)
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		marginTop: 10,
	},
	detailsContainer: {
		marginLeft: 5,
	},
	providerImage: {
		width: 100,
		height: 100,
	},
});

export default ProviderFragmentScreen;
