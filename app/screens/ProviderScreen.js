import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Button,
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Pressable,
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	StyleSheet,
} from "react-native";

// import { AirbnbRating } from "react-native-elements";

import { Rating, AirbnbRating } from "react-native-ratings";

import * as Linking from "expo-linking";

import { Formik, Field, Form } from "formik";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Icon from "react-native-vector-icons/AntDesign";

import CommentFragmentScreen from "./CommentFragmentScreen";

import colors from "../config/colors";
import sizes from "../config/fontSizes";

function makeCall(number) {
	Linking.openURL("tel:" + number);
}

function getFullDate() {
	var d = new Date();

	var time =
		d.getUTCFullYear() +
		"-" +
		d.getUTCMonth() +
		"-" +
		d.getUTCDate() +
		"T" +
		d.getUTCHours() +
		":" +
		d.getUTCMinutes() +
		":" +
		d.getUTCSeconds();
	return time;
}

function ProviderContent(route, navigation, isLoadingAddress, dataAddress) {
	const { id, title, phoneNumber, rating, image } = route.params;

	return (
		<View>
			{/* Show provider information */}
			<View style={styles.detailsContainer}>
				<Text style={styles.providerTitle}>{title}</Text>
				<View style={styles.containerRating}>
					<Text> {rating}</Text>
					<AirbnbRating
						defaultRating={parseFloat(rating)}
						size={20}
						isDisabled={true}
						showRating={false}
						selectedColor={colors.primary}
					/>

					{/* <Text style={styles.providerRatings}>({reviews} Reviews)</Text> */}
				</View>
				<Text>
					<Text style={styles.providerPhone}>Phone Number:</Text>
					{/* Make clickable phone number */}
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
			{/* Button to show provider specialties available */}
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
			{/* New review section */}
			<View>
				<Formik
					initialValues={{
						score: "3",
						text: "",
						time: "",
						person: "",
					}}
					onSubmit={async (values) => {
						var time = getFullDate();
						fetch("http://192.168.1.99:3000/rating/", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								score: String(values.score),
								text: values.text,
								time: time,
								person: "1",
								institution: id,
							}),
						})
							.then((response) => response.json())
							.catch((error) => console.error(error))
							.finally(() => console.log("yay"));
					}}
				>
					{({ handleChange, handleSubmit, values }) => (
						<View style={styles.newReviewContainer}>
							<AirbnbRating
								defaultRating={3}
								size={30}
								showRating={false}
								selectedColor={colors.primary}
								unSelectedColor={colors.gray}
								onFinishRating={(score) => {
									values.score = score;
								}}
							/>
							<TextInput
								onChangeText={handleChange("text")}
								value={values.text}
								style={styles.newReviewInput}
								placeholder="Comment about your experience here"
							/>
							<Button
								onPress={handleSubmit}
								title="Submit"
								color={colors.primary}
								style={styles.newReviewButton}
							/>
						</View>
					)}
				</Formik>
			</View>
		</View>
	);
}

function ProviderScreen({ route, navigation }) {
	// get params from route
	const { id, title, phoneNumber, rating, image } = route.params;
	// Implemeting hooks to show address
	const [isLoadingAddress, setLoadingAddress] = useState(true);
	const [dataAddress, setDataAddress] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + id + "/locationshort")
			.then((response) => response.json())
			.then((json) => {
				setDataAddress(json[0]);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoadingAddress(false));
	}, []);

	// Implemeting hooks to show reviews

	const [isLoadingReviews, setLoadingReviews] = useState(true);
	const [dataReviews, setDataReviews] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + id + "/ratingsid")
			.then((response) => response.json())
			.then((json) => {
				setDataReviews(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoadingReviews(false));
	}, []);

	const renderItem = ({ item }) => <CommentFragmentScreen id={item.id} />;

	return (
		<View>
			{/* End of new review section */}
			{/* Now load the existing reviews*/}
			{isLoadingReviews && isLoadingAddress ? (
				<ActivityIndicator />
			) : (
				<FlatList
					style={styles.reviewList}
					data={dataReviews}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={ProviderContent(
						route,
						navigation,
						isLoadingAddress,
						dataAddress
					)}
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
	containerRating: {
		flexDirection: "row",
	},
	detailsContainer: {
		marginLeft: 5,
	},
	newReviewButton: {},
	newReviewContainer: {
		borderStyle: "solid",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: colors.primary,

		margin: 5,

		marginBottom: 20,
	},
	newReviewInput: {
		minHeight: 50,
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
	reviewList: {},
	specialtyPressable: {
		elevation: 8,
		backgroundColor: colors.primary,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		maxHeight: 50,
		minHeight: 50,
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
