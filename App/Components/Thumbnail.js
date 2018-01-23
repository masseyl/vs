import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from "react-native";
import styles from "./Styles/ThumbnailStyle";
import { ProcessingManager } from "react-native-video-processing";

export default class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: "",
    };
  }
  componentDidMount() {
    setTimeout(() => {
      console.log(this.getPreviewImageForSecond(this.props.source, 5));
    }, 100);
  }
  getPreviewImageForSecond = (path, second) => {
    const maximumSize = { width: 72, height: 72 }; // default is { width: 1080, height: 1080 } iOS only
    ProcessingManager.getPreviewForSecond(path, second, maximumSize, "base64") // maximumSize is iOS only
      .then(base64String => {
        this.setState({
          thumbnail: base64String,
        });
      })
      .catch(console.warn);
  };

  showMyVideo = e => {
    this.props.showVideo(this.props.source);
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.showMyVideo}>
        <Image
          style={{ width: 72, height: 72 }}
          source={{ uri: `data:image/gif;base64,${this.state.thumbnail}` }}
        />
      </TouchableOpacity>
    );
  }
}
// // Prop type warnings
// static propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// static defaultProps = {
//   someSetting: false
// }
