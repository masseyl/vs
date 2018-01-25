import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    borderColor: "red",
    borderWidth: 3
  },
  thumbnail: {
    borderWidth: 5,
    padding: 4,
    backgroundColor: "grey",
    borderStyle: "dashed",
    width: 90,
    height: 90
  }
});
