import {StyleSheet, Dimensions} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex: 1,
      },mapContainer: {
        flex: 4,
      },
      map: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
      tabsContainer: {
        // marginBottom: 10,
        backgroundColor: '#fff',
      },
      tabContainer: {
        margin: 1,
        // borderWidth: 1,
      },
      tab1Container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
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
    calloutView: {
      borderRadius: 10,
    },
    whereTo: {
      alignSelf: "center",
      backgroundColor: "#f4f4f4",
      paddingVertical: 15,
      paddingHorizontal: 10,
      width: "100%",
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "rgba(0, 54, 58, 0.8)",
      flexDirection: "row"
    },
    whereText: {
      // alignSelf: "center"
      fontSize: 20
    },
    button: {
      alignSelf: "center",
      marginTop: 10,
      backgroundColor: "#fff",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      width: "70%",
      alignItems: "center",
    },
    inputWrapper: {
      backgroundColor: '#F3F7F9',
      flexDirection: "row",
      borderRadius: 2,
      justifyContent: "space-between",
      paddingHorizontal: 8,
      marginTop: 5,
      height: 50,
      alignItems: "center"
    },
    input: {
      color: '#222B2F',
      width: "80%",
      fontSize: 15,
      paddingVertical: 4,
      textAlign: "center"
    },
    list: {
      marginTop: 16,
      height: Dimensions.get('window').height - 70
    },
    listItemWrapper: {
      backgroundColor: 'transparent',
      height: 56
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: '100%'
    },
    listIcon: {
      width: 25,
      height: 25
    },
    placeMeta: {
      flex: 1,
      marginLeft: 15
    },
    primaryText: {
      color: 'black',
      fontSize: 15,
      marginBottom: 3
    },
    secondaryText: {
      color: '#ccc',
      fontSize: 13,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#DAE4E9',
      width: '92%',
      marginHorizontal: 16,
      opacity: 0.6
    },
});

export default styles;