import React, { Component } from 'react';
import { View, ToastAndroid, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Drawer, Avatar, Portal, Modal, Button } from 'react-native-paper';
import styles from '../styles/homeStyles';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
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

    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: 6.68848,
                longitude: -1.62443,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0071
            },
            markers: AdeIcon,
            showInput: false,
            addressQuery: '',
            predictions: [],
            destination: {
                latitude: 6.68848,
                longitude: -1.62443,
            },
            distance: null,
            placeName: "",
        }
    }

    componentDidMount() {
        this.destinationRenderer();
        this.getCurrentLocation();
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
            this.setState({ initialRegion: initialRegion })
        },
            (error) => console.log(JSON.stringify("location access failed")),
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
            {latitude: start.latitude, longitude: start.longitude},
            {latitude: finish.latitude, longitude: finish.longitude}
        )
        let kmDist = dis/1000
        this.setState({distance: kmDist})
    }

    calcPrice = () => {
        let priceRange = "";
        let distance = this.state.distance;
        if( 0 < distance && distance <= 1.5) {
           priceRange = "GH₵ 4 - 5";
        } else if(1.5 < distance && distance <= 2.5) {
            priceRange = "GH₵ 5 - 6";
        } else if(2.5 < distance && distance <= 3.5) {
            priceRange = "GH₵ 6 - 7";
        } else if(3.5 < distance && distance <= 4.5){
            priceRange = "GH₵ 7 - 8";
        } else if(4.5 < distance && distance <= 5.5){
            priceRange = "GH₵ 8 - 9";
        } else if(5.5 < distance && distance <= 6.5){
            priceRange = "GH₵ 9 - 10";
        } else if(6.5 < distance && distance <= 7.5){
            priceRange = "GH₵ 10 - 11";
        } else if(7.5 < distance && distance <= 8.5){
            priceRange = "GH₵ 11 - 12";
        } else if(8.5 < distance && distance <= 9.5){
            priceRange = "GH₵ 12 - 15";
        } else if(9.5 < distance && distance <= 10){
            priceRange = "GH₵ 15 - 18";
        } else if(10 < distance && distance <= 11){
            priceRange = "GH₵ 18 - 20";
        } else if(11 < distance && distance <= 12){
            priceRange = "GH₵ 20 - 25";
        } else if(12 < distance && distance <= 13){
            priceRange = "GH₵ 25 - 30";
        } else if(13 < distance && distance <= 14){
            priceRange = "GH₵ 30 - 35";
        } else if(14 < distance && distance <= 15){
            priceRange = "GH₵ 35 - 40";
        } else if(15 < distance && distance <= 16){
            priceRange = "GH₵ 40 - 47";
        }
        return priceRange;
    }

    closeSearch = () => {
        let destination = {
            latitude: 6.68848,
            longitude: -1.62443,
        }
        this.setState({ destination: destination })
    }

    // destination(cords) {
    //     return (
    //         <Marker coordinate={{ "latitude": this.state.destination.latitude, "longitude": this.state.destination.longitude }} />
    //     )
    // }

    // directions = () => {
    //     let origin = this.state.initialRegion
    //     let destination = this.state.destination
    //     return (
    //         <MapViewDirections
    //             origin={origin}
    //             destination={destination}
    //             strokeWidth={3}
    //             strokeColor="hotpink"
    //             apikey={ApiKey.key}
    //         />
    //     )
    // }

    keyExtractor = item => item.placeID;

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

    showInput = () => {
        this.setState({ showInput: true });
    }

    renderSearch = () => {
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
                            <View style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
                                <Image source={require("../icons/ade.png")} style={{width: 55, height: 55, resizeMode: "contain"}} />
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 18}}>
                                <Text style={{alignSelf: "center", color: "black", fontSize: 20, fontWeight: "bold"}}>Adedeta</Text>
                                <Text style={{alignSelf: "center", color: "black", fontSize: 18,}}>{this.calcPrice()}</Text>
                            </View>
                            <View style={{paddingHorizontal: 18, width: "100%", borderBottomWidth: 1, borderColor: "rgba(0, 54, 58, 0.8)", marginVertical: "5%"}}>
                                <Text style={{color: "black", fontSize: 16}}>{this.state.placeName}</Text>
                                <Text style={{color: "black", fontSize: 16}}>Distance of {this.state.distance}km</Text>
                                <Text style={{color: "#e0e0e0"}}>Affordable everyday rides</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={()=>alert("payment with Aipay digital wallet, coming soon!!!")}
                                style={{flexDirection: "row", justifyContent: "space-between", marginTop: 6, width: "100%", paddingHorizontal: 18}}>
                                <Image source={require("../images/aiPay.png")} style={{width: 30, height: 30, resizeMode: "contain"}} />
                                <Text style={{color: "black", fontSize: 16, alignSelf: "center"}}>AiPay </Text>
                                <Image source={require("../icons/next.png")} style={{width: 20, height: 20, resizeMode: "contain", alignSelf: "center"}} />
                            </TouchableOpacity>
                            <View style={{alignItems: "center", justifyContent: "center", width: "90%", marginTop: "5%", flexDirection: "row"}}>
                                <Button mode="contained" color="rgba(0, 54, 58, 0.8)" style={{width: "70%", marginRight: 10}} onPress={()=>alert("request is being processed")}>
                                    CONFIRM RIDE
                                </Button>
                                <Button 
                                mode="contained" color="rgba(0, 54, 58, 0.8)"  
                                onPress={()=>this.closeSearch()}
                                icon="close"
                                >
                                    cancel
                                </Button>
                            </View>
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
                                keyExtractor={this.keyExtractor}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1 }}
                            />
                        </View>
                    </View>
                }
            </View>
        )
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
                                            <Image style={styles.pinImage} source={require('../icons/ade.png')} />
                                        </View>
                                    </Marker>
                                ))}
                            </MapView>
                            <Callout>
                                <TouchableOpacity style={{ marginTop: "10%", marginLeft: "10%" }} onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Image source={require("../images/menu.png")} style={{ height: 40, width: 40 }} />
                                </TouchableOpacity>
                            </Callout>
                        </View>
                        :
                        <View style={styles.mapContainer}>
                            {this.getCurrentLocation()}
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
                                        coordinate={marker.coordinates}
                                        title={marker.title}
                                    >
                                        <View>
                                            <Text style={styles.pinText}>{marker.title}</Text>
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
        return (
            <View style={styles.container}>
                {this.destinationRenderer()}
                {this.renderSearch()}
            </View>
        );
    }
}

export default HomeScreen;