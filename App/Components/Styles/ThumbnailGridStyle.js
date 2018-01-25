import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    marginBottom: 92 // a hack for when the number of thumbnails is 3x + 1
  },
  grid: {
    width: Dimensions.get('window').width - 4,
    padding: 4,
    margin: 2,
    justifyContent: 'space-around'
  },
  thumbnail: {
    borderWidth: 6,
    padding: 3,
    backgroundColor: 'grey',
    borderStyle: 'dashed',
    width: 80,
    height: 80,
    marginBottom: 10
  }
})
