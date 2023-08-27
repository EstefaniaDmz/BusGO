import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { api } from "../api";
import { globalStyle } from "../styles";

const img = require("../img/PInBusA128.png");
const imgC = require("../img/bus.png");

const MapScreen = ({route, navigation}: any) => {
  const [paradas, setParadas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    const recuperar = async() => {
            await fetch(api + "vwParada/paradas/1", 
            {method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(data => {
            setParadas(data);
            });
            await fetch(api + "vwBus/ruta/1", 
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

    console.log(paradas);
    paradas.map(item =>(console.log(item["longitude"], item["latitude"])));
    const styles = StyleSheet.create({
      plainView: {
        width: 60,
      },
        container: {
          ...StyleSheet.absoluteFillObject,
        },
        map: {
          ...StyleSheet.absoluteFillObject,
        },centeredView: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        },
        modalView: {
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2,
        },
        buttonOpen: {
          backgroundColor: '#F194FF',
        },
        buttonClose: {
          backgroundColor: '#2196F3',
        },
        textStyle: {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        modalText: {
          marginBottom: 15,
          textAlign: 'center',
        },
       });

      return (
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: 26.90747,
                longitude: -101.42169,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
             {paradas.map(item => (<Marker 
           key={item["idParada"]}
           coordinate={{
            latitude: parseFloat(item["latitude"]),
            longitude: parseFloat(item["longitude"]) 
           }}
           title=""
           image={img}
           onPress={() => setModalVisible(true)}
           >
           </Marker>))}
                
      
              
            </MapView>

            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[globalStyle.bckgModal]}>
            <Text style={[globalStyle.title]}>Camiones</Text>
            {buses.map(item => (
              <View key={item["idBus"]} style={[globalStyle.containerBus]}>
                <Image source={imgC} style={[globalStyle.imgBus]} />
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 15, marginLeft: 95, color:'#263b8f'}}>Número: {item["busNumero"]}</Text>
                        <Text style={{fontSize: 14, padding:2, color:'#1d3eb8', marginLeft: 90}}>Placa: {item["placa"]}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 15, color:'#263b8f', marginLeft: 190}}>{5 * item["idBus"]} min</Text>
              </View>
            ))}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
          </View>
       );
};

export default MapScreen;