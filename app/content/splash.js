import React, { Component } from 'react';
import { View, Text, ImageBackground } from "react-native";
import Register from "./Signup";
import styles from '../styles/splashStyle';


class splash extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount(){
        this.athenticateUser();
    }

    athenticateUser = () => {
        setTimeout(() => {
            this.props.navigation.navigate(Register)
        }, 3000);
    }

    render() {
        return (
            <ImageBackground
                source={require("../images/adeSplash.jpg")}
                style={styles.imageBackground}
            >
            </ImageBackground>
        );
    }
}

export default splash;