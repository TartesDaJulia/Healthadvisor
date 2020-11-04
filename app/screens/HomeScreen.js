import React, { useState } from "react";
import {
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

function HomeScreen({ navigation }) {
	const DATA = [
		{
			id: "1",
			title: "Provider 1",
			phoneNumber: "255 111 111",
			waitTime: "10 minutes",
			rating: "4",
			reviews: "111",
		},
		{
			id: "2",
			title: "Provider 2",
			phoneNumber: "255 222 222",
			waitTime: "20 minutes",
			rating: "5",
			reviews: "222",
		},
		{
			id: "3",
			title: "Provider 3",
			phoneNumber: "255 333 333",
			waitTime: "30 minutes",
			rating: "3",
			reviews: "333",
		},
		{
			id: "4",
			title: "Provider 4",
			phoneNumber: "255 444 444",
			waitTime: "40 minutes",
			rating: "4",
			reviews: "444",
		},
		{
			id: "5",
			title: "Provider 5",
			phoneNumber: "255 555 555",
			waitTime: "50 minutes",
			rating: "5",
			reviews: "555",
		},
		{
			id: "6",
			title: "Provider 6",
			phoneNumber: "255 666 666",
			waitTime: "60 minutes",
			rating: "1",
			reviews: "666",
		},
		{
			id: "7",
			title: "Provider 7",
			phoneNumber: "255 777 777",
			waitTime: "70 minutes",
			rating: "2",
			reviews: "777",
		},
		{
			id: "8",
			title: "Provider 8",
			phoneNumber: "255 888 888",
			waitTime: "80 minutes",
			rating: "3",
			reviews: "888",
		},
		{
			id: "9",
			title: "Provider 9",
			phoneNumber: "255 999 999",
			waitTime: "90 minutes",
			rating: "4",
			reviews: "999",
		},
		{
			id: "10",
			title: "Provider 10",
			phoneNumber: "255 101 010",
			waitTime: "100 minutes",
			rating: "5",
			reviews: "1010",
		},
	];

	const [searchText, setSearchText] = useState("");

	const handleSearchSubmit = () => {
		console.log({ searchText });
	};

	const handleFragmentTouched = (item) => {
		console.log(item.id);
		navigation.navigate("Provider", {
			title: item.title,
			phoneNumber: item.phoneNumber,
			waitTime: item.waitTime,
			rating: item.rating,
			reviews: item.reviews,
		});
	};

	const renderItem = ({ item }) => (
		<Pressable
			android_ripple={{ color: "gray", borderless: false }}
			onPress={() => handleFragmentTouched(item)}
		>
			<ProviderFragmentScreen
				title={item.title}
				phoneNumber={item.phoneNumber}
				waitTime={item.waitTime}
				rating={item.rating}
				reviews={item.reviews}
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
							firstName: "John",
							lastName: "Doe",
							email: "johndoe@mail.com",
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
			<FlatList
				style={styles.providerList}
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
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
		color: "green",
		fontWeight: "bold",
		fontSize: 32,
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
		fontSize: 20,
		fontWeight: "bold",
	},
	providerList: {
		//marginBottom: 110, //Have this due to a bug not showing last item, it remains hidden //fixed with flex:1 on container
	},
	textInput: {},
	textInputContainer: {
		borderBottomColor: "black",
		borderBottomWidth: 0.5,
	},
});

export default HomeScreen;
