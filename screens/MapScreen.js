import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigate = useNavigation();
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigate.navigate("HomeScreen")}
                style={tw`shadow-2xl p-3 bg-white rounded-full w-12 absolute top-12 left-4 z-50`}
            >
                <Icon name="arrow-left" color="black" type="fontisto" />
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({});
