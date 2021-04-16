import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

// Fragment screen that is implemented on the homescreen inside a flatlist
// It should show a summary of each healthcare provider ordered by distance to user
function ProviderFragmentScreen(props) {
	// Implemeting data to show address
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + props.id + "/locationshort")
			.then((response) => response.json())
			.then((json) => {
				setData(json[0]);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<View style={styles.container}>
			<Image style={styles.providerImage} source={{ uri: props.image }} />
			<View style={styles.detailsContainer}>
				<Text>{props.title}</Text>
				{/* <Text>Estimated wait time: {props.waitTime}</Text> */}
				<Text>Rating: {props.rating}/5</Text>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<View>
						<Text>
							{data.first} {data.second}
							{data.second != "" ? data.second : " "}
						</Text>
						<Text>
							{data.postal}, {data.locality}
						</Text>
					</View>
				)}

				{/* <Text>
				({props.reviews} Reviews)
				</Text> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		marginTop: 10,
	},
	detailsContainer: {
		marginLeft: 5,
		height: 100,
	},
	providerImage: {
		width: 100,
		height: 100,
	},
});

export default ProviderFragmentScreen;
