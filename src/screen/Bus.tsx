import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, View, Image } from "react-native";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import { globalStyle } from "../styles";
import { Parada } from "../model/parada";
import { Bus } from "../model/bus";
import { api } from "../api";

const img = require("../img/bus.png");

const BusScreen = ({route, navigation}: any) =>{
    const {parada}: {parada: Parada} = route ? route.params: {};
    const [buses, setBuses] = useState<Bus[]>([]);

    useEffect(() => {
        const recuperar = async() => {
            await fetch(api + "bus/" + parada.idRuta,
            {method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(data => {
            setBuses(data);
        });
        };
        recuperar();
    }, []);

    return(
        <View style={[globalStyle.container]}>
            <View style={{marginTop: 38}}>
            <Text style={[globalStyle.title]}>Parada: {parada.numero}</Text>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14, alignSelf:'center'}}>Calle: {parada.calle}          Colonia: {parada.colonia}</Text>
            </View>
            <ScrollView style={{padding:28}}>
            {!buses && (
                <View style={[globalStyle.form]}>
                    <Text style={[globalStyle.title]}>Cargando...</Text>
                </View>
            )}
                {buses.map(item => (
                    <View key={item.id} style={[globalStyle.containerBus]}>
                        <View style={{marginTop: 15, flexDirection: 'row'}}>
                        <Image source={img} style={[globalStyle.imgBus]} />
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 35, color:'#263b8f'}}>{item.numero}</Text>
                        <Text style={{fontSize: 14, padding:2, color:'#1d3eb8', marginLeft: 20}}>Placa: {item.placa}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15, color:'#263b8f', marginLeft: 40}}>{parada.tiempo} min</Text>
                        </View>
                    </View>
                ))}
                
            </ScrollView>
        </View>
    );
};



export default BusScreen;