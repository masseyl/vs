import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/EditorControlsStyle";

export default class EditorControls extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={this.props.play}
        >
          <Text>{this.props.playing ? "Stop" : "Play"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.trimButton]}
          onPress={this.props.trimVideo}
        >
          <Text>Trim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.doneButton]}
          onPress={this.props.doneEditing}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EditorControls.propTypes = {
  doneEditing: PropTypes.func,
  play: PropTypes.func,
  playing: PropTypes.bool,
  trimVideo: PropTypes.func
};
