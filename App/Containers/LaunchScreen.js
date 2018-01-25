import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './Styles/LaunchScreenStyles'

import EditorsScreen from './EditorsScreen'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={[styles.mainContainer, { flex: 1 }]}>
        <EditorsScreen />
      </View>
    )
  }
}
