import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	FlatList,
} from "react-native";
import { Card } from "react-native-elements";

function SpecialtiesScreen({ route, navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("http://192.168.1.99:3000/institution/" + id.id + "/specialties")
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	const id = route.params;

	const renderItem = ({ item }) => (
		<Card>
			<Card.Title>{item.specialty}</Card.Title>
		</Card>
	);

	return (
		<View>
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
	providerList: {},
});

export default SpecialtiesScreen;
