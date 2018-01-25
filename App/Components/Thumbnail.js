import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'
import styles from './Styles/ThumbnailStyle'
import { ProcessingManager } from 'react-native-video-processing'

export default class Thumbnail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      thumbnail: ''
    }
  }

  componentDidMount () {
    // give the OS a few milliseconds to make the thumbnails
    setTimeout(() => {
      this.getPreviewImageForSecond(this.props.source, 5)
    }, 100)
  }

  // native module for processing thumbnail images
  getPreviewImageForSecond = (path, second) => {
    const maximumSize = { width: 56, height: 56 }
    ProcessingManager.getPreviewForSecond(path, second, maximumSize, 'base64')
      .then(base64String => {
        this.setState({
          thumbnail: base64String
        })
      })
      .catch(console.warn)
  };

  showMyVideo = e => {
    this.props.showVideo(this.props.source)
  };

  render () {
    return (
      <TouchableOpacity style={styles.container} onPress={this.showMyVideo}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${this.state.thumbnail}` }}
        />
      </TouchableOpacity>
    )
  }
}

Thumbnail.propTypes = {
  showVideo: PropTypes.func,
  source: PropTypes.string
}
