import React, { Component } from "react";
// import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { VideoPlayer, Trimmer } from "react-native-video-processing";

import styles from "./Styles/EditorStyle";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.video = {
      currentTime: 0
    };
    this.state = {
      play: true,
      source: "",
      currentTime: 0,
      startTime: 0,
      endTime: 86400
    };
  }

  componentDidMount() {
    this.setState({
      source: this.props.source
    });
  }

  done = () => {
    this.props.done();
  };

  play = () => {
    this.setState({
      play: !this.state.play
    });
  };

  trimVideo = () => {
    const options = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      quality:
        Platform.OS === "ios"
          ? VideoPlayer.Constants.quality.QUALITY_1280x720
          : null, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then(newSource => this.props.updateVideo(newSource, this.props.source))
      .catch(console.warn);
  };

  moveTrimmer = e => {
    this.setState({
      startTime: e.startTime,
      currentTime: e.startTime,
      endTime: e.endTime
    });
  };

  render() {
    let source = this.props.source;
    return (
      <View>
        <View>
          <VideoPlayer
            ref={ref => (this.videoPlayerRef = ref)}
            startTime={this.state.startTime}
            currentTime={this.state.currentTime}
            endTime={this.state.endTime}
            play={this.state.play}
            source={source}
            playerWidth={
              Platform.OS === "ios" ? Dimensions.get("window").width : null
            } // iOS only
            playerHeight={Platform.OS === "ios" ? 250 : null} // iOS only
            resizeMode={VideoPlayer.Constants.resizeMode.NONE}
            onPress={this.play}
          />
        </View>
        <View style={{ paddingTop: 250 }}>
          <Trimmer
            source={source}
            height={50}
            width={Dimensions.get("window").width}
            onChange={this.moveTrimmer}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "blue", margin: 10 }}
            onPress={this.play}
          >
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red", margin: 10 }}
            onPress={this.trimVideo}
          >
            <Text>Trim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "green", margin: 10 }}
            onPress={this.done}
          >
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
