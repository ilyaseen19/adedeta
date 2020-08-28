import 'react-native-gesture-handler';
import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import Navigation from "./app/config/navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  componentDidMount(){
    setTimeout(() => {
      StatusBar.setBackgroundColor('#00363a');
    }, 100);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigation />
      </View>
    );
  }
}

export default App;