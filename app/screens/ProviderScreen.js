import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	Pressable,
} from "react-native";
import { AirbnbRating } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";

import CommentFragmentScreen from "./CommentFragmentScreen";
import REVIEWS from "../config/ratingsDB";

import colors from "../config/colors";

function GetReviews(id) {
	console.log(id);
	var reviews = new Array();
	var i = 0;
	REVIEWS.forEach((review) => {
		if (id == review.institution) {
			reviews.push({});
			reviews[i].id = review.id;
			reviews[i].person = review.person;
			reviews[i].score = review.score;
			reviews[i].comment = review.comment;
			reviews[i].timeStamp = review.timeStamp;
			i++;
		}
	});
	return reviews;
}

function ProviderScreen({ route, navigation }) {
	const ratings = REVIEWS;

	const { id, title, phoneNumber, waitTime, rating, reviews } = route.params;

	const reviewsTreated = GetReviews(id);

	const renderItem = ({ item }) => (
		<CommentFragmentScreen
			person={item.person}
			comment={item.comment}
			timeStamp={item.timeStamp}
			rating={item.score}
		/>
	);

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
					<Text style={styles.providerRatings}>({reviews} Reviews)</Text>
				</View>
				<Text style={styles.providerPhone}>Phone Number: {phoneNumber}</Text>
			</View>
			<Image
				style={styles.providerImage}
				source={require("../assets/placeholder_image.png")}
			/>
			<Text style={styles.providerWaitTime}>
				Estimated wait time: {waitTime}
			</Text>

			<Pressable
				android_ripple={{ color: "gray", borderless: false }}
				onPress={() => navigation.navigate("ProviderSpecialties", { id: id })}
				style={styles.specialtyPressable}
			>
				<Text style={styles.specialtyText}>View Specialties available</Text>
				<Icon
					name="arrowright"
					size={28}
					color={colors.white}
					style={styles.specialtyIcon}
				/>
			</Pressable>
			<FlatList
				style={styles.reviewList}
				data={reviewsTreated}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		backgroundColor: colors.primary,
	},
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
		fontSize: 16,
	},
	containerRating: {
		flexDirection: "row",
	},
	reviewList: {},
	specialtyPressable: {
		elevation: 8,
		backgroundColor: colors.primary,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		maxHeight: 50,
	},
	specialtyIcon: {
		paddingRight: 8,
	},
	specialtyText: {
		paddingLeft: 8,
		fontSize: 28,
		color: colors.white,
	},
});

export default ProviderScreen;
