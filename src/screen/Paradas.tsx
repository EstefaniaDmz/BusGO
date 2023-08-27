import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import { globalStyle } from "../styles";
import { Parada } from "../model/parada";
import { Ruta } from "../model/ruta";
import { api } from "../api";

const ParadaScreen = ({route, navigation}: any) => {
    const {ruta}: {ruta: Ruta} = route ? route.params: {};
    const [paradas, setParadas] = useState<Parada[]>([]);

    useEffect(() => {
        const recuperar = async() => {
            await fetch(api + "parada/" + ruta.id,
            {method: "GET", 
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                setParadas(data);
            });
        };
        recuperar();
    }, []);

    return(
        <View style={[globalStyle.container]}>
            <View style={{marginTop: 38}}>
            <Text style={[globalStyle.title]}>Seleccione parada</Text>
            </View>
            <ScrollView style={{padding: 28}}>
            {!paradas && (
                <View style={[globalStyle.form]}>
                    <Text style={[globalStyle.title]}>Cargando...</Text>
                </View>
            )}   
                {paradas.map(item => (
                    <TouchableOpacity key={item.id} style={[globalStyle.containerParadas]} onPress={() => navigation.navigate('BusScreen', {parada: item})}>
                        <Text style={[globalStyle.titleParada]}>{item.numero}</Text>
                        <Text style={[globalStyle.textoInfo]}>Calle: {item.calle}          Colonia: {item.colonia}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default ParadaScreen;