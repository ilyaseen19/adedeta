import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Register from "./Signup";
import styles from '../styles/splashStyle';
import HomeScreen from './homeScreen';


class splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: true
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('data')
            let parsedToken = JSON.parse(userData)
            let userId = parsedToken
            // console.log(parsedToken);
            if (userId === null) {
                this.loginTiming();
            } else {
                this.homeTiming();
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    homeTiming = () => {
        setTimeout(() => {
            this.props.navigation.navigate(HomeScreen);
            this.setState({ animating: false });
        }, 3000);
    }

    loginTiming = () => {
        setTimeout(() => {
            this.props.navigation.navigate(Register);
            this.setState({ animating: false });
        }, 3000);
    }


    render() {
        let animating = this.state.animating
        return (
            <ImageBackground
                source={require("../images/adeSplash.jpg")}
                style={styles.imageBackground}
            >
                <ActivityIndicator
                    animating={animating}
                    size="large"
                    color="#ccc"
                />
            </ImageBackground>
        );
    }
}

export default splash;