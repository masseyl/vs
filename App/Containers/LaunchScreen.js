import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Images } from "../Themes";
import ImagePicker from "react-native-image-crop-picker";

// Styles
import styles from "./Styles/LaunchScreenStyles";

import EditorsScreen from "./EditorsScreen";

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: `file:///Users/lancemassey/Library/Developer/CoreSimulator/Devices/2652A49E-4E27-4976-836A-AE3B5EE705BC/data/Media/DCIM/100APPLE/IMG_0006.M4V`,
      showModal: false,
    };
  }

  render() {
    return (
      <View style={[styles.mainContainer, { flex: 1 }]}>
        <EditorsScreen />
      </View>
    );
  }
}
