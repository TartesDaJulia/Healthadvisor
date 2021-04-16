import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
	Image,
	FlatList,
	Pressable,
} from "react-native";
import { AirbnbRating } from "react-native-elements";
import * as Linking from "expo-linking";

import Icon from "react-native-vector-icons/AntDesign";

import CommentFragmentScreen from "./CommentFragmentScreen";

import colors from "../config/colors";
import sizes from "../config/fontSizes";

function makeCall(number) {
	Linking.openURL("tel:" + number);
}

function ProviderScreen({ route, navigation }) {
	// Implemeting data to show address
	const [isLoadingAddress, setLoadingAddress] = useState(true);
	const [isLoadingReviews, setLoadingReviews] = useState(true);
	const [dataAddress, setDataAddress] = useState([]);
	const [dataReviews, setDataReviews] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + id + "/locationshort")
			.then((response) => response.json())
			.then((json) => {
				setDataAddress(json[0]);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoadingAddress(false));
	}, []);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + id + "/ratingsid")
			.then((response) => response.json())
			.then((json) => {
				setDataReviews(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoadingReviews(false));
	}, []);

	const { id, title, phoneNumber, rating, image } = route.params;

	const renderItem = ({ item }) => <CommentFragmentScreen id={item.id} />;

	return (
		<View style={styles.container}>
			<View style={styles.detailsContainer}>
				<Text style={styles.providerTitle}>{title}</Text>
				<View style={styles.containerRating}>
					<Text> {rating}</Text>
					<AirbnbRating
						defaultRating={rating}
						size={20}
						isDisabled={true}
						showRating={false}
						selectedColor={colors.primary}
					/>
					{/* <Text style={styles.providerRatings}>({reviews} Reviews)</Text> */}
				</View>
				<Text>
					<Text style={styles.providerPhone}>Phone Number:</Text>
					<Text
						style={styles.providerPhoneNumber}
						onPress={() => makeCall(phoneNumber)}
					>
						{phoneNumber}
					</Text>
				</Text>
				{isLoadingAddress ? (
					<ActivityIndicator />
				) : (
					<View>
						<Text>
							{dataAddress.first} {dataAddress.second}
							{dataAddress.second != "" ? dataAddress.second : " "}
						</Text>
						<Text>
							{dataAddress.postal}, {dataAddress.locality}
						</Text>
					</View>
				)}
			</View>
			<Image style={styles.providerImage} source={{ uri: image }} />
			{/* <Text style={styles.providerWaitTime}>
				Estimated wait time: {waitTime}
			</Text> */}

			<Pressable
				android_ripple={{ color: "gray", borderless: false }}
				onPress={() => navigation.navigate("Specialties Available", { id: id })}
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

			{isLoadingReviews ? (
				<ActivityIndicator />
			) : (
				<FlatList
					style={styles.reviewList}
					data={dataReviews}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			)}
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
		marginBottom: 5,
	},
	providerPhone: {
		fontSize: sizes.p,
		color: colors.black,
	},
	providerPhoneNumber: {
		fontSize: sizes.normal.p,
		color: colors.primary,
		textDecorationLine: "underline",
	},
	providerRatings: {
		fontSize: sizes.p,
	},
	providerTitle: {
		fontWeight: "bold",
		fontSize: sizes.normal.h1,
	},
	providerWaitTime: {
		fontSize: sizes.normal.s,
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
		fontSize: sizes.normal.h1,
		color: colors.white,
	},
});

export default ProviderScreen;
