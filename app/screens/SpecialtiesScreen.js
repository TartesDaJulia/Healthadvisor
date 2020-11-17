import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Card } from "react-native-elements";

import availableSpecialties from "../config/institutionSpecialtiesDB";
import specialtyNames from "../config/specialtiesDB";

export default function SpecialtiesScreen({ route, navigation }) {
	const id = route.params;

	var specialties = [];

	for (let i = 0; i < availableSpecialties.length; i++) {
		const element = availableSpecialties[i];
		if (parseInt(availableSpecialties[i].institution) == id.id) {
			specialties.push(availableSpecialties[i].specialty);
		}
	}

	var names = [];

	specialties.forEach((specialty) => {
		const name = specialtyNames.find(
			(element) => parseInt(element.id) == specialty
		);
		names.push(name.name);
	});

	console.log(names);

	const renderItem = ({ item }) => (
		<Card>
			<Card.Title>{item}</Card.Title>
		</Card>
	);

	return (
		<View>
			<FlatList
				style={styles.providerList}
				data={names}
				renderItem={renderItem}
				keyExtractor={(item) => item}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	providerList: {},
});
