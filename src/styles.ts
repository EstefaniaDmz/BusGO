import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    backImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        resizeMode: "cover",
    },
    button: {
        backgroundColor: '#0e628c',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      buttonCS: {
        backgroundColor: "#3e48a0",
        height: 50,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 5,
      },
    input: {
        backgroundColor: "#bfd5ff",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#020e82",
        alignSelf: "center",
        paddingBottom: 24,
    },
    titleNote: {
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center', 
      padding: 5,
      color: '#265cc1',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
        marginTop: "10%",
      },
      whiteSheetSU: {
        width: "100%",
        height: "63%",
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#e4f5f3',
        borderRadius: 60,
        marginBottom: "30%",
      },
      errorText: {
        color: "#e74c3c", 
        fontWeight: 'bold', 
        fontSize: 10,
        alignSelf: "center",
        marginBottom: -20,
      },
      containerNotes: {
        backgroundColor: 'rgba(206, 234, 255, 0.7)',
        marginBottom: 30,
        borderColor: '#04389a',
        borderWidth: 2,
        borderRadius: 5,
      },
      containerParadas: {
        backgroundColor: 'rgba(182, 189, 245, 0.5)',
        marginBottom: 15,
        borderColor:'#505fe5',
        borderWidth: 3,
        borderRadius: 8,
      },
      containerBus: {
        borderColor: '#3685c3',
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
      },
      titleParada: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center', 
        padding: 4,
        color: '#263b8f',
      },
      textoInfo: {
        fontSize: 10,
        alignSelf: 'center',
        padding: 2, 
        color: "#4953b2",
      },
      imgBus: {
        width: 28,
        height: 28,
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
      },
});