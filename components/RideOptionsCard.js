import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import moment from "moment";

import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
    {
        id: "UBER-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "UBER-XL-456",
        title: "UberXL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "UBER-EXEC-789",
        title: "Exec",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

// If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigate = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    const [arrivalTime, setArrivalTime] = useState(null);

    useEffect(() => {
        const newArrivalTime = moment().add(travelTimeInformation?.duration?.value, "s").format("HH:mm");
        setArrivalTime(newArrivalTime);
    }, [travelTimeInformation]);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View style={tw`border-b border-gray-200`}>
                <TouchableOpacity
                    onPress={() => navigate.navigate("NavigateCard")}
                    style={tw`absolute top-4 left-5 z-50 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5`}>
                    Choose a trip{travelTimeInformation && ` - ${travelTimeInformation?.distance?.text}`}
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-5 ${id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`mr-auto ml-2`}>
                            <Text style={tw`font-medium text-lg mb-1`}>{title}</Text>
                            <Text>{arrivalTime}</Text>
                        </View>
                        <Text style={tw`-mt-6 font-medium text-lg`}>
                            {new Intl.NumberFormat("en-gb", {
                                style: "currency",
                                currency: "GBP",
                            }).format((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100)}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-lg font-medium`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
