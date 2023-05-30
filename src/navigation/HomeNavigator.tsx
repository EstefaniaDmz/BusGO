import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screen/Home";
import ParadaScreen from "../screen/Paradas";
import BusScreen from "../screen/Bus";

const HomeNavigator = () =>{
    const HomeStack = createNativeStackNavigator();

    return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="ParadaScreen" component={ParadaScreen} />
        <HomeStack.Screen name="BusScreen" component={BusScreen} />
    </HomeStack.Navigator>
    );
};

export default HomeNavigator;