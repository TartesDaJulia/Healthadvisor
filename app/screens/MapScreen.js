import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

function MapScreen({ navigation }) {
	////////////////////////////////////////////////////////////////////////
	// Implemeting data requests to show providers.
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState({ institutions: [] });

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution")
			.then((response) => response.json())
			.then((json) => {
				setData({ institutions: json });
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	////////////////////////////////////////////////////////////////////////
	// Creating markers list to show on map.
	function mapMarkers() {
		var mapped = [];
		data.institutions.forEach((institution) => {
			mapped.push(
				<Marker
					key={institution.id}
					coordinate={{
						latitude: parseFloat(institution.latitude),
						longitude: parseFloat(institution.longitude),
					}}
					title={institution.name}
					onCalloutPress={() => handleMarkerSelected(institution)}
				></Marker>
			);
		});
		return mapped;
	}

	const handleMarkerSelected = (item) => {
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

	////////////////////////////////////////////////////////////////////////
	//Creating counter to handle pressing the markers
	return (
		<View style={styles.container}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					region={{
						latitude: 41.16,
						longitude: -8.63,
						latitudeDelta: 0.1,
						longitudeDelta: 0.45,
					}}
					toolbarEnabled={true}
				>
					{mapMarkers()}
				</MapView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: "100%",
		width: "100%",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

export default MapScreen;
