import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import RnFs from 'react-native-fs';

import attachmentsProps from '../../assets/propTypes/attachments';
import styles from './stylesheet';


export default class AddAttachments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      showModal: (this.props.enabled && this.props.photoFirst) || false,
      cancelled: false
    };
  }

  componentWillUnmount() {
    this.setState({
      attachments: []
    });
  }

  closeModal = () => {
    if (this.props.photoFirst) {
      this.props.navigator.pop();
    }
    this.setState({
      showModal: false
    });
  };

  showModal = () => {
    this.setState({
      showModal: true
    });
  };

  openCamera = () => {
    const attachments = [];

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true
    })
      .then((image) => {
        if (image) {
          attachments.push(image);
        }
        this.setState({
          showModal: false
        });
        // TODO: "images" will need to be handled so we have something to upload
        this.props.addAttachments(attachments);
      })
      .catch(() => {
        this.setState({
          cancelled: true
        });
      });
  };

  openPicker = () => {
    const attachments = [];
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true
    }).then((images) => {
      if (images.length) {
        Promise.all(
        images.map((image) => {
          return RnFs.hash(image.path, 'md5')
          .then((checksum) => {
            image.checksum = checksum
            attachments.push(image);
          })
        })
      )
      .then(() => {
        this.setState({
          showModal: false
        });
        // TODO: "images" will need to be handled so we have something to upload
        this.props.addAttachments(attachments);
      })
    }
  })
      .catch((err) => {
        this.setState({
          cancelled: true
        });
      });
  };

  offline = () => {
    Alert.alert(
      'No internet connection',
      `You will need to connect to the internet
      for tasks to be synced to your SiteCompli account.
      Photos cannot be added without
      an internet connection.`
    );
  }

  render() {
    const { enabled, isConnected } = this.props;
    const onLineAndEnabled = isConnected && enabled;
    let displayFunction = enabled ? this.showModal : null;
    displayFunction = isConnected ? displayFunction : this.offline;

    return (
      <View>
        <Modal
          transparent
          animationType="slide"
          presentationStyle="overFullScreen"
          visible={this.state.showModal && isConnected}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalCopy}>Add Photos From</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={this.openPicker}
                >
                  <Text style={styles.modalButtonText}>Photo Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={this.openCamera}
                >
                  <Text style={styles.modalButtonText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonWhite]}
                onPress={this.closeModal}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextBlue]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={[{ opacity: onLineAndEnabled ? 1 : 0.5 }, styles.container]}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={displayFunction}
          >
            <View style={styles.addAttribute}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/images/CreateTask/photo.png')}
                />
              </View>
              <Text style={styles.label}>Add photos</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.attachmentRow}>
          {this.props.attachments.map((attachment) => {
            return (
              <Image
                key={attachment.path}
                source={{ uri: attachment.path }}
                style={[styles.attachment,
                  attachment.error ? styles.attachmentError : null,
                  { opacity: attachment.id ? 1 : 0.5 }]}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

AddAttachments.propTypes = {
  attachments: PropTypes.arrayOf(attachmentsProps),
  addAttachments: PropTypes.func,
  enabled: PropTypes.bool,
  isConnected: PropTypes.bool,
  photoFirst: PropTypes.bool,
  navigator: PropTypes.shape({
    pop: PropTypes.func
  })
};
