import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import SortableGrid from "react-native-sortable-grid";

import Thumbnail from "../Components/Thumbnail";

import styles from "./Styles/ThumbnailGridStyle";

export default class ThumbnailGrid extends Component {
  // when finished dragging a thumbnail, re-order the files in redux
  dragRelease = itemOrder => {
    this.props.dragRelease(itemOrder);
  };

  render() {
    if (!this.props.videos) return null;
    return (
      <View style={styles.container}>
        <SortableGrid onDragRelease={this.dragRelease} style={styles.grid}>
          {this.props.videos.map((video, index) => {
            return (
              <View key={video.path} style={styles.thumbnail}>
                <Thumbnail source={video.path} showVideo={this.props.click} />
              </View>
            );
          })}
        </SortableGrid>
      </View>
    );
  }
}

ThumbnailGrid.propTypes = {
  click: PropTypes.func,
  dragRelease: PropTypes.func,
  videos: PropTypes.array
};
