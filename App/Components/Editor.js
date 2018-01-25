import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { VideoPlayer, Trimmer } from "react-native-video-processing";

import styles from "./Styles/EditorStyle";
import EditorControls from "./EditorControls";

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

  doneEditing = () => {
    this.props.doneEditing();
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
      .then(newSource =>
        this.props.updateVideoSource(newSource, this.props.source)
      )
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
        <ScrollView containerStyle={{ flex: 1, height: 800 }}>
          <View>
            <VideoPlayer
              style={styles.player}
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
          <View style={styles.trimmer}>
            <Trimmer
              source={source}
              height={30}
              width={Dimensions.get("window").width}
              onChange={this.moveTrimmer}
            />
          </View>
          <View>
            <EditorControls
              doneEditing={this.doneEditing}
              trimVideo={this.trimVideo}
              play={this.play}
              playing={this.state.play}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Editor.propTypes = {
  doneEditing: PropTypes.func,
  source: PropTypes.string,
  updateVideoSource: PropTypes.func
};
