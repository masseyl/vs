import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/HeaderStyle";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.openPicker}
          onPress={this.props.openPicker}
        >
          <Text style={styles.openPickerText}>Select videos for editing</Text>
        </TouchableOpacity>
        {this.props.videos &&
          this.props.videos.length > 0 && (
            <TouchableOpacity
              style={styles.mergeEdits}
              onPress={this.props.mergeEdits}
            >
              <Text>Click here when done to create new video</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

Header.propTypes = {
  openPicker: PropTypes.func,
  mergeEdits: PropTypes.func,
  videos: PropTypes.array
};
