import React, { useState, useEffect, Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList,StyleSheet } from "react-native";
import { Drawer, Avatar, Portal, Modal, Provider, Button, Switch } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from "../styles/driverStyles";
import HomeScreen from "./homeScreen";
import Passengers from "../passengers/passengers";

const data = [
    {
        name: "aisha wan",
        _id: "00238jdsnbndcbj",
        possition: "83989209",
        destination: "kumasi city mall",
        priceRange: "GHS 7-8",
        contact: "7632092729"
    },
    {
        name: "abu",
        _id: "768364hdjkcklsj",
        possition: "djiueyf773",
        destination: "abrepo junction",
        priceRange: "GHS 4-5",
        contact: "4637585863"
    }
]

class Drivers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            driverActive: false,
            driverFree: false,
            initialRegion: {
                latitude: 6.68848,
                longitude: -1.62443,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            markers: Passengers,
        }
    }

    componentDidMount() {
        this.active();
        this.geocoordinates();
    }

    geocoordinates = () => {
        Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            this.setState({ initialRegion: initialRegion })
        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    active = () => {
        this.setState({driverActive: true})
    }

    togled = () => {
        if (!this.state.driverActive) {
            this.setState({ driverActive: true });
            console.log("Active");
        } else {
            this.setState({driverActive: false});
            console.log("Inactive");
        }
    }

    busy = () => {
        this.setState({driverFree: true});
    }

    togledFree = () => {
        if (!this.state.driverFree) {
            this.setState({ driverFree: true });
            console.log("Busy");
        } else {
            this.setState({driverFree: false});
            console.log("Free");
        }
    }

    onSelectSuggestion = (item) => {
        alert(item._id);
    }

    keyExtractor = item => item.index;

    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onSelectSuggestion(item)}>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5}}>
                        <Text style={{fontSize: 15}}>Name:</Text>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{item.name}</Text>
                    </View>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5}}>
                        <Text style={{fontSize: 15}}>Contact:</Text>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{item.contact}</Text>
                    </View>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5}}>
                        <Text style={{fontSize: 15}}>Going to:</Text>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{item.destination}</Text>
                    </View>
                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5}}>
                        <Text style={{fontSize: 15}}>Price Range:</Text>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>{item.priceRange}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    height: StyleSheet.hairlineWidth,
                    backgroundColor: 'black',
                    width: '92%',
                    marginHorizontal: 16,
                    // opacity: 0.6
                }} />
            </View>
        );
    }

    render() {
        return (
            <Provider>
                <MapView style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={true}>
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        >
                            <View>
                                <Text style={styles.pinText}>{marker.title}</Text>
                                <Image style={styles.pinImage} source={require('../icons/user.png')} />
                            </View>
                        </Marker>
                    ))}
                </MapView>
                <Callout>
                    <TouchableOpacity style={{ marginTop: "10%", marginLeft: "10%" }} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Image source={require("../images/menu.png")} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </Callout>
                <View style={{backgroundColor: '#fff',}}>
                    <View style={styles.tabContainer}>
                        <View style={styles.switch}>
                            <TouchableOpacity style={styles.togle}>
                                <Switch
                                    value={this.state.driverActive}
                                    onValueChange={this.togled}
                                    style={styles.switchStyle}
                                    color="#ff6600" />
                                <Text style={{ textAlign: "center", marginTop: 10, color: "black" }}>Inactive/Active</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.togle}>
                                <Switch 
                                value={this.state.driverFree}
                                onValueChange={this.togledFree}
                                style={styles.switchStyle} 
                                color="#ff6600" />
                                <Text style={{ textAlign: "center", marginTop: 10, color: "black" }}>Free/Busy</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        />
                    </View>
                </View>
            </Provider>
        );
    }
};


export default Drivers;