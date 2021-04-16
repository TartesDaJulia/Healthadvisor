import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	TextInput,
	View,
	StyleSheet,
	Text,
	Platform,
	StatusBar,
	FlatList,
	Pressable,
	Image,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import ProviderFragmentScreen from "./ProviderFragmentScreen";

import colors from "../config/colors";
import sizes from "../config/fontSizes";
import PROVIDERS from "../config/providersDB";
import REVIEWS from "../config/ratingsDB";

function CalculateReviews(institutionId) {
	const ratings = REVIEWS;

	var total = 0;
	var sum = 0;
	var rating = 0;

	ratings.forEach((review) => {
		if (review.institution == institutionId) {
			total = total + 1;
			sum = sum + parseInt(review.score);
		}
	});

	if (total != 0) {
		rating = sum / total;
		rating = Math.round(rating);
	}

	return [total, rating];
}

function HomeScreen({ navigation }) {
	// Implemeting data requests to show providers.
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution")
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	const DATA = PROVIDERS;
	const ratings = REVIEWS;

	var instReviews = 0;
	var instRating = 0;
	DATA.forEach((inst) => {
		[instReviews, instRating] = CalculateReviews(inst.id);
		inst.reviews = instReviews;
		inst.rating = instRating;
	});

	const [searchText, setSearchText] = useState("");

	const handleSearchSubmit = () => {
		console.log({ searchText });
	};

	const handleFragmentTouched = (item) => {
		navigation.navigate("Provider", {
			id: item.id,
			title: item.name,
			phoneNumber: item.phone,
			rating: item.rating,
			image: item.image,
			// reviews: item.reviews,
			// waitTime: item.waitTime,
		});
	};

	const renderItem = ({ item }) => (
		<Pressable
			android_ripple={{ color: "gray", borderless: false }}
			onPress={() => handleFragmentTouched(item)}
		>
			<ProviderFragmentScreen
				id={item.id}
				title={item.name}
				phoneNumber={item.phone}
				//waitTime={item.waitTime}
				rating={item.rating}
				reviews={item.rating}
				image={item.image}
			/>
		</Pressable>
	);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>HealthAdvisor</Text>
				<TouchableOpacity
					style={styles.headerTouchable}
					onPress={() =>
						navigation.navigate("Profile", {
							id: "2",
						})
					}
				>
					<Image
						style={styles.headerTouchableImage}
						source={require("../assets/android-profile-icon-green.png")}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder="Search Healthcare Providers"
					onChangeText={(searchText) => setSearchText(searchText)}
					onSubmitEditing={() => handleSearchSubmit()}
				/>
			</View>
			<Text style={styles.nearYou}>Healthcare providers near you</Text>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					style={styles.providerList}
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerText: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: sizes.normal.h1,
	},
	headerTouchable: {
		width: 30,
	},
	headerTouchableImage: {
		width: 30,
		height: 30,
	},
	nearYou: {
		margin: 5,
		fontSize: sizes.normal.h2,
		fontWeight: "bold",
	},
	providerList: {
		//marginBottom: 110, //Have this due to a bug not showing last item, it remains hidden //fixed with flex:1 on container\
	},
	textInput: {},
	textInputContainer: {
		borderBottomColor: colors.black,
		borderBottomWidth: 0.5,
	},
});

export default HomeScreen;
