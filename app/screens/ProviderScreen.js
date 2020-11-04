import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AirbnbRating } from "react-native-elements";

import colors from "../config/colors";

function ProviderScreen({ route, navigation }) {
	const { title, phoneNumber, waitTime, rating, reviews } = route.params;
	return (
		<View style={styles.container}>
			<View style={styles.detailsContainer}>
				<Text style={styles.providerTitle}>{title}</Text>
				<View style={styles.containerRating}>
					<AirbnbRating
						defaultRating={rating}
						size={20}
						isDisabled={true}
						showRating={false}
						selectedColor={colors.primary}
					/>
					<Text style={styles.providerRatings}>
						({reviews} Reviews)
					</Text>
				</View>

				<Text style={styles.providerPhone}>
					Phone Number: {phoneNumber}
				</Text>
			</View>
			<Image
				style={styles.providerImage}
				source={require("../assets/placeholder_image.png")}
			/>
			<Text style={styles.providerWaitTime}>
				Estimated wait time: {waitTime}
			</Text>
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
	detailsContainer: {
		marginLeft: 5,
	},
	providerImage: {
		width: 200,
		height: 200,
		alignSelf: "center",
	},
	providerPhone: {
		fontSize: 18,
	},
	providerRatings: {
		fontSize: 18,
	},
	providerTitle: {
		fontWeight: "bold",
		fontSize: 30,
	},
	providerWaitTime: {
		fontSize: 12,
	},
	containerRating: {
		flexDirection: "row",
	},
});

export default ProviderScreen;
