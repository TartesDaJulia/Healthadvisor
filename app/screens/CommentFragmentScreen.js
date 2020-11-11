import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AirbnbRating } from "react-native-elements";

import PERSONS from "../config/personsDB";

import colors from "../config/colors";

function CommentFragmentScreen(props) {
	const persons = PERSONS;
	var name = "";

	persons.forEach((per) => {
		if (props.person == per.id) {
			name = per.firstName + " " + per.lastName;
		}
	});
	//persons.find((element) => props.person == element);

	return (
		<View style={styles.container}>
			<View style={styles.containerRating}>
				<Text style={styles.reviewerName}>{name}</Text>
				<AirbnbRating
					style={styles.rating}
					defaultRating={props.rating}
					size={20}
					isDisabled={true}
					showRating={false}
					selectedColor={colors.primary}
				/>
			</View>
			<Text style={styles.reviewComment}>{props.comment}</Text>
			<Text style={styles.reviewTime}>{props.timeStamp}</Text>
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
	containerRating: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	rating: {},
	reviewComment: {
		marginLeft: 5,
		fontSize: 20,
	},
	reviewerName: {
		fontWeight: "bold",
		fontSize: 18,
	},
	reviewTime: {
		marginTop: 5,
		fontSize: 14,
	},
});

export default CommentFragmentScreen;
