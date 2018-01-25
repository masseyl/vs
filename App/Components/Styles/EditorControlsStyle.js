import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 22,
    marginHorizontal: 6,
    borderBottomWidth: 6
  },
  button: {
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  playButton: {
    backgroundColor: 'rgba(30, 144, 255, 0.5)'
  },
  trimButton: {
    backgroundColor: 'rgba(255,0,0, 0.5)'
  },
  doneButton: {
    backgroundColor: 'rgba(0,255,0, 0.5)'
  }
})
