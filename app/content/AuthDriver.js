import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Drawer, Avatar, Portal, Modal, Provider, Button, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Drivers from "./drivers";
import HomeScreen from "./homeScreen";

class AuthDriver extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false,
            isLoading: true,
            code: "",
         };
    }

    getData = async () => {
        try {
          const rawCode = await AsyncStorage.getItem('code')
          let code = JSON.parse(rawCode)
          // console.log(code);
          if(code === null) {
              this.showModal();
          } else {
              this.props.navigation.navigate(Drivers);
          }
        } catch(e) {
          // error reading value
          console.log(e);
        }
      }

    componentDidMount(){
        this.getData()
    }

    showModal = () => {
        this.setState({ modalVisible: true })
    }

    cancel = () => {
        this.setState({ modalVisible: false })
        this.props.navigation.navigate(HomeScreen)
    }

    send = () => {
        if (this.state.code) {
            this.setState({ modalVisible: false })
            this.textInput.clear();
            this.props.navigation.navigate(Drivers);
        } else {
            alert("Please enter a correct code to continue");
            this.textInput.clear();
        }
    }

    render() {
        return (
            <Provider>
            <Portal>
                    <Modal contentContainerStyle={{alignItems: "center"}} visible={this.state.modalVisible} dismissable={false}>
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 54, 58, 0.8)",
        width: "80%",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 10
    },
    note: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 18,
        marginHorizontal: 5,
        color: "#fff"
    },
    send: {
        backgroundColor: "#ccc", 
        justifyContent: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        width: 40,
        alignItems: "center",
        borderColor: "#ff6600",
        borderWidth: 1,
    },
    textInput: {
        borderBottomWidth: 1,
        width: "65%",
        textAlign: "center",
        backgroundColor: "#ccc",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: "#ff6600",
    },
    notes: {
        textAlign: "center",
        marginBottom: 5,
        marginHorizontal: 5,
        color: "#ccc"
    },
    button: {
        backgroundColor: "#ff6600",
        borderRadius: 15,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
})

export default AuthDriver;