import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { globalStyle } from "../styles";
import { api } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userReducer";

const img = require("../img/BusGO.jpeg");
const SignUpScreen = ({navigation}: any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [messageError, setMessageError] = useState("");
    const [nombre, setNombre] = useState("");
    const [idCiudad, setIdCiudad] = useState("");

    const dispatch = useDispatch();
    const handleSignUpWithEmail = async() => {
        if (email && idCiudad && nombre){
            setMessageError('');
            if (password && confirmPass){
                setMessageError('');

                if(password === confirmPass){
                    setMessageError('');
                    const data = await fetch(api + "usuario/crearcuenta",
                    {method: "POST", 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        email: email,
                        clave: password,
                        nombre: nombre,
                        idCiudad: idCiudad
                    })})
                    .then(response => response.json())
                    .catch(error => {
                    console.log(error);
                    });
                    if(data){
                        await AsyncStorage.setItem('token', email);
                        await AsyncStorage.setItem('idCiudad', idCiudad);
                        dispatch(addUser({
                            id: email,
                            fcmtoken: ''
                        }));
                    }

                } else {
                    setMessageError('*Las contraseñas deben ser iguales');
                }
            } else {
                setMessageError('*Favor de llenar todos los campos');    
            }
        }else {
            setMessageError('*Favor de llenar todos los campos');
        }
    };

    return (
       <ScrollView style={[globalStyle.container]}>
        <SafeAreaView style={[globalStyle.form]}>
        <Image source={img} style={{marginBottom: 30, width: 120, height: 120, alignSelf: 'center', position:'relative'}}/>

            <Text style={[globalStyle.title]}>Crear cuenta</Text>
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar nombre"
            autoCapitalize="none"
            autoFocus={true}
            value={nombre}
            onChangeText={(text) => setNombre(text)} 
            />
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 10, alignSelf:"center"}}>1: Monclova. 2: Castaños. 3: Frontera.</Text>
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar número ciudad"
            autoCapitalize="none"
            keyboardType="numeric"
            value={idCiudad}
            onChangeText={(text) => setIdCiudad(text)} 
            />
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar email"
            autoCapitalize="none"
            keyboardType="email-address"
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
            <TextInput
            style={[globalStyle.input]}
            placeholder="Repetir contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)} 
            />

                {messageError && ( <View>
                    <Text style={[globalStyle.errorText]}>{messageError}</Text>
                    </View>
                )}

            <TouchableOpacity style={[globalStyle.button]} onPress={handleSignUpWithEmail}>
                <Text style={{fontWeight: 'bold', color:'#FFF', fontSize:18}}>Aceptar</Text>
            </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>¿Ya tienes cuenta?    </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#160e8c', fontWeight: '600', fontSize: 14}}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
       </ScrollView>
    );
}

export default SignUpScreen;