import React, { Component } from 'react';
import { Text, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, View, Alert } from 'react-native';
import { Avatar } from "react-native-paper";
import styles from '../styles/signup-styles';
import HomeScreen from './homeScreen';
import MyFooter from './MyFooter';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      mobNo: "",
      pswd: "",
      name: "",
    }
  }

  createImage = () => {
    alert("image will be uploaded")
  }

  submitSignupForm() {
    // const { mobNo, pswd, dob, name } = this.state
    // if (mobNo === '') {
    //   Alert.alert('Error', 'Mobile No is mandatory')
    // } else if (pswd === '') {
    //   Alert.alert('Error', 'password is mandatory')
    // }  else if (name === '') {
    //   Alert.alert('Error', 'name is mandatory')
    // } else {
    //   this.props.navigation.navigate(HomeScreen)
    // }
    this.props.navigation.navigate(HomeScreen);
  }

  render() {
    return (
      <View style={styles.container}>
          <ScrollView>
          <TouchableOpacity style={styles.picStyle} onPress={()=> this.createImage()}>
            <Avatar.Image 
                source={require("../images/camera.png")}
                size={50}
                style={styles.avatar}
            />
          </TouchableOpacity>

          <TextInput style={styles.textInput} placeholder="User Name" placeholderTextColor='grey' onChangeText={text => this.setState({ name: text })}/>

          <TextInput style={styles.textInput} placeholder="Mobile Number" placeholderTextColor='grey' onChangeText={text => this.setState({ mobNo: text })}/>

          <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor='grey' onChangeText={text => this.setState({ pswd: text })}/>

          <TouchableOpacity style={styles.buttonView} onPress={() => this.submitSignupForm()}>
            <Text style={styles.submitButton}>Register</Text>
          </TouchableOpacity>
          <MyFooter />
          </ScrollView>
      </View>
    );
  }
}
