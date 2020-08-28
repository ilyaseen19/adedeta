import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/footer-styles';
import moment from "moment";

export default class MyFooter extends React.Component {
  render() {
    const date = moment().year();
    return (
      <View style={styles.footerContainer}>
        <Text>Powered by AiChat</Text>
        <Text>Copyright {date} </Text>
      </View>
    );
  }
}
