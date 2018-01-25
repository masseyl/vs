import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
export default StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center",
    alignItems: "center"
  },
  openPicker: {
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  openPickerText: {
    fontSize: 24
  },
  mergeEdits: {
    backgroundColor: "red",
    margin: 20,
    padding: 5,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  mergeEditsText: {
    fontSize: 24,
    color: "white"
  }
});
