import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import HomeScreen from "./homeScreen";

class Prices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{ alignItems: "center", justifyContent: "center", height: "13%", flexDirection: "row-reverse", paddingHorizontal: 10, backgroundColor: "#ffff5a" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>ADEDETA / PRAGIA RIDERS UNION</Text>
                    <TouchableOpacity onPress={() =>this.props.navigation.navigate(HomeScreen)}>
                        <Image source={require("../icons/back.png")} style={{ height: 30, width: 30, marginRight: "1.2%" }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "#ccc", marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Distance</Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Prices</Text>
                </View>
                <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Aboabo</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 1.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center"}}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Sawaba</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Sepe junc</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 3.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Asebi</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 3.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5",marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Manpong</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 3.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - BouBai</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 3.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo station - Parkoso</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 3.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Dr Mensah - Aboabo</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 1.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Dr Mensah - Sawaba</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Tumasi - Sawaba</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo - Sepe junc</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo - Sawaba</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 1.50</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f5f5f5", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo - Manpong</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.00</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#fff", marginHorizontal: 5, height: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Aboabo - Asebi</Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>GH 2.00</Text>
                </View>
                </ScrollView>
            </View>
        );
    }
}

export default Prices;