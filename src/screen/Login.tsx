import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { globalStyle } from "../styles";
import { api } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userReducer";

const img = require("../img/BusGO.jpeg");
const LoginScreen = ({navigation}: any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const handleLoginWithEmail = async() => {
       const data = await fetch(api + "usuario/iniciarsesion", 
       {method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            email: email,
            clave: password
        })})
        .then(response => response.json());
        if(data){
            await AsyncStorage.setItem('token', JSON.stringify(data[0].email));
            await AsyncStorage.setItem('idCiudad', JSON.stringify(data[0].idCiudad));
            dispatch(addUser({
                id: email,
                fcmtoken: '',
            }));
        } else {
            console.log('sucedió un problema', data);
        }
    };
    
    return (
       <View style={[globalStyle.container]}>
       
        <SafeAreaView style={[globalStyle.form]}>
        <Image source={img} style={{marginBottom: 30, width: 120, height: 120, alignSelf: 'center', position:'relative'}}/>
            <Text style={[globalStyle.title]}>Iniciar sesión</Text>
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)} 
            />
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)} 
            />

            {message && ( <View>
                    <Text style={[globalStyle.errorText]}>{message}</Text>
                    </View>
                )}

            <TouchableOpacity style={[globalStyle.button]} onPress={handleLoginWithEmail}>
                <Text style={{fontWeight: 'bold', color:'#FFF', fontSize:18}}>Aceptar</Text>
            </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>¿No tienes cuenta?    </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: '#160e8c', fontWeight: '600', fontSize: 14}}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
       </View>
    );
}

export default LoginScreen;