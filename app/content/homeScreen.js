import React, { Component } from 'react';
import { View, ToastAndroid, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Drawer, Avatar, Portal, Modal, Button } from 'react-native-paper';
import styles from '../styles/homeStyles';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import SocketIOClient from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import getDistance from 'geolib/es/getDistance';
const AdeIcon = require("../adedetas/adedeta");
const ApiKey = require("../config/apiKey/apiKey");

type Props = {};
type State = {
    showInput: boolean,
    addressQuery: string,
    predictions: Array<any>
}

class HomeScreen extends Component<Props, State> {
    socket: Object;


    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: 6.68848,
                longitude: -1.62443,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0071
            },
            markers: null,
            showInput: false,
            addressQuery: '',
            predictions: [],
            destination: {
                latitude: 6.68848,
                longitude: -1.62443,
            },
            distance: null,
            placeName: "",
            showConfirm: false,
            driverId: "",
            userData: [],
            animating: false,
            drDetails: null,
            fiinalPrice: null,
        }
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.destinationRenderer();
        this.socket = SocketIOClient('http://192.168.43.233:8500');
        this.getData();
        this.socket.on("message", driverLocation => {
            // console.log(driverLocation);
            this.setState({ markers: driverLocation });
        });
        this.socket.on("request", dRequest => {
            this.setState({drDetails: dRequest });
        });
        this.socket.on("price", price => {
            console.log(price);
            this.setState({fiinalPrice: price });
        });
    };

    componentWillUnmount() {
        this.socket.emit('disconnect', {
            senderId: this.state.userData._id
        });
    }

    getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('data')
            let parsedToken = JSON.parse(userData);
            this.setState({ userData: parsedToken })
            this._emit(parsedToken);
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    _emit = (parsedToken) => {
        this.socket.emit('init', {
            userId: parsedToken._id
        });
    }

    getCurrentLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0071
            }
            this.setState({ initialRegion: initialRegion });
        },
            (error) => alert(JSON.stringify("location access failed")),
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 3000 });
    }

    onQueryChange = (text) => {
        this.setState({ addressQuery: text });
        RNGooglePlaces.getAutocompletePredictions(this.state.addressQuery, {
            country: 'GH'
        })
            .then((places) => {
                this.setState({ predictions: places });
            })
            .catch(error => console.log(error.message));
    }

    onSelectSuggestion(placeID) {
        // getPlaceByID call here
        RNGooglePlaces.lookUpPlaceByID(placeID)
            .then((results) => {
                let name = results.name
                let cords = {
                    latitude: results.viewport.latitudeNE,
                    longitude: results.viewport.longitudeNE
                };
                this.setState({ destination: cords, placeName: name })
                // this.destination(cords);
                // this.directions();
                this.calcDistance();
            })
            .catch((error) => console.log(error.message));

        this.setState({
            showInput: false,
            predictions: []
        });
    }

    calcDistance = () => {
        let start = {
            "latitude": this.state.initialRegion.latitude,
            "longitude": this.state.initialRegion.longitude
        }
        let finish = {
            "latitude": this.state.destination.latitude,
            "longitude": this.state.destination.longitude
        }
        let dis = getDistance(
            { latitude: start.latitude, longitude: start.longitude },
            { latitude: finish.latitude, longitude: finish.longitude }
        )
        let kmDist = dis / 1000
        this.setState({ distance: kmDist })
    }

    onSelectDriver = (item) => {
        this.setState({ driverId: item.driverId, showConfirm: true });
    }

    calcPrice = () => {
        let priceRange = "";
        let distance = this.state.distance;
        if (0 < distance && distance <= 1) {
            priceRange = "GH₵ 4";
        } else if (1 < distance && distance <= 2) {
            priceRange = "GH₵ 5 - 6";
        } else if (2 < distance && distance <= 3) {
            priceRange = "GH₵ 6 - 8";
        } else if (3 < distance && distance <= 4) {
            priceRange = "GH₵ 8 - 10";
        } else if (4 < distance && distance <= 5) {
            priceRange = "GH₵ 10 - 12";
        } else if (5 < distance && distance <= 6) {
            priceRange = "GH₵ 12 - 14";
        } else if (6 < distance && distance <= 7) {
            priceRange = "GH₵ 14 - 16";
        } else if (7 < distance && distance <= 8) {
            priceRange = "GH₵ 16 - 18";
        } else if (8 < distance && distance <= 9) {
            priceRange = "GH₵ 18 - 20";
        } else if (9 < distance && distance <= 10) {
            priceRange = "GH₵ 20 - 22";
        } else if (10 < distance && distance <= 11) {
            priceRange = "GH₵ 22 - 24";
        } else if (11 < distance && distance <= 12) {
            priceRange = "GH₵ 24 - 26";
        } else if (12 < distance && distance <= 13) {
            priceRange = "GH₵ 26 - 28";
        } else if (13 < distance && distance <= 14) {
            priceRange = "GH₵ 28 - 30";
        } else if (14 < distance && distance <= 15) {
            priceRange = "GH₵ 31 - 33";
        } else if (15 < distance && distance <= 16) {
            priceRange = "GH₵ 33 - 35";
        } else if (16 < distance && distance <= 17) {
            priceRange = "GH₵ 35 - 37";
        } else if (17 < distance && distance <= 18) {
            priceRange = "GH₵ 37 - 38";
        } else if (18 < distance && distance <= 19) {
            priceRange = "GH₵ 38 - 40";
        } else if (19 < distance && distance <= 20) {
            priceRange = "GH₵ 40 - 42";
        } else if (20 < distance && distance <= 21) {
            priceRange = "GH₵ 42 - 44";
        } else if (21 < distance && distance <= 22) {
            priceRange = "GH₵ 44 - 46";
        } else if (22 < distance && distance <= 23) {
            priceRange = "GH₵ 46 - 48";
        } else if (23 < distance && distance <= 24) {
            priceRange = "GH₵ 48 - 50";
        } else if (24 < distance && distance <= 25) {
            priceRange = "GH₵ 50 - 51";
        } else if (25 < distance && distance <= 26) {
            priceRange = "GH₵ 51 - 52";
        } else if (26 < distance && distance <= 27) {
            priceRange = "GH₵ 52 - 53";
        } else if (27 < distance && distance <= 28) {
            priceRange = "GH₵ 53 - 54";
        } else if (28 < distance && distance <= 29) {
            priceRange = "GH₵ 54 - 55";
        } else if (29 < distance && distance <= 30) {
            priceRange = "GH₵ 55 - 56";
        } else if (30 < distance && distance <= 31) {
            priceRange = "GH₵ 56 - 57";
        } else if (31 < distance && distance <= 32) {
            priceRange = "GH₵ 57 - 58";
        } else if (32 < distance && distance <= 33) {
            priceRange = "GH₵ 58 - 59";
        } else if (33 < distance && distance <= 34) {
            priceRange = "GH₵ 59 - 60";
        } else if (34 < distance && distance <= 35) {
            priceRange = "GH₵ 60 - 61";
        } else if (35 < distance && distance <= 36) {
            priceRange = "GH₵ 61 - 62";
        } else if (36 < distance && distance <= 37) {
            priceRange = "GH₵ 62 - 63";
        } else if (37 < distance && distance <= 38) {
            priceRange = "GH₵ 63 - 64";
        } else if (38 < distance && distance <= 39) {
            priceRange = "GH₵ 64 - 65";
        } else if (39 < distance && distance <= 40) {
            priceRange = "GH₵ 65 - 66";
        } else if (40 < distance && distance <= 41) {
            priceRange = "GH₵ 66 - 68";
        } else if (41 < distance && distance <= 42) {
            priceRange = "GH₵ 68 - 70";
        } 
        return priceRange;
    }

    closeSearch = () => {
        let destination = {
            latitude: 6.68848,
            longitude: -1.62443,
        }
        this.setState({ destination: destination, animating: false });
    }

    keyExtractor = item => item.placeID;

    waiting = () => {
        let animating = this.state.animating;
        return (
            <View>
                {
                    this.state.animating === false ?
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: "5%", flexDirection: "row", paddingHorizontal: 18 }}>
                            <Button mode="contained" color="rgba(0, 54, 58, 0.8)" style={{ width: "65%", marginRight: 10 }} onPress={() => this.confirmRide()}>
                                CONFIRM RIDE
                        </Button>
                            <Button
                                mode="contained" color="rgba(0, 54, 58, 0.8)"
                                onPress={() => this.closeSearch()}
                                icon="close"
                            >
                                cancel
                        </Button>
                        </View>
                        :
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: "5%", flexDirection: "row", paddingHorizontal: 18 }}>
                            <ActivityIndicator
                                animating={animating}
                                size="small"
                                color="blue"
                            />
                            <Text style={{ marginLeft: "10%", color: "black", borderRadius: 10, paddingVertical: 6, paddingHorizontal: 5 }}>
                                Connecting to driver please wait
                        </Text>
                        </View>
                }
            </View>
        )
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.listItemWrapper}>
                <TouchableOpacity style={styles.listItem}
                    onPress={() => this.onSelectSuggestion(item.placeID)}>
                    <View style={styles.avatar}>
                        <Image style={styles.listIcon} source={require('../icons/home.png')} />
                    </View>
                    <View style={styles.placeMeta}>
                        <Text style={styles.primaryText}>{item.primaryText}</Text>
                        <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>
        );
    }

    completed = () => {
        let desti = {
            latitude: 6.68848,
            longitude: -1.62443,
        }
        this.setState({ animating: false, showInput: false, destination: desti })
    }

    showInput = () => {
        this.setState({ showInput: true });
    }

    keyExtracted = item => item.index;

    renderDriver = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.onSelectDriver(item)}>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 15 }}>Driver Name:</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.driverName}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 15 }}>Contact:</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.contact}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 15 }}>Number Plate:</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.numberPlate}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 15 }}>Driver status:</Text>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.currentStatus}</Text>
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

    renderSearch = () => {
        let desi = this.state.destination.latitude;
        return (
            <View style={styles.tabsContainer}>
                {this.state.showInput === false ?
                    <View>
                        {
                            this.state.destination.latitude === 6.68848 || this.state.destination.latitude === undefined ?
                                <View style={styles.tabContainer}>
                                    <TouchableOpacity style={styles.whereTo} onPress={() => this.showInput()}>
                                        <Text style={styles.whereText}>Where to ....?</Text>
                                        <Text style={{ alignSelf: "center" }}>  pick a place, we will get u there</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.tab1Container}>
                                    {this.state.showConfirm === false ?
                                        <View>
                                            <Text style={{ borderBottomWidth: 1, alignSelf: "center", fontSize: 18 }}>Select Driver</Text>
                                            <FlatList
                                                data={this.state.markers}
                                                renderItem={this.renderDriver}
                                                keyExtractor={this.keyExtractor}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                        :
                                        <View>
                                            {this.state.drDetails === null ?
                                                <View style={{ alignSelf: "center", }}>
                                                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                                                        <Image source={require("../icons/ade.png")} style={{ width: 55, height: 55, resizeMode: "contain" }} />
                                                    </View>
                                                    <View style={{ flexDirection: "row", paddingHorizontal: 18 }}>
                                                        <Text style={{ marginRight: "50%", fontSize: 16, alignSelf: "center" }}>Adedeta</Text>
                                                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}> {this.calcPrice()} </Text>
                                                    </View>
                                                    <View style={{ paddingHorizontal: 18, borderBottomWidth: 1, borderColor: "rgba(0, 54, 58, 0.8)", marginVertical: "5%" }}>
                                                        <Text style={{ color: "black", fontSize: 16 }}>{this.state.placeName}</Text>
                                                        <Text style={{ color: "black", fontSize: 16 }}>Distance of {this.state.distance}km</Text>
                                                        <Text style={{ color: "#e0e0e0" }}>Affordable everyday rides</Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => alert("payment with Aipay digital wallet, coming soon!!!")}
                                                        style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6, paddingHorizontal: 18 }}>
                                                        <Image source={require("../images/aiPay.png")} style={{ width: 30, height: 30, resizeMode: "contain" }} />
                                                        <Text style={{ color: "black", fontSize: 16, alignSelf: "center", marginLeft: "30%", marginRight: "30%" }}>AiPay </Text>
                                                        <Image source={require("../icons/next.png")} style={{ width: 20, height: 20, resizeMode: "contain", alignSelf: "center" }} />
                                                    </TouchableOpacity>
                                                    {this.waiting()}
                                                </View>
                                                :
                                                <View style={{ alignItems: "center" }}>
                                                    <View>
                                                        <Text style={{ fontSize: 16, alignSelf: "center" }}>Hi am </Text>
                                                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.state.drDetails.driverName}, </Text>
                                                        <Text style={{ fontSize: 16, alignSelf: "center" }}>am on my way to pick you up. </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 16, alignSelf: "center" }}>My contact is </Text>
                                                        <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.state.drDetails.contact}, </Text>
                                                    </View>
                                                    <View>
                                                        {this.state.fiinalPrice === null ?
                                                            <View>
                                                                <Text style={{ color: "#e0e0e0", borderBottomWidth: 1, borderColor: "black" }}>final price will be shown once trip ends!!!</Text>
                                                            </View>
                                                            :
                                                            <View>
                                                                <Text style={{ fontSize: 16, alignSelf: "center" }}>final price is: </Text>
                                                                <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>{this.state.fiinalPrice.fiinalPrice}</Text>
                                                                <Button mode="contained" color="rgba(0, 54, 58, 0.8)"
                                                                    style={{ width: "65%", marginRight: 10, marginVertical: 13 }}
                                                                    onPress={() => this.completed()}>
                                                                    Ride Completed
                                                                </Button>
                                                            </View>
                                                        }
                                                    </View>
                                                </View>
                                            }
                                        </View>
                                    }
                                </View>
                        }
                    </View>
                    :
                    <View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                ref={input => this.pickUpInput = input}
                                style={styles.input}
                                value={this.props.addressQuery}
                                onChangeText={this.onQueryChange}
                                placeholder={'Destination'}
                                placeholderTextColor='#9BABB4'
                                underlineColorAndroid={'transparent'}
                                autoFocus
                            />
                            <TouchableOpacity onPress={() => this.setState({ showInput: false })}>
                                <Image
                                    style={{ width: 30, height: 30, resizeMode: "contain", alignSelf: "center" }}
                                    source={require("../icons/close.png")} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.list}>
                            <FlatList
                                data={this.state.predictions}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtracted}
                                showsVerticalScrollIndicator={true}
                                contentContainerStyle={{ flexGrow: 1 }}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    };

    confirmRide = () => {
        this.setState({ animating: true });
        let pRange = this.calcPrice();
        this.socket.emit('driveRequest', {
            userId: this.state.userData._id,
            senderName: this.state.userData.userName,
            contact: this.state.userData.phoneNumber,
            driverId: this.state.driverId,
            origin: this.state.initialRegion,
            destination: this.state.destination,
            distance: this.state.distance,
            priceRange: pRange,
            placeName: this.state.placeName,
        });
    }

    destinationRenderer = () => {
        let origin = this.state.initialRegion
        let destination = this.state.destination
        return (
            <View style={styles.container}>
                {
                    this.state.destination.latitude === 6.68848 || this.state.destination.latitude === undefined ?
                        <View style={styles.mapContainer}>
                            {this.getCurrentLocation()}
                            {this.state.markers === null ?
                                <MapView style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.initialRegion}
                                    showsUserLocation={true}>
                                </MapView>
                                :
                                <MapView style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.initialRegion}
                                    showsUserLocation={true}>
                                    {this.state.markers.map((marker, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={marker.initialRegion}
                                            title={marker.driverName}
                                        >
                                            <View style={{ alignItems: "center" }}>
                                                <Image style={styles.pinImage} source={require('../icons/ade.png')} />
                                            </View>
                                        </Marker>
                                    ))}
                                </MapView>
                            }
                            <Callout>
                                <TouchableOpacity style={{ marginTop: "10%", marginLeft: "10%" }} onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Image source={require("../images/menu.png")} style={{ height: 40, width: 40 }} />
                                </TouchableOpacity>
                            </Callout>
                        </View>
                        :
                        <View style={styles.mapContainer}>
                            {this.getCurrentLocation()}
                            {this.state.markers === null ?
                                <MapView style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.initialRegion}
                                // showsUserLocation={true}
                                >
                                    {!!this.state.initialRegion.latitude && !!this.state.initialRegion.longitude && <MapView.Marker
                                        coordinate={{ "latitude": this.state.initialRegion.latitude, "longitude": this.state.initialRegion.longitude }}
                                        title={"Your Location"}
                                        pinColor={"blue"}
                                    />}
                                    <Marker coordinate={{ "latitude": this.state.destination.latitude, "longitude": this.state.destination.longitude }} />
                                    <MapViewDirections
                                        origin={origin}
                                        destination={destination}
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                        apikey={ApiKey.key}
                                    />
                                </MapView>
                                :
                                <MapView style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={this.state.initialRegion}
                                // showsUserLocation={true}
                                >
                                    {!!this.state.initialRegion.latitude && !!this.state.initialRegion.longitude && <MapView.Marker
                                        coordinate={{ "latitude": this.state.initialRegion.latitude, "longitude": this.state.initialRegion.longitude }}
                                        title={"Your Location"}
                                        pinColor={"blue"}
                                    />}
                                    {this.state.markers.map((marker, index) => (
                                        <Marker
                                            key={index}
                                            coordinate={marker.initialRegion}
                                            title={marker.driverName}
                                        >
                                            <View>
                                                <Image style={styles.pinImage} source={require('../icons/ade.png')} />
                                            </View>
                                        </Marker>
                                    ))}
                                    <Marker coordinate={{ "latitude": this.state.destination.latitude, "longitude": this.state.destination.longitude }} />
                                    <MapViewDirections
                                        origin={origin}
                                        destination={destination}
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                        apikey={ApiKey.key}
                                    />
                                </MapView>
                            }
                            <Callout>
                                <TouchableOpacity style={{ marginTop: "10%", marginLeft: "10%" }} onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Image source={require("../images/menu.png")} style={{ height: 40, width: 40 }} />
                                </TouchableOpacity>
                            </Callout>
                        </View>
                }
            </View>
        )
    }

    render() {
        // console.log(this.state.userData.userName +"....."+this.state.userData.phoneNumber);
        return (
            <View style={styles.container}>
                {this.destinationRenderer()}
                {this.renderSearch()}
            </View>
        );
    }
}

export default HomeScreen;