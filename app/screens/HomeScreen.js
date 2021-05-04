import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
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

function newAction(userID, action, text) {
	console.log("Called new action");
	return JSON.parse(
		`{
			"id":"${userID}",
			"${action}":"${text}"	
		}`
	);
}

function HomeScreen({ navigation }) {
	const userID = "1";
	////////////////////////////////////////////////////////////////////////
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
	////////////////////////////////////////////////////////////////////////
	//implemeting logging for recomender system
	const [log, setLog] = useState([]);

	function printLogger() {
		var d = new Date();
		var time =
			d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
		console.log("PRINTING LOGGER ----" + time + "-----");
		console.log(log);
	}

	//useEffect to print logger every x seconds
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		printLogger(log);
	// 	}, 5000);
	// 	return () => clearInterval(interval);
	// }, []);
	////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////
	// Implementing search function
	const [searchText, setSearchText] = useState("");

	const handleSearchSubmit = () => {
		// check if searchText has been filled, if not-> alert user
		if (searchText != "") {
			fetch("http://192.168.1.99:3000/institution/search/" + searchText)
				.then((response) => response.json())
				.then((json) => {
					setData(json);
				})
				.catch((error) => console.error(error))
				.finally(() => setLoading(false));
		} else {
			Alert.alert("Search", "Please insert a search term", [{ text: "OK" }]);
		}
	};
	////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////
	//Handling selected institution from list provided

	const handleFragmentTouched = (item) => {
		// var action = newAction(userID, "clickedInstitution", item.id);
		// setLog([...log, action]);

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
	////////////////////////////////////////////////////////////////////////

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
