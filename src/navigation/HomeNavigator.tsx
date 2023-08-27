import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screen/Home";
//import ParadaScreen from "../screen/Paradas";
//import BusScreen from "../screen/Bus";
import MapScreen from "../screen/mapa";
import PruebaScreen from "../screen/prba";

const HomeNavigator = () =>{
    const HomeStack = createNativeStackNavigator();

    return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="ParadaScreen" component={MapScreen} />
        <HomeStack.Screen options={{presentation: 'modal'}} name="BusScreen" component={PruebaScreen} />
    </HomeStack.Navigator>
    );
};

export default HomeNavigator;