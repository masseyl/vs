import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
import EditorsActions from "../Redux/EditorsRedux";
import Editor from "../Components/Editor";
import ImagePicker from "react-native-image-crop-picker";
// Styles
import styles from "./Styles/EditorsScreenStyle";

class EditorsScreen extends Component {
  openPicker = () => {
    const attachments = [];
    ImagePicker.openPicker({
      mediaType: "video",
      multiple: true,
      // includeBase64: true
    })
      .then(videos => {
        this.props.addVideos(videos);
      })
      .catch(err => {
        this.setState({
          cancelled: true,
        });
      });
  };

  render() {
    const videos = this.props.videos.videos;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          position: "absolute",
          top: 30,
          height: 333333,
        }}>
        <TouchableOpacity
          style={{ backgroundColor: "blue", margin: 10 }}
          onPress={this.openPicker}>
          <Text>Kick me</Text>
        </TouchableOpacity>
        <View style={{ height: 333333, paddingBottom: 22800 }}>
          {videos.map((video, index) => {
            return <Editor key={index} source={video.path} />;
          })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.editors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addVideos: videos => {
      dispatch(EditorsActions.editorsAddVideos(videos));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorsScreen);
