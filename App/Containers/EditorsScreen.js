import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  CameraRoll,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import RNVideoEditor from "react-native-video-editor";
import Immutable from "seamless-immutable";
// custom components
import Editor from "../Components/Editor";
import Header from "../Components/Header";
import ThumbnailGrid from "../Components/ThumbnailGrid";
// Styles
import styles from "./Styles/EditorsScreenStyle";
// Redux
import EditorsActions from "../Redux/EditorsRedux";

class EditorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPath: ""
    };
  }

  // Take the list of edited videos, create a file of the merged videos,  and save
  // it to the local file system
  merge = () => {
    const videos = this.props.videos.videos;
    let paths = [];
    for (let vid in videos) {
      // get the file paths
      let path = videos[vid].path.split("file://")[1];
      paths.push(path);
    }
    // use the native module to do the magic
    RNVideoEditor.merge(
      paths,
      results => {
        console.log("Error: " + results);
      },
      (results, file) => {
        // update the view
        this.setState({
          videoPath: `file://${file}`
        });
        // save it to the system
        CameraRoll.saveToCameraRoll(`file://${file}`);
      }
    );
  };

  // Open the local photo gallery
  openPicker = () => {
    const attachments = [];
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true,
      maxFiles: 12
    })
      .then(videos => {
        // save the selection to redux
        this.props.addVideos(videos);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  // update video showing in the editor
  clickThumbnail = videoPath => {
    this.setState({
      videoPath: videoPath
    });
  };

  // thumbnails can be dragged so send the new order into redux
  dragRelease = itemOrder => {
    this.props.dragVideos(itemOrder);
  };

  // the way trim works is it creates a new file each time, so we need to
  // swap out the references here
  updateVideo = (newSource, oldSource) => {
    this.props.updateVideo({
      newSource: newSource,
      oldSource: oldSource
    });
    this.setState({
      videoPath: newSource
    });
  };

  showEditor = () => {
    if (this.state.videoPath) {
      return (
        <View>
          <ScrollView containerStyle={{ flex: 1, height: 800 }}>
            <Editor
              updateVideo={this.updateVideo}
              source={this.state.videoPath}
              done={() => {
                this.setState({
                  videoPath: ""
                });
              }}
            />
          </ScrollView>
        </View>
      );
    }
    return null;
  };

  render() {
    const videos = this.props.videos.videos;
    return (
      <View style={styles.container}>
        <Header
          openPicker={this.openPicker}
          mergeEdits={this.mergeEdits}
          videos={videos}
        />
        <ScrollView>
          <ThumbnailGrid
            dragRelease={this.dragRelease}
            videos={videos}
            click={this.clickThumbnail}
          />
          {this.showEditor()}
        </ScrollView>
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
    dragVideos: videos => {
      dispatch(EditorsActions.editorsDragVideos(videos));
    },
    updateVideo: sources => {
      dispatch(EditorsActions.editorsUpdateVideo(sources));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorsScreen);
