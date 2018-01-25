import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import SortableGrid from "react-native-sortable-grid";

import Thumbnail from "../Components/Thumbnail";

import styles from "./Styles/ThumbnailGridStyle";

export default class ThumbnailGrid extends Component {
  dragRelease = itemOrder => {
    this.props.dragRelease(itemOrder);
  };

  render() {
    if (!this.props.videos) return null;
    return (
      <SortableGrid onDragRelease={this.dragRelease} style={styles.container}>
        {this.props.videos.map((video, index) => {
          return (
            <View key={video.path} style={styles.thumbnail}>
              <Thumbnail source={video.path} showVideo={this.props.click} />
            </View>
          );
        })}
      </SortableGrid>
    );
  }
}

ThumbnailGrid.propTypes = {
  click: PropTypes.func,
  dragRelease: PropTypes.func,
  videos: PropTypes.array
};
