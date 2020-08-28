import React, { useState, useEffect, Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { Drawer, Avatar, Portal, Modal, Provider, Button, Switch } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import styles from "../styles/driverStyles";
import HomeScreen from "./homeScreen";
import Passengers from "../passengers/passengers";

const check = "1";

class Drivers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            driverActive: false,
            driverFree: false,
            code: "",
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
        this.showModal();
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

    showModal = () => {
        this.setState({ modalVisible: true })
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

    cancel = () => {
        this.setState({ modalVisible: false })
        this.props.navigation.navigate(HomeScreen)
    }

    send = () => {
        if (this.state.code === check) {
            this.setState({ modalVisible: false })
            this.textInput.clear();
        } else {
            alert("Please enter a correct code to continue");
            this.textInput.clear();
        }
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
                <View style={styles.tabsContainer}>
                    <View style={styles.tabContainer}>
                        <View style={styles.switch}>
                            <TouchableOpacity style={styles.togle}>
                                <Switch
                                    value={this.state.driverActive}
                                    onValueChange={this.togled}
                                    style={styles.switchStyle}
                                    color="#ff6600" />
                                <Text style={{ textAlign: "center", marginTop: 10, color: "#fff" }}>Active/Inactive</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.togle}>
                                <Switch 
                                value={this.state.driverFree}
                                onValueChange={this.togledFree}
                                style={styles.switchStyle} 
                                color="#ff6600" />
                                <Text style={{ textAlign: "center", marginTop: 10, color: "#fff" }}>Free/Busy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Portal>
                    <Modal contentContainerStyle={styles.modal} visible={this.state.modalVisible} dismissable={false}>
                        <View style={styles.container}>
                            <Text style={styles.note}>Please Enter your driver's code to continue</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                                <TextInput
                                    ref={input => { this.textInput = input }}
                                    placeholder="Drivers Code"
                                    onChangeText={code => this.setState({ code })}
                                    placeholderTextColor="black"
                                    style={styles.textInput}
                                />
                                <TouchableOpacity style={styles.send} onPress={() => this.send()}>
                                    <Image
                                        resizeMode="contain"
                                        source={require("../icons/login.png")}
                                        style={{ height: 40, width: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.notes}>Please contact our support team to be registered</Text>
                            <Text style={styles.notes}>024xxxxxxx</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.cancel()}>
                            <Text style={{ color: "#fff" }}>cancel</Text>
                        </TouchableOpacity>
                    </Modal>
                </Portal>
            </Provider>
        );
    }
};


export default Drivers;