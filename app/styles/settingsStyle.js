import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: "100%",
        alignItems: "flex-end",
    },
    edit: {
        height: 30,
        width: 30,
        marginTop: 10,
        marginRight: 10
    },
    viewStyle: {
        justifyContent: "center",
        flexDirection: "row"
    },
    textInput: {
        width: "70%",
        borderBottomWidth: 1
    },
    editImage: {
        width: 20,
        height: 20,
        alignSelf: "center"
    },
    nameStyle: {
        marginLeft: "8%",
        marginTop: 10
    },
    button: {
        alignSelf: "center",
        marginTop: 30,
        backgroundColor: "#ff6600",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 15
    }
});

module.exports = styles;