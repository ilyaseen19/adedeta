import { StyleSheet, Dimensions } from "react-native";

const style = StyleSheet.create({
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
        flex: 0.7,
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
          borderColor: 'rgba(0, 54, 58, 0.8)'
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