import React, { Component } from 'react';
import { Text, ActivityIndicator, Image, TouchableOpacity, TextInput, ScrollView, View, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import { Avatar, Modal, Provider, Portal } from "react-native-paper";
import styles from '../styles/signup-styles';
import HomeScreen from './homeScreen';
import MyFooter from './MyFooter';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      mobNo: "",
      name: "",
      image: "",
      animating: false,
      modalVisible: false,
    }
  }

  componentDidMount(){
    this.renderImage();
  }

  createImage = () => {
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
        this.setState({
          image: source,
        });
      }
    });
  }

  setModalVisible = () => {
    this.setState({modalVisible: true, animating: true});
  };

  _toast = () => {
    ToastAndroid.showWithGravity(
      `account created`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  storeData = async (data) => {
    try {
      const userData = JSON.stringify(data);
      const image = JSON.stringify(this.state.image);
      await AsyncStorage.setItem('data', userData)
      await AsyncStorage.setItem('image', image)
      this.setState({modalVisible: false, animating: false});
      this._toast();
      this.props.navigation.navigate(HomeScreen);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  validation = () => {
    const { mobNo, name } = this.state;
    if (name === '' && mobNo === '') {
      alert('Both fields are required')
      return false;
    } else if (name === '') {
      alert('Name is mandatory')
      return false;
    } else if (mobNo === '') {
      alert('Phone is mandatory')
      return false;
    }else if (isNaN(mobNo)) {
      alert('number must contain only digits');
      return false;
    } else if (mobNo.length < 10) {
      alert('number is not correct');
      return false;
    } else {
      return true;
    }
  }

  register = () => {
    let userName = this.state.name;
    let phone = this.state.mobNo;
    if (this.validation()){
      this.setModalVisible();
      fetch("https://adedeta.herokuapp.com/api/users/register", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          phoneNumber: phone
        })
      })
      .then(response => response.json())
      .then((res) => {
        if(res.success === 1){
         let data = res.user;
         this.storeData(data);
        } else {
          console.log(res.message);
        }
      })
    }
  };

  renderImage = () => {
    let uri = this.state.image
    return(
      <TouchableOpacity style={styles.picStyle} onPress={()=> this.createImage()}>
        {
          uri === "" ?
          <Avatar.Image 
            source={require("../images/camera.png")}
            size={50}
            style={styles.avatar}
        />
        :
        <Avatar.Image 
            source={uri}
            size={100}
            style={styles.avatar}
        />
        }
      </TouchableOpacity>
    )
  }

  render() {
    let animating = this.state.animating;
    return (
      <View style={styles.container}>
          <ScrollView>
          {this.renderImage()}

          <TextInput style={styles.textInput} placeholder="User Name" placeholderTextColor='grey' onChangeText={text => this.setState({ name: text })}/>

          <TextInput style={styles.textInput} placeholder="Mobile Number" placeholderTextColor='grey' onChangeText={text => this.setState({ mobNo: text })}/>

          <TouchableOpacity style={styles.buttonView} onPress={() => this.register()}>
            <Text style={styles.submitButton}>Register</Text>
          </TouchableOpacity>
          <MyFooter />
          </ScrollView>
          <Provider>
            <Portal>
              <Modal contentContainerStyle={{alignItems: "center"}} visible={this.state.modalVisible} dismissable={false}>
              <ActivityIndicator
                animating={animating}
                size="large"
                color="blue"
              />
              </Modal>
            </Portal>
          </Provider>
      </View>
    );
  }
}
