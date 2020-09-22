import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import { Drawer, Avatar, Portal, Modal } from 'react-native-paper';
import Settings from "./settings";
import AuthDriver from "./AuthDriver";
import Prices from "./prices";

export function DrawerFile(props) {

    const [userData, setUser] = useState([]);
    const [userImage, setImage] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const userData = await AsyncStorage.getItem('data')
            const image = await AsyncStorage.getItem('image')
            let data = JSON.parse(userData)
            let uImage = JSON.parse(image)
            // console.log(data);
            setUser(data);
            setImage(uImage);
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    const renderImage = () => {
        return (
            <View
                style={{ alignItems: "center" }}
            >
                <View>
                    {userImage === "" ?
                        <Avatar.Image
                            source={require("../images/user.png")}
                            size={120}
                            style={{ backgroundColor: "#ccc" }}
                        />
                        :
                        <Avatar.Image
                            source={userImage}
                            size={120}
                            style={{ backgroundColor: "#ccc" }}
                        />}
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 20 }}>{userData.userName}</Text>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 15 }}>{userData.phoneNumber}</Text>
                </View>
            </View>
        )
    }

    // console.log(userData);
    return (
        <View style={{ flex: 1, backgroundColor: "rgba(0, 54, 58, 0.8)", borderBottomRightRadius: 20 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    {renderImage()}
                    <Drawer.Section style={styles.shortCuts}>
                        <DrawerItem
                            label="Drive"
                            labelStyle={{ color: "#fff", fontSize: 15 }}
                            icon={({ color, size }) => (
                                <Image source={require("../images/driver.png")} style={{ width: 40, height: 40 }} />
                            )}
                            onPress={() => { props.navigation.navigate(AuthDriver) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image source={require("../images/prices.png")} style={{ width: 40, height: 40 }} />
                            )}
                            label="Prices"
                            labelStyle={{ color: "#fff", fontSize: 18 }}
                            onPress={() => { props.navigation.navigate(Prices) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image source={require("../images/aiPay.png")} style={{ width: 40, height: 40 }} />
                            )}
                            label="AiPay"
                            labelStyle={{ color: "#fff", fontSize: 18 }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Image source={require("../images/settings.png")} style={{ width: 40, height: 40 }} />
                    )}
                    label="Settigs"
                    labelStyle={{ color: "#fff", fontSize: 20 }}
                    onPress={() => { props.navigation.navigate(Settings) }}
                />
                <Text style={{ alignSelf: "center", color: "gray" }}>Powered by SenseCode</Text>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfo: {
        alignItems: "center",
    },
    userInfoSection: {
        alignItems: "center",
    },
    shortCuts: {
        borderTopColor: "#f4f4f4",
        borderTopWidth: 0.5,
        paddingLeft: "10%"
    },
    title: {
        fontSize: 15,
        marginTop: 3,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
        paddingLeft: "2%"
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})