import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Icon } from "@rneui/base";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const data = [
    {
        id: "123",
        icon: "home",
        title: "Home",
        destination: "Code Street, London, UK",
        location: {
            lat: 51.5223932,
            lng: -0.07082999999999999,
        },
    },
    {
        id: "456",
        icon: "briefcase",
        title: "Work",
        destination: "London Eye, London, UK",
        location: {
            lat: 51.5032973,
            lng: -0.1195537,
        },
    },
];

const NavFavourites = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const navigate = useNavigation();
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={[tw`bg-gray-200`, { height: 0.5 }]} />}
            renderItem={({ item: { title, destination, icon, location } }) => (
                <TouchableOpacity
                    disabled={!origin}
                    onPress={() => {
                        dispatch(
                            setDestination({
                                location,
                                description: destination,
                            })
                        );
                        navigate.navigate("MapScreen", { screen: "RideOptionsCard" });
                    }}
                    style={tw`flex-row items-center p-5`}
                >
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type="ionicon"
                        color="white"
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>{title}</Text>
                        <Text style={tw`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        ></FlatList>
    );
};

export default NavFavourites;

const styles = StyleSheet.create({});
