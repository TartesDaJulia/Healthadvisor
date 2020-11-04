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

import colors from "../config/colors";
import data from "../config/data";

function HomeScreen({ navigation }) {
	const DATA = data;

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
		color: colors.primary,
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
		borderBottomColor: colors.black,
		borderBottomWidth: 0.5,
	},
});

export default HomeScreen;
