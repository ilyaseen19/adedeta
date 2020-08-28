import { StyleSheet, Dimensions } from "react-native";

const style = StyleSheet.create({
    modal: {
        alignItems: "center",
    },
    container: {
        backgroundColor: "rgba(0, 54, 58, 0.8)",
        width: "80%",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 10
    },
    textInput: {
        borderBottomWidth: 1,
        width: "65%",
        textAlign: "center",
        backgroundColor: "#ccc",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: "#ff6600",
    },
    note: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 18,
        marginHorizontal: 5,
        color: "#fff"
    },
    notes: {
        textAlign: "center",
        marginBottom: 5,
        marginHorizontal: 5,
        color: "#ccc"
    },
    button: {
        backgroundColor: "#ff6600",
        borderRadius: 15,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    send: {
        backgroundColor: "#ccc", 
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        width: 40,
        alignItems: "center",
        borderColor: "#ff6600",
        borderWidth: 1,
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
      pinText: {
        flex:1,
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
    },
    pinImage: {
      height: 20, 
      width: 20, 
      resizeMode: "contain"
    },
    tabsContainer: {
        flex: 0.5,
        // marginBottom: 10,
        backgroundColor: 'rgba(0, 54, 58, 0.8)',
      },
      tabContainer: {
        margin: 1,
        // borderWidth: 1,
      },
      switch: {
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomWidth: 1,
          borderColor: "#ff6600",
      },
      togle: {
          marginVertical: 15,
        //   marginHorizontal: 20,
          alignItems: "center",
          justifyContent: "center"
      },
      switchStyle: {
        transform: [{ scaleX: 2.2 }, { scaleY: 2.2 }]
      }
})

module.exports = style