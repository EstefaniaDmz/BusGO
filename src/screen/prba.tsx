import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../api";
import { globalStyle } from "../styles";
import { Parada } from "../model/test/parada";
import { Bus } from "../model/test/bus";

const img = require("../img/bus.png");

const PruebaScreen = ({route, props}: any) => {
  const {parada}: {parada: Parada} = route ? route.params: {};
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    const recuperar = async() => {
        await fetch(api + "vwBus/ruta/" + parada.idRuta,
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
    <Modal
    style={[globalStyle.bckgModal]}
    animationType="slide"
    visible={props.visible}
    onRequestClose={() => !props.visible}
    >
      <ScrollView>
        {buses.map(item => (
          <Text>{item.busNumero}</Text>
        ))}
      </ScrollView>
    </Modal>
);
};

export default PruebaScreen;