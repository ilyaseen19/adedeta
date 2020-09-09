import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Drawer, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import styles from "../styles/settingsStyle";

function Settings({ navigation }) {

    const [userData, setUser] = useState([]);
    const [userImage, setImage] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [animating, setAnimating] = useState(false);

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

    const handleImage = () => {
        const options = {
            title: 'Select Image',
            maxWidth: 800, maxHeight: 600,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                setImage(source);
                storeImage(source);
            }
        });
    };

    const storeImage = async (source) => {
        try {
            await AsyncStorage.removeItem('image');
            const image = JSON.stringify(source);
            await AsyncStorage.setItem('image', image);
        } catch (e) {
            // remove error
            console.log(e);
        }
    };

    const storeData = async (data) => {
        try {
            await AsyncStorage.removeItem('data');
            let newData = JSON.stringify(data);
            await AsyncStorage.setItem('data', newData);
            getData();
            setAnimating(false);
        } catch (e) {
            console.log(e);
        }
    }

    const validation = () => {
        if (name === "" && phone === "") {
            alert("Both fields are required");
            return false;
        } else if (name === "") {
            alert("enter old name or new name");
            return false;
        } else if (phone === "") {
            alert("enter old number or a new one");
            return false;
        } else if (isNaN(phone)) {
            alert('number must contain only digits');
            return false;
        } else if (phone.length < 10) {
            alert('number is not correct');
            return false;
        } else {
            return true;
        }
    }

    const saveCahnges = () => {
        let userId = userData._id;
        if (validation()) {
            setAnimating(true);
            fetch("http://192.168.43.233:8500/api/users/" + userId, {
                method: "PATCH",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: name,
                    phoneNumber: phone
                })
            })
            .then(response => response.json())
            .then((res) => {
                if (res.success === 1) {
                    let data = {_id: userData._id, userName: name, phoneNumber: phone};
                    storeData(data);
                } else {
                    console.log(res.message);
                    setAnimating(false);
                }
            })
        }
    }

    const renderImage = () => {
        return (
            <View>
                {
                    userImage === "" ?
                        <ImageBackground
                            // resizeMode="contain"
                            source={require("../images/user.png")} style={styles.container}>
                            <TouchableOpacity onPress={() => handleImage()}>
                                <Image source={require("../images/edit.png")} style={styles.edit} />
                            </TouchableOpacity>
                        </ImageBackground>
                        :
                        <ImageBackground
                            // resizeMode="contain"
                            source={userImage} style={styles.container}>
                            <TouchableOpacity onPress={() => handleImage()}>
                                <Image source={require("../images/edit.png")} style={styles.edit} />
                            </TouchableOpacity>
                        </ImageBackground>
                }
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderImage()}
            <ScrollView>
                <View>
                    <Text style={styles.nameStyle}>{userData.userName}</Text>
                    <View style={styles.viewStyle}>
                        <Image source={require("../images/edit.png")} style={styles.editImage} />
                        <TextInput
                            placeholder="edit name"
                            onChangeText={(name) => setName(name)}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.nameStyle}>{userData.phoneNumber}</Text>
                    <View style={styles.viewStyle}>
                        <Image source={require("../images/edit.png")} style={styles.editImage} />
                        <TextInput
                            placeholder="edit phone number"
                            onChangeText={(phone) => setPhone(phone)}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => saveCahnges()} style={styles.button}>
                    <Text style={{ color: "#fff", alignSelf: "center" }}>save changes</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={{alignSelf: "center", alignItems: "center"}}>
                <ActivityIndicator
                    animating={animating}
                    size="large"
                    color="blue"
                />
            </View>
        </View>
    );
}

export default Settings;
