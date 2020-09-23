import React, { useState, useEffect, Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, BackHandler } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Drawer, Avatar, Portal, Modal, Provider, Button, Switch } from 'react-native-paper';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import SocketIOClient from 'socket.io-client';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
const ApiKey = require("../config/apiKey/apiKey");
import styles from "../styles/driverStyles";
import HomeScreen from "./homeScreen";


class Drivers extends Component {
    socket: Object;


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
            request: null,
            dData: [],
            start: false,
            startTrip: false,
            finalPrice: null,
            isSearchBarActive: true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this.geocoordinates();
        this.active();
        this.socket = SocketIOClient('https://adedeta.herokuapp.com');
        this.getData();
        this.socket.on("driveRequest", driverRequest => {
            // console.log(driverRequest);
            this.setState({ request: driverRequest });
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.socket.emit('disconnect', {
            senderId: this.state.dData._id
        });
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        Alert.alert(
            "Exit",
            "Are you sure you want to exit?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed");
                    },
                    style: "cancel"
                },
                { text: "Exit", onPress: () => this.handleLogout() }
            ],
            { cancelable: false }
        )
    };

    handleLogout() {
        BackHandler.exitApp();
    };

    getData = async () => {
        try {
            const driverData = await AsyncStorage.getItem('driverDet')
            let parsedData = JSON.parse(driverData);
            this.setState({ dData: parsedData })
            this._emit(parsedData);
            this.sendDriverLocation();
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    _emit = (parsedData) => {
        this.socket.emit('init', {
            userId: parsedData._id
        });
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
            this.setState({ initialRegion: initialRegion });
        },
            (error) => alert("location access failed"),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 3000 }
        );
            Geolocation.watchPosition((position) => {
                    var lati = parseFloat(position.coords.latitude)
                    var longi = parseFloat(position.coords.longitude)
                    var changed = {
                        latitude: lati,
                        longitude: longi,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                }
                    this.setState({ initialRegion: changed });
            })
    }

    sendDriverLocation = () => {
        setInterval(() => {
            if (this.state.driverFree === false) {
                    this.socket.emit('driverLocation', {
                    driverId: this.state.dData._id,
                    initialRegion: this.state.initialRegion,
                    driverName: this.state.dData.firstName + " " + this.state.dData.lastName,
                    contact: this.state.dData.phone,
                    numberPlate: this.state.dData.vnplate,
                    activeStatus: this.state.driverActive,
                    currentStatus: "free",
                })
            } else {
                    this.socket.emit('driverLocation', {
                    driverId: this.state.dData._id,
                    initialRegion: this.state.initialRegion,
                    driverName: this.state.dData.firstName + " " + this.state.dData.lastName,
                    contact: this.state.dData.phone,
                    numberPlate: this.state.dData.vnplate,
                    activeStatus: this.state.driverActive,
                    currentStatus: "busy",
                })
            }
        }, 10000);
    }

    active = () => {
        this.setState({ driverActive: true })
    }

    togled = () => {
        if (!this.state.driverActive) {
            this.setState({ driverActive: true });
        } else {
            this.setState({ driverActive: false });
        }
    }

    busy = () => {
        this.setState({ driverFree: true });
    }

    togledFree = () => {
        if (!this.state.driverFree) {
            this.setState({ driverFree: true });
        } else {
            this.setState({ driverFree: false });
        }
    }

    confirmRide = () => {
            this.socket.emit("request", {
            userId: this.state.request.userId,
            driverId: this.state.dData._id,
            driverName: this.state.dData.firstName,
            contact: this.state.dData.phone,
            status: "accepted"
        });
        this.setState({start: true, driverFree: true});
    }

    declineRide = () => {
        this.socket.emit("request", {
            userId: this.state.request.userId,
            driverId: this.state.dData._id,
            status: "declined"
        });
        this.setState({request: null});
    }

    endTrip = (price) => {
        this.socket.emit("price", {
            finalPrice: price,
            userId: this.state.request.userId,
            driverId: this.state.dData._id,
        })
        this.setState({finalPrice: price});
        this.sendTrip();
    };

    sendTrip = () =>{
        let driverId = this.state.dData._id
        let driverPhone = this.state.dData.phone
        let price = this.state.request.priceRange
        let distance = this.state.request.distance
        let pName = this.state.request.senderName
        let dName = this.state.dData.firstName+" "+ this.state.dData.lastName
        let pPhone = this.state.request.contact
        let destination = this.state.request.placeName
        fetch("http://192.168.43.233:9000/api/sales/addSale/", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                driverId: driverId,
                phone: driverPhone,
                price: price,
                date: Date.now,
                distance: distance,
                passengerName: pName,
                driverName: dName,
                passengerPhone: pPhone,
                destination: destination,
            })
          })
    }

    close = () => {
        this.setState({
            request: null, 
            driverFree: false, 
            start: false, 
            startTrip: false, 
            finalPrice: null
        });
    }

    calcPrice = () => {
        let distance = this.state.request.distance;
        let price = null;
        if (0 < distance && distance <= 1) {
            price = "GH₵ 4";
        } else if (1 < distance && distance <= 1.5) {
            price = "GH₵ 5";
        } else if (1.5 < distance && distance <= 2) {
            price = "GH₵ 6";
        } else if (2 < distance && distance <= 2.5) {
            price = "GH₵ 7";
        } else if (2.5 < distance && distance <= 3) {
            price = "GH₵ 8";
        } else if (3 < distance && distance <= 3.5) {
            price = "GH₵ 9";
        } else if (3.5 < distance && distance <= 4) {
            price = "GH₵ 10";
        } else if (4 < distance && distance <= 4.5) {
            price = "GH₵ 11";
        } else if (4.5 < distance && distance <= 5) {
            price = "GH₵ 12";
        } else if (5 < distance && distance <= 5.5) {
            price = "GH₵ 13";
        } else if (5.5 < distance && distance <= 6) {
            price = "GH₵ 14";
        } else if (6 < distance && distance <= 6.5) {
            price = "GH₵ 15";
        } else if (6.5 < distance && distance <= 7) {
            price = "GH₵ 16";
        } else if (7 < distance && distance <= 7.5) {
            price = "GH₵ 17";
        } else if (7.5 < distance && distance <= 8) {
            price = "GH₵ 18";
        } else if (8 < distance && distance <= 8.5) {
            price = "GH₵ 19";
        } else if (8.5 < distance && distance <= 9) {
            price = "GH₵ 20";
        } else if (9 < distance && distance <= 9.5) {
            price = "GH₵ 21";
        } else if (9.5 < distance && distance <= 10) {
            price = "GH₵ 22";
        } else if (10 < distance && distance <= 10.5) {
            price = "GH₵ 23";
        } else if (10.5 < distance && distance <= 11) {
            price = "GH₵ 24";
        } else if (11 < distance && distance <= 11.5) {
            price = "GH₵ 25";
        } else if (11.5 < distance && distance <= 12) {
            price = "GH₵ 26";
        } else if (12 < distance && distance <= 12.5) {
            price = "GH₵ 27";
        } else if (12.5 < distance && distance <= 13) {
            price = "GH₵ 28";
        } else if (13 < distance && distance <= 13.5) {
            price = "GH₵ 29";
        } else if (13.5 < distance && distance <= 14) {
            price = "GH₵ 30";
        } else if (14 < distance && distance <= 14.5) {
            price = "GH₵ 31";
        } else if (14.5 < distance && distance <= 15) {
            price = "GH₵ 32";
        } else if (15 < distance && distance <= 15.5) {
            price = "GH₵ 33";
        } else if (15.5 < distance && distance <= 16) {
            price = "GH₵ 34";
        } else if (16 < distance && distance <= 16.5) {
            price = "GH₵ 35";
        } else if (16.5 < distance && distance <= 17) {
            price = "GH₵ 36";
        } else if (17 < distance && distance <= 17.5) {
            price = "GH₵ 37";
        } else if (17.5 < distance && distance <= 18) {
            price = "GH₵ 38";
        } else if (18 < distance && distance <= 18.5) {
            price = "GH₵ 39";
        } else if (18.5 < distance && distance <= 19) {
            price = "GH₵ 40";
        } else if (19 < distance && distance <= 19.5) {
            price = "GH₵ 41";
        } else if (19.5 < distance && distance <= 20) {
            price = "GH₵ 42";
        } else if (20 < distance && distance <= 20.5) {
            price = "GH₵ 43";
        } else if (20.5 < distance && distance <= 21) {
            price = "GH₵ 44";
        } else if (21 < distance && distance <= 21.5) {
            price = "GH₵ 45";
        } else if (21.5 < distance && distance <= 22) {
            price = "GH₵ 46";
        } else if (22 < distance && distance <= 22.5) {
            price = "GH₵ 47";
        } else if (22.5 < distance && distance <= 23) {
            price = "GH₵ 48";
        } else if (23 < distance && distance <= 23.5) {
            price = "GH₵ 49";
        } else if (23.5 < distance && distance <= 24) {
            price = "GH₵ 50";
        } else if (24 < distance && distance <= 25) {
            price = "GH₵ 51";
        } else if (25 < distance && distance <= 26) {
            price = "GH₵ 52";
        } else if (26 < distance && distance <= 27) {
            price = "GH₵ 53";
        } else if (27 < distance && distance <= 28) {
            price = "GH₵ 54";
        } else if (28 < distance && distance <= 29) {
            price = "GH₵ 55";
        } else if (29 < distance && distance <= 30) {
            price = "GH₵ 56";
        } else if (30 < distance && distance <= 31) {
            price = "GH₵ 57";
        } else if (31 < distance && distance <= 32) {
            price = "GH₵ 58";
        } else if (32 < distance && distance <= 33) {
            price = "GH₵ 59";
        } else if (33 < distance && distance <= 34) {
            price = "GH₵ 60";
        } else if (34 < distance && distance <= 35) {
            price = "GH₵ 61";
        } else if (35 < distance && distance <= 36) {
            price = "GH₵ 62";
        } else if (36 < distance && distance <= 37) {
            price = "GH₵ 63";
        } else if (37 < distance && distance <= 38) {
            price = "GH₵ 64";
        } else if (38 < distance && distance <= 39) {
            price = "GH₵ 65";
        } else if (39 < distance && distance <= 40) {
            price = "GH₵ 66";
        } else if (40 < distance && distance <= 41) {
            price = "GH₵ 68";
        } else if (41 < distance && distance <= 42) {
            price = "GH₵ 70";
        }
        this.endTrip(price)
        return price;
    }

    render() {
        return (
            <Provider>
                {this.geocoordinates()}
                {this.state.request === null ?
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.initialRegion}
                        showsUserLocation={true}
                    >
                    </MapView>
                    :
                    <MapView style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={this.state.initialRegion}
                        showsUserLocation={true}>
                        <Marker
                            coordinate={this.state.request.origin}
                        >
                            <View>
                                <Image style={styles.pinImage} source={require('../icons/user.png')} />
                            </View>
                        </Marker>
                        <Marker coordinate={this.state.request.destination} />
                        <MapViewDirections
                            origin={this.state.request.origin}
                            destination={this.state.request.destination}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            apikey={ApiKey.key}
                        />
                    </MapView>
                }
                <View style={{ backgroundColor: '#fff', }}>
                    {this.state.request === null ?
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
                        </View>
                        :
                        <View style={styles.tabContainer}>
                           { this.state.start === false ? 
                           <View>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12 }}>
                                    <Text style={{ fontSize: 15 }}>Sender Name:</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{this.state.request.senderName}</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12 }}>
                                    <Text style={{ fontSize: 15 }}>Contact:</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{this.state.request.contact}</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12 }}>
                                    <Text style={{ fontSize: 15 }}>Going To:</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{this.state.request.placeName}</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12 }}>
                                    <Text style={{ fontSize: 15 }}>Price Range:</Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{this.state.request.priceRange}</Text>
                                </View>
                                <View style={{ alignItems: "center", justifyContent: "center", marginTop: "5%", flexDirection: "row", paddingHorizontal: 18 }}>
                                    <Button mode="contained" color="rgba(0, 54, 58, 0.8)" style={{ width: "65%", marginRight: 10 }} onPress={() => this.confirmRide()}>
                                        Accept Ride
                                    </Button>
                                    <Button
                                        mode="contained" color="rgba(0, 54, 58, 0.8)"
                                        onPress={() => this.declineRide()}
                                        icon="close"
                                    >
                                        Decline
                                    </Button>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={styles.switch}>
                                        { this.state.startTrip === false ?
                                        <Button mode="contained" color="rgba(0, 54, 58, 0.8)" style={{ width: "65%", marginVertical: 10 }} onPress={() => this.setState({startTrip: true})}>
                                            Start trip
                                        </Button>
                                        :
                                        <View style={{width: "100%", alignItems: "center"}}>
                                        { this.state.finalPrice === null ?
                                            <Button mode="contained" color="rgba(0, 54, 58, 0.8)" style={{ width: "65%", marginVertical: 10 }} onPress={() => this.calcPrice()}>
                                            End trip
                                            </Button>
                                            :
                                            <View></View>
                                            }
                                        </View>
                                        }
                                </View>
                                { this.state.startTrip === true ?
                                    <View style={{alignItems: "center"}}>
                                        {   this.state.finalPrice === null ?
                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12, paddingBottom: 5 }}>
                                            <Text style={{ fontSize: 15 }}>Going To:</Text>
                                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{this.state.request.placeName}</Text>
                                            </View>
                                        :
                                            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 18, marginBottom: 5, paddingTop: 12 }}>
                                            <Text style={{ fontSize: 15, alignSelf: "center" }}>Final fare:</Text>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", alignSelf: "center"}}>{this.state.finalPrice}</Text>
                                            <Button mode="contained" icon="close" color="rgba(0, 54, 58, 0.8)" style={{marginVertical: 10}} onPress={() => this.close()}>
                                                close
                                            </Button>
                                            </View>
                                        }
                                    </View>
                                :
                                    <View></View>
                                }
                            </View>
                            }
                        </View>
                    }
                </View>
            </Provider>
        );
    }
};


export default Drivers;