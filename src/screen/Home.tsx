import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import { globalStyle } from "../styles";
import { Ruta } from "../model/test/ruta";
import { api } from "../api";

const HomeScreen = ({navigation}: any) => {
    const [rutas, setRutas] = useState<Ruta[]>([]);
    useEffect(() => {
        const validadCiudad = async() => {
            const cd = await AsyncStorage.getItem('idCiudad');
            if(cd){
                await fetch(api + "vwParada/ruta/" + cd, 
                {method: "GET", 
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                setRutas(data);
                });
            } else {
                console.log("HAY UN GRANDÍSIMO PROBLEMA", cd);
            }
        };
        validadCiudad();
    }, []);

    const dispatch = useDispatch();
    const cerrarSesion = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('idCiudad');
        dispatch(addUser({
            id: '',
            fcmtoken: '',
        }));
    };
    return (
        <View style={[globalStyle.container]}>
            <View style={{marginTop: 38}}>
            <Text style={[globalStyle.title]}>Seleccione ruta</Text>
            </View>
            <ScrollView style={{padding: 28}}>
            {!rutas && (
                <View style={[globalStyle.form]}>
                    <Text style={[globalStyle.title]}>Cargando...</Text>
                </View>
            )}   
            {rutas.map(item => (
                    <TouchableOpacity key={item.idRuta} style={[globalStyle.containerNotes]} onPress={() => navigation.navigate('ParadaScreen', {ruta: item})}>
                        <Text style={[globalStyle.titleNote]}>{item.Ruta}</Text>
                    </TouchableOpacity>
                ))} 
            </ScrollView>
            <TouchableOpacity style={[globalStyle.buttonCS]} onPress={cerrarSesion}>
                <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;