import React, { Component } from "react";
// import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { VideoPlayer, Trimmer } from "react-native-video-processing";

import styles from "./Styles/EditorStyle";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.video = {
      currentTime: 0,
    };
    this.state = {
      play: true,
      source: "",
      currentTime: 0,
      startTime: 0,
      endTime: 86400,
    };
  }

  componentDidMount() {
    this.setState({
      source: this.props.source,
    });
  }

  play = () => {
    this.setState({
      play: !this.state.play,
    });
  };

  trimVideo = () => {
    const options = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then(newSource =>
        this.setState({
          source: newSource,
        }),
      )
      .catch(console.warn);
  };

  compressVideo = () => {
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: true, // default is false
    };
    this.videoPlayerRef
      .compress(options)
      .then(newSource => console.log(newSource))
      .catch(console.warn);
  };

  getVideoInfo = () => {
    this.videoPlayerRef
      .getVideoInfo()
      .then(info => console.log(info))
      .catch(console.warn);
  };

  moveTrimmer = e => {
    this.setState({
      startTime: e.startTime,
      currentTime: e.startTime,
    });
  };

  render() {
    let source = this.props.source;
    return (
      <View>
        <View>
          <VideoPlayer
            ref={ref => (this.videoPlayerRef = ref)}
            startTime={this.state.startTime} // seconds
            currentTime={this.state.currentTime}
            endTime={this.state.endTime} // seconds
            play={this.state.play} // default false
            replay={true} // should player play video again if it's ended
            source={source}
            playerWidth={Dimensions.get("window").width} // iOS only
            playerHeight={300} // iOS only
            resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
            onPress={this.play}
            // onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
          />
        </View>
        <View style={{ paddingTop: 300 }}>
          <Trimmer
            source={source}
            height={50}
            width={Dimensions.get("window").width}
            onChange={this.moveTrimmer}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "blue", margin: 50 }}
            onPress={this.play}>
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "red", margin: 50 }}
            onPress={this.trimVideo}>
            <Text>Trim</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
