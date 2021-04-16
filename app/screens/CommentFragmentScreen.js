import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AirbnbRating } from "react-native-elements";

import PERSONS from "../config/personsDB";

import colors from "../config/colors";
import sizes from "../config/fontSizes";

function CommentFragmentScreen(props) {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	let time = "";
	//console.log("entered comment fragment with ID:" + id);
	useEffect(() => {
		fetch("http://192.168.1.99:3000/rating/" + props.id + "/full")
			.then((response) => response.json())
			.then((json) => {
				setData(json[0]);
			})
			.catch((error) => console.error(error))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View>
					<View style={styles.containerRating}>
						<Text style={styles.reviewerName}>
							{data.first} {data.last}
						</Text>
						<AirbnbRating
							style={styles.rating}
							defaultRating={data.score}
							size={20}
							isDisabled={true}
							showRating={false}
							selectedColor={colors.primary}
						/>
					</View>
					<Text style={styles.reviewComment}>{data.text}</Text>
					<Text style={styles.reviewTime}>{data.time}</Text>
				</View>
			)}
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
		fontSize: sizes.normal.h2,
	},
	reviewerName: {
		fontWeight: "bold",
		fontSize: sizes.p,
	},
	reviewTime: {
		marginTop: 5,
		fontSize: sizes.normal.xs,
	},
});

export default CommentFragmentScreen;
