import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { values, isEmpty } from 'lodash';

import attachmentsProps from '../../assets/propTypes/attachments';
import { createAttachments } from '../../actions/attachments';
import styles from './stylesheet';
import AddAttachments from './index';

class AddAttachmentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uploadsComplete &&
      isEmpty(nextProps.attachments) &&
      this.state.attachments.length > 0
    ) {
      this.setState({
        attachments: []
      });
    } else {
      this.checkUploadsComplete(nextProps.attachments);
    }
  }

  addAttachments = (attachments) => {
    this.setState({
      attachments: this.state.attachments.concat(attachments)
    });
    this.uploadAttachments(attachments);
  }

  uploadAttachments = (attachments) => {
    if (this.props.createAttachments) {
      this.props.createAttachments(attachments);
    }
  };

  checkUploadsComplete = (updatedAttachments) => {
    if (isEmpty(updatedAttachments)) {
      return;
    }
    const localAttachments = [...this.state.attachments];
    let localAttachment;

    // update localAttachments
    for (const updatedAttachment of updatedAttachments) {
      localAttachment = localAttachments.find((attachment) => {
        return attachment.path === updatedAttachment.path;
      });

      if (localAttachment) {
        localAttachment.id = updatedAttachment.id;
        localAttachment.error = !!updatedAttachment.error;
      }
    }

    this.setState({
      attachments: localAttachments
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <AddAttachments
          addAttachments={this.addAttachments}
          attachments={this.state.attachments}
          enabled={this.props.uploadsComplete}
          isConnected={this.props.isConnected}
          navigator={this.props.navigator}
          photoFirst={this.props.photoFirst}
        />
      </View>
    );
  }
}

AddAttachmentsContainer.propTypes = {
  attachments: PropTypes.arrayOf(attachmentsProps),
  createAttachments: PropTypes.func,
  isConnected: PropTypes.bool,
  navigator: PropTypes.shape({
    pop: PropTypes.func
  }),
  photoFirst: PropTypes.bool,
  uploadsComplete: PropTypes.bool

};

const mapStateToProps = (state) => {
  return {
    attachments: values(state.attachmentsReducer.newTaskAttachments),
    uploadsComplete: state.attachmentsReducer.uploadsComplete,
    isConnected: state.network.isConnected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAttachments: data => dispatch(createAttachments(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AddAttachmentsContainer
);
