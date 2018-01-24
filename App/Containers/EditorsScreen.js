import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import EditorsActions from "../Redux/EditorsRedux";
import Editor from "../Components/Editor";
import Thumbnail from "../Components/Thumbnail";
import ImagePicker from "react-native-image-crop-picker";
import RNVideoEditor from "react-native-video-editor";
import Immutable from "seamless-immutable";

// Styles
import styles from "./Styles/EditorsScreenStyle";

class EditorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPath: ""
    };
  }

  merge = () => {
    const videos = this.props.videos.videos;
    let paths = [];
    for (let vid in videos) {
      let path = videos[vid].path.split("file://")[1];
      paths.push(path);
    }

    RNVideoEditor.merge(
      paths,
      results => {
        console.log("Error: " + results);
      },
      (results, file) => {
        console.log("Success : " + results + " file: " + file);
        this.setState({
          videoPath: `file://${file}`
        });
      }
    );
  };

  openPicker = () => {
    const attachments = [];
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true
      // includeBase64: true
    })
      .then(videos => {
        this.props.addVideos(videos);
      })
      .catch(err => {
        this.setState({
          cancelled: true
        });
      });
  };

  clickThumbnail = videoPath => {
    this.setState({
      videoPath: videoPath
    });
  };

  showEditor = () => {
    if (this.state.videoPath) {
      return (
        <View>
          <Editor
            updateVideo={this.updateVideo}
            source={this.state.videoPath}
            done={() => {
              this.setState({
                videoPath: ""
              });
            }}
          />
        </View>
      );
    }
    return null;
  };

  updateVideo = (newSource, oldSource) => {
    this.props.updateVideo({
      newSource: newSource,
      oldSource: oldSource
    });
    this.setState({
      videoPath: newSource
    });
  };

  render() {
    const videos = this.props.videos.videos;
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 30
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "blue", margin: 10 }}
          onPress={this.openPicker}
        >
          <Text>Kick me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "blue", margin: 10 }}
          onPress={this.merge}
        >
          <Text>Merge</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {videos.map((video, index) => {
            return (
              <View key={index} style={{ padding: 5 }}>
                <Thumbnail
                  source={video.path}
                  showVideo={this.clickThumbnail}
                />
              </View>
            );
          })}
        </View>
        {this.showEditor()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.editors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addVideos: videos => {
      dispatch(EditorsActions.editorsAddVideos(videos));
    },
    updateVideo: sources => {
      dispatch(EditorsActions.editorsUpdateVideo(sources));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorsScreen);
