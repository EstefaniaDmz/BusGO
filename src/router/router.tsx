import React, { useEffect ,useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "../navigation/HomeNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userSelector } from "../redux/reducers/userReducer";

const Router = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const validadSesion = async() =>{
            const token = await AsyncStorage.getItem('token');
            if(token){
                dispatch(addUser({
                    id: token,
                    fcmtoken: '',
                }));
            }
        };
       validadSesion();
       
    }, []);
   const userData = useSelector(userSelector);
   
   return <NavigationContainer>
    {
        userData.id ?  <HomeNavigator /> : <AuthNavigator /> 
    }
   </NavigationContainer>
};

export default Router;