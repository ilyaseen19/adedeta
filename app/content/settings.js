import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { Drawer, Switch } from 'react-native-paper';
import styles from "../styles/settingsStyle";

function Settings({ navigation }) {

    const handleImage = () => {
        alert("cool")
    }

    const saveCahnges = () => {
        alert("changed")
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                // resizeMode="contain"
                source={require("../images/user.png")} style={styles.container}>
                <TouchableOpacity onPress={() => handleImage()}>
                    <Image source={require("../images/edit.png")} style={styles.edit} />
                </TouchableOpacity>
            </ImageBackground>
            <ScrollView>
            <View>
                <Text style={styles.nameStyle}>Abdallah</Text>
                <View style={styles.viewStyle}>
                    <Image source={require("../images/edit.png")} style={styles.editImage} />
                    <TextInput
                        placeholder="edit name"
                        style={styles.textInput}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.nameStyle}>Phone</Text>
                <View style={styles.viewStyle}>
                    <Image source={require("../images/edit.png")} style={styles.editImage} />
                    <TextInput
                        placeholder="edit phone number"
                        style={styles.textInput}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={()=>saveCahnges()} style={styles.button}>
                <Text style={{color: "#fff", alignSelf: "center"}}>save changes</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Settings;
